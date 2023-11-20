class Square {
    static element = document.querySelector(".square")
    static isHolding = false;
    static size = [60, 60] // width - height
    static position = [0, 0] // x - y

    static hold() {
        Square.isHolding = true
        console.log('Holding at: [' + Input.mousePos[0] + ', ' + Input.mousePos[1] + ']')
    }

    static release() {
        Square.isHolding = false
        console.log("releasing at: [" + Input.mousePos[0] + ', ' + Input.mousePos[1] + ']')
        Square.fall();
    }

    static moveX(direction) {
        if (this.isHolding) {
            switch (direction) {
                case "r":
                    // console.log("moving x axis (right)")
                    break;
                case "l":
                    // console.log("moving x axis (left)")
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
                            Square.bounce(initialY, speed)
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

    static bounce(limitY, speed) {
        console.log("Bounce parameters: Max height: " + limitY)
        var limit = limitY / 2;
        var initialSpeed = speed;
        var interval = setInterval(() => {
            if (!Square.isHolding) {
                initialSpeed -= 0.025;
                if (Square.position[1] - Square.size[1] / 2 <= limit) {
                    Square.position[1] += initialSpeed;
                    Square.element.style.bottom = Square.position[1] - Square.size[1] / 2 + 'px'
                } else {
                    Square.fall(limit)
                    clearInterval(interval)
                }
            } else {
                clearInterval(interval)
            }
        }, 1);
    }

}