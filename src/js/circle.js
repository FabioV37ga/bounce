// version 2.0
class Circle {
    static element = document.querySelector(".circle")
    static isHolding = false;
    static size = 60 // width - height
    static position = [0, 0] // x - y
    static anchor = [0, 0];
    static trajectoryX = [0, 0, 0]
    static trajectoryY = [0, 0, 0]
    static currentDirection = ['', '']
    static bounceAmount = 0;
    static bounceAudio = new Audio('src/wav/bounce.wav')
    static speed = [0, 0];
    static unlimitedEnergy = true;
    static enableGravity = false;

    // Método hold → Quando o usuário segura o circulo
    static hold() {
        Circle.speed = [0, 0]
        // Define isHolding = true.
        Circle.isHolding = true;
        // Define Circle.anchor[0,1]. Esse é o ponto do circulo que lidera a movimentação.
        Circle.anchor[0] = Math.abs(Circle.position[0] - Input.mousePos[0]);
        Circle.anchor[1] = Math.abs(Circle.position[1] - Input.mousePos[1]);
        // LOG
        Circle.getTrajectory()
        // console.log(this.anchor)
        console.log("hold")
    }

    // Método release → Quando o usuário solta o circulo
    static release() {
        // Define isHolding = false.
        Circle.isHolding = false;
        // LOG
        console.log("release")
        Circle.enableGravity == true ? Circle.gravityPull() : null 
        Circle.inertiaX()
        Circle.inertiaY()
        console.log("speed (x,y): " + `[ ${Circle.speed[0]} , ${Circle.speed[1]} ]`)
    }

    // Método dragX → Quando o usuáro arrasta no eixo X
    static dragX(direction) {
        if (Circle.isHolding) {
            switch (direction) {
                // Direita
                case 'r':
                    this.currentDirection[0] = 'r'
                    if (Circle.position[0] < 540)
                        if (Input.mousePos[0] - Circle.anchor[0] < 540) {
                            Circle.position[0] += Input.mousePos[0] - Circle.position[0] - Circle.anchor[0]
                        } else {
                            Circle.anchor[0] = Math.abs(Circle.position[0] - Input.mousePos[0]);
                        }
                    break
                // Esquerda
                case 'l':
                    this.currentDirection[0] = 'l'
                    if (Circle.position[0] > 0)
                        if (Input.mousePos[0] - Circle.anchor[0] > 0) {
                            Circle.position[0] >= 0 ? Circle.position[0] += Input.mousePos[0] - Circle.position[0] - Circle.anchor[0] : null;
                        } else {
                            Circle.anchor[0] = Math.abs(Circle.position[0] - Input.mousePos[0]);
                        }
                    break
            }
            // Estiliza
            Circle.element.style.left = Circle.position[0] + 'px'
        }
    }

    // Método dragY → Quando o usuário arrasta no eixo Y
    static dragY(direction) {
        if (Circle.isHolding) {
            switch (direction) {
                // Cima
                case 'up':
                    this.currentDirection[1] = 'up'
                    if (Circle.position[1] < 540) {
                        if (Input.mousePos[1] - Circle.anchor[1] < 540) {
                            Circle.position[1] += Input.mousePos[1] - Circle.position[1] - Circle.anchor[1]
                        } else {
                            Circle.anchor[1] = Math.abs(Circle.position[1] - Input.mousePos[1]);
                        }
                    }
                    break
                // Baixo
                case 'down':
                    this.currentDirection[1] = 'down'
                    if (Circle.position[1] > 0) {
                        if (Input.mousePos[1] - Circle.anchor[1] > 0) {
                            Circle.position[1] += Input.mousePos[1] - Circle.position[1] - Circle.anchor[1]
                        } else {
                            Circle.anchor[1] = Math.abs(Circle.position[1] - Input.mousePos[1]);
                        }
                    }
                    break
            }
            // Estiliza
            Circle.element.style.bottom = Circle.position[1] + 'px'
        }
    }

    static getTrajectory() {
        var index = 0;
        timeout()
        function timeout() {
            var value = setTimeout(() => {
                if (Circle.isHolding) {
                    timeout();
                    index + 1 > 2 ? index = 0 : index++;
                    Circle.trajectoryX[2] = Circle.trajectoryX[1] != null ? Circle.trajectoryX[1] : null;
                    Circle.trajectoryX[1] = Circle.trajectoryX[0] != null ? Circle.trajectoryX[0] : null;
                    Circle.trajectoryX[0] = Circle.position[0];

                    Circle.trajectoryY[2] = Circle.trajectoryY[1] != null ? Circle.trajectoryY[1] : null;
                    Circle.trajectoryY[1] = Circle.trajectoryY[0] != null ? Circle.trajectoryY[0] : null;
                    Circle.trajectoryY[0] = Circle.position[1];
                }



            }, 10);
            // console.log(Circle.trajectoryX)
        }
    }

    static inertiaX() {

        if (!Circle.isHolding) {
            // Adquire velocidade baseado nas posições anteriores
            if (Circle.unlimitedEnergy || Circle.speed[0] <= 0) {
                Circle.speed[0] = Math.abs((Circle.trajectoryX[0] - Circle.trajectoryX[1]))
                Circle.speed[0] = Circle.speed[0] > 4 ? Circle.speed[0] / 2 : Circle.speed[0];
                Circle.speed[0] = Circle.speed[0] > 10 ? 10 : Circle.speed[0];
            } else {
                Circle.speed[0] = Circle.speed[0] ? Circle.speed[0] : Math.abs((Circle.trajectoryY[0] - Circle.trajectoryY[1]));
            }
            if (Circle.trajectoryX[0] > 0 &&
                Circle.trajectoryX[1] > 0 &&
                Circle.trajectoryX[2] > 0) {
                var interval = setInterval(() => {
                    if (Circle.isHolding)
                        clearInterval(interval)
                    if (Circle.currentDirection[0] == 'r')
                        Circle.position[0] < 540 ? Circle.position[0] += Circle.speed[0] : this.bounce('x') + clearInterval(interval);
                    else {
                        Circle.position[0] > 0 ? Circle.position[0] -= Circle.speed[0] : this.bounce('x') + clearInterval(interval);
                    }
                    Circle.element.style.left = Circle.position[0] + 'px'
                    Circle.speed[0] > 0 ? Circle.speed[0] -= 0.005 : clearInterval(interval);
                }, 1);
            }
        }

    }

    static inertiaY() {
        if (!Circle.isHolding) {
            if (Circle.unlimitedEnergy || Circle.speed[1] <= 0) {
                Circle.speed[1] = Math.abs((Circle.trajectoryY[0] - Circle.trajectoryY[1]))
                // console.log('speeed ' + Circle.speed[1])
                Circle.speed[1] = Circle.speed[1] > 4 ? Circle.speed[1] / 2 : Circle.speed[1]
                Circle.speed[1] = Circle.speed[1] > 10 ? 10 : Circle.speed[1];
            } else {
                Circle.speed[1] = Circle.speed[1] ? Circle.speed[1] : Math.abs((Circle.trajectoryY[0] - Circle.trajectoryY[1]));
            }
            // Adquire velocidade baseado nas posições anteriores
            // console.log('attention ' + Circle.speed[1])
            if (Circle.trajectoryY[0] > 0 &&
                Circle.trajectoryY[1] > 0 &&
                Circle.trajectoryY[2] > 0) {
                var interval = setInterval(() => {
                    if (Circle.isHolding)
                        clearInterval(interval)
                    // console.log("teste")
                    if (Circle.currentDirection[1] == 'up')
                        Circle.position[1] < 540 ? Circle.position[1] += Circle.speed[1] : this.bounce('y') + clearInterval(interval);
                    else {
                        Circle.position[1] > 0 ? Circle.position[1] -= Circle.speed[1] : this.bounce('y') + clearInterval(interval);
                    }
                    Circle.element.style.bottom = Circle.position[1] + 'px'
                    Circle.speed[1] > 0 ? Circle.speed[1] -= 0.005 : console.log("cleared") + clearInterval(interval);
                }, 1);
            }
        } else {

        }
    }

    static bounce(direction) {
        this.alert()
        // console.log("alert")
        switch (direction) {
            case 'x':
                Circle.currentDirection[0] = Circle.currentDirection[0] == 'r' ? 'l' : 'r'
                Circle.inertiaX()
                break
            case 'y':
                Circle.currentDirection[1] = Circle.currentDirection[1] == 'up' ? 'down' : 'up'
                // console.log('aaaaaaaaaaaaaaa    ' + Circle.currentDirection[1])
                Circle.inertiaY(Circle.currentDirection[1])

                break
        }
    }

    static alert() {
        Circle.bounceAmount++;
        Circle.bounceAudio.paused ? Circle.bounceAudio.play() : Circle.bounceAudio.currentTime = 0;
        Circle.element.parentElement.children[0].textContent = Circle.bounceAmount
        function random_rgb() {
            var o = Math.round, r = Math.random, s = 255;
            return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
        }

        var color = random_rgb();
        Circle.element.style.background = color
    }

    static slowDown() {
        var interval = setInterval(() => {
            Circle.speed[0] -= 0.01
            Circle.speed[1] -= 0.01
            Circle.speed[0] <= 0 ? clearInterval(interval) : null;
            Circle.speed[1] <= 0 ? clearInterval(interval) : null;
        }, 1);
    }

    static gravityPull() {
        var speed = 0;
        var interval = setInterval(() => {
            if (!Circle.isHolding) {
                Circle.enableGravity == true ? speed += 0.01 : clearInterval(interval);
                console.log(speed)
                if (Circle.position[1] > 0) {
                    Circle.position[1] -= speed
                } else {
                    clearInterval(interval);
                }
                Circle.element.style.bottom = Circle.position[1] + 'px'
            } else {
                clearInterval(interval)
            }
        }, 1);
    }
}
