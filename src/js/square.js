class Square {
    static element = document.querySelector(".square")
    static isHolding = false;
    static size = [60, 60] // width - height
    static position = [0, 0] // x - y
    static currentDirection;
    static hasBounced = false;
    static hasEnergy = false;
    static isBouncing = false;
    static bounceAmount = 0;
    static bounceAudio = new Audio('src/wav/bounce.wav')

    static hold() {
        Square.bounceAmount = 0;
        Square.element.parentElement.children[0].textContent = '0'
        Square.hasEnergy = true;
        Square.isHolding = true
        console.log('Holding at: [' + Input.mousePos[0] + ', ' + Input.mousePos[1] + ']')
    }

    static release() {
        Square.isHolding = false
        console.log("releasing at: [" + Input.mousePos[0] + ', ' + Input.mousePos[1] + '], at ' + Square.currentDirection + ' direction')
        Square.fall();
        Square.inertia(Square.currentDirection);

    }

    static moveX(direction) {
        if (this.isHolding) {
            switch (direction) {
                case "r":
                    // console.log("moving x axis (right)")
                    Square.currentDirection = 'r';
                    break;
                case "l":
                    // console.log("moving x axis (left)")
                    Square.currentDirection = 'l';
                    break;
            }
            // Limitador de movimentação do quadrado no eixo x
            if ((Input.mousePos[0] - Square.size[0] / 2) >= 0 &&
                Input.mousePos[0] <= 600 - Square.size[0] / 2) {
                // estiliza o elemento a cada execução de moveX com novos valores de posição do eixo x
                Square.element.style.left = Input.mousePos[0] - Square.size[0] / 2 + 'px'
                Square.position[0] = Input.mousePos[0]
            }
        }
    }

    static moveY(direction) {
        if (this.isHolding) {
            switch (direction) {
                case "up":
                    // console.log("moving y axis (up)")
                    break;
                case "down":
                    // console.log("moving y axis (down)")
                    break;
            }
            if ((Input.mousePos[1] + Square.size[1] / 2) <= 600 &&
                Input.mousePos[1] >= Square.size[1] / 2) {
                Square.element.style.bottom = Input.mousePos[1] - Square.size[1] / 2 + 'px'
                Square.position[1] = Input.mousePos[1]
            }
        }
    }

    static fall(fromY) {
        var initialY = fromY ? fromY : Input.mousePos[1]
        var speed = 0;
        var interval = setInterval(() => {
            if (!Square.isHolding) {
                if (Square.position[1] > 0) {

                    speed += 0.025;
                    Square.position[1] -= speed;
                    if (Square.position[1] > Square.size[1] / 2) {
                        Square.element.style.bottom = Square.position[1] - Square.size[1] / 2 + 'px'
                    } else {
                        Square.position[1] = 30;
                        Square.element.style.bottom = Square.position[1] - Square.size[1] / 2 + 'px'
                        if (initialY >= Square.size[1]) {
                            // console.log("stop")
                            Square.isBouncing = true;
                            Square.bounceY(initialY, speed)

                        } else {
                            // breakpoint
                            Square.bounceAmount++;
                            Square.alert()
                            Square.hasEnergy = false;
                            Square.isBouncing = false;
                            this.hasBounced = false;
                        }
                        clearInterval(interval)
                    }
                } else {
                    clearInterval(interval)
                }
            } else {
                clearInterval(interval)
            }
        }, 1);
    }

    static bounceY(limitY, speed) {
        // Incrementa numero de bounces
        Square.bounceAmount++
        // Emite alerta de bounce
        Square.alert()
        // Define hasBounced = true;
        Square.hasBounced = true;

        // Log
        console.log("Bounce parameters: Max height: " + limitY)

        // O bounce subirá até metade da altura máxima da execução anterior
        var limit = limitY / 2;
        // A velocidade também é baseada na execução anterior
        var initialSpeed = speed;

        // Intervalo
        var interval = setInterval(() => {
            // Equanto o usuário não estiver segurando
            if (!Square.isHolding) {
                // Decrementa velocidade (desaceleração)
                initialSpeed -= 0.025;
                // Enquanto ainda não atingir o limite
                if (Square.position[1] - Square.size[1] / 2 <= limit) {
                    // Incrementa posição de acordo com a velocidade
                    Square.position[1] += initialSpeed;
                    // Estiliza elemento a cada execução
                    Square.element.style.bottom = Square.position[1] - Square.size[1] / 2 + 'px'
                } else {
                    // Quando atingir o limite, volta a cair
                    Square.fall(limit)
                    // Para o intervalo
                    clearInterval(interval)
                }
            } else {
                // Para o intervalo (Se o usuário segurar)
                clearInterval(interval)
            }
        }, 1);
    }

    static bounceX() {
        // Trata position
        Square.position[0] += Square.size[0] / 2
        // Incrementa o numero de bounces
        Square.bounceAmount++
        // Emite alerta de bounce
        Square.alert()
        // Troca a direção do eixo X
        Square.currentDirection == 'r' ? Square.currentDirection = 'l' : Square.currentDirection = 'r';
        // Liga novamente a inercia
        Square.inertia(Square.currentDirection)
    }

    static inertia(direction, forca) {
        var maxDistance = 0;
        // Trata position
        Square.position[0] -= Square.size[0] / 2

        var interval = setInterval(() => {
            // 
            if (!Square.isHolding && Square.hasEnergy) {
                console.log("inertia " + direction)
                // 
                switch (direction) {
                    // case RIGHT
                    case 'r':
                        if (Square.position[0] < 600 - Square.size[0]) {
                            Square.position[0]++
                        } else {
                            Square.bounceX()
                            clearInterval(interval);
                        }
                        Square.element.style.left = Square.position[0] + 'px'
                        break;
                    // case LEFT
                    case 'l':
                        if (Square.position[0] > 0) {
                            Square.position[0]--
                        } else {
                            Square.bounceX()
                            clearInterval(interval);
                        }
                        Square.element.style.left = Square.position[0] + 'px'
                        break;
                }
            } else {
                clearInterval(interval)
            }
        }, 1);
    }

    static alert() {
        Square.bounceAudio.paused ? Square.bounceAudio.play() : Square.bounceAudio.currentTime = 0;
        Square.element.parentElement.children[0].textContent = Square.bounceAmount
        function random_rgb() {
            var o = Math.round, r = Math.random, s = 255;
            return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
        }

        var color = random_rgb();
        Square.element.style.background = color
    }
}