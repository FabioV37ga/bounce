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

    // Método hold → Quando o usuário segura o circulo
    static hold() {
        // Define isHolding = true.
        Circle.isHolding = true;
        // Define Circle.anchor[0,1]. Esse é o ponto do circulo que lidera a movimentação.
        Circle.anchor[0] = Math.abs(Circle.position[0] - Input.mousePos[0]);
        Circle.anchor[1] = Math.abs(Circle.position[1] - Input.mousePos[1]);
        // LOG
        Circle.getTrajectory()
        console.log(this.anchor)
        console.log("hold")
    }

    // Método release → Quando o usuário solta o circulo
    static release() {
        // Define isHolding = false.
        Circle.isHolding = false;
        // LOG
        console.log("release")
        Circle.inertiaX()
        Circle.inertiaY()
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

                index + 1 > 2 ? index = 0 : index++;
                Circle.trajectoryX[2] = Circle.trajectoryX[1] != null ? Circle.trajectoryX[1] : null;
                Circle.trajectoryX[1] = Circle.trajectoryX[0] != null ? Circle.trajectoryX[0] : null;
                Circle.trajectoryX[0] = Circle.position[0];

                Circle.trajectoryY[2] = Circle.trajectoryY[1] != null ? Circle.trajectoryY[1] : null;
                Circle.trajectoryY[1] = Circle.trajectoryY[0] != null ? Circle.trajectoryY[0] : null;
                Circle.trajectoryY[0] = Circle.position[1];

                Circle.isHolding ? timeout() : null;

            }, 1);
            console.log(Circle.trajectoryX)
        }
    }

    static inertiaX() {

        if (!Circle.isHolding) {
            // Adquire velocidade baseado nas posições anteriores
            var speed = Math.abs((Circle.trajectoryX[0] - Circle.trajectoryX[1]))
            speed = speed > 4 ? speed / 2 : speed
            if (Circle.trajectoryX[0] > 0 &&
                Circle.trajectoryX[1] > 0 &&
                Circle.trajectoryX[2] > 0) {
                var interval = setInterval(() => {
                    if (Circle.isHolding)
                        clearInterval(interval)
                    if (Circle.currentDirection[0] == 'r')
                        Circle.position[0] < 540 ? Circle.position[0] += speed : this.bounce('x') + clearInterval(interval);
                    else {
                        Circle.position[0] > 0  ? Circle.position[0] -= speed : this.bounce('x') + clearInterval(interval);
                    }
                    Circle.element.style.left = Circle.position[0] + 'px'
                    speed > 0 ? speed -= 0.005 : clearInterval(interval);
                }, 1);
                console.log(speed)
            }
        }

    }

    static inertiaY() {
        if (!Circle.isHolding) {
            // Adquire velocidade baseado nas posições anteriores
            var speed = Math.abs((Circle.trajectoryY[0] - Circle.trajectoryY[1]))
            speed = speed > 4 ? speed / 2 : speed
            console.log('attention ' + speed)
            if (Circle.trajectoryY[0] > 0 &&
                Circle.trajectoryY[1] > 0 &&
                Circle.trajectoryY[2] > 0) {
                var interval = setInterval(() => {
                    if (Circle.isHolding)
                        clearInterval(interval)
                    console.log("teste")
                    if (Circle.currentDirection[1] == 'up')
                        Circle.position[1] < 540 ? Circle.position[1] += speed : this.bounce('y') + clearInterval(interval) ;
                    else {
                        Circle.position[1] > 0 ? Circle.position[1] -= speed : this.bounce('y') + clearInterval(interval) ;
                    }
                    Circle.element.style.bottom = Circle.position[1] + 'px'
                    speed > 0 ? speed -= 0.005 : clearInterval(interval);
                }, 1);
                console.log(speed)
            }
        }
    }

    static bounce(direction) {
        switch (direction) {
            case 'x':
                Circle.currentDirection[0] = Circle.currentDirection[0] == 'r' ? 'l' : 'r'
                Circle.inertiaX()
                break
            case 'y':
                Circle.currentDirection[1] = Circle.currentDirection[1] == 'up' ? 'down' : 'up'
                console.log('aaaaaaaaaaaaaaa    ' + Circle.currentDirection[1])
                Circle.inertiaY(Circle.currentDirection[1])

                break
        }
    }
}
