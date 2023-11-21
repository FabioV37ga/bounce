// version 2.0
class Circle {
    static element = document.querySelector(".circle")
    static isHolding = false;
    static size = 60 // width - height
    static position = [0, 0] // x - y
    static anchor = [0, 0];


    // Método hold → Quando o usuário segura o circulo
    static hold() {
        // Define isHolding = true.
        Circle.isHolding = true;
        // Define Circle.anchor[0,1]. Esse é o ponto do circulo que lidera a movimentação.
        Circle.anchor[0] = Math.abs(Circle.position[0] - Input.mousePos[0]);
        Circle.anchor[1] = Math.abs(Circle.position[1] - Input.mousePos[1]);
        // LOG
        console.log(this.anchor)
        console.log("hold")
    }

    // Método release → Quando o usuário solta o circulo
    static release() {
        // Define isHolding = false.
        Circle.isHolding = false;
        // LOG
        console.log("release")
    }

    // Método dragX → Quando o usuáro arrasta no eixo X
    static dragX(direction) {
        if (Circle.isHolding) {
            switch (direction) {
                // Direita
                case 'r':
                    if (Circle.position[0] < 540)
                        if (Input.mousePos[0] - Circle.anchor[0] < 540) {
                            Circle.position[0] += Input.mousePos[0] - Circle.position[0] - Circle.anchor[0]
                        } else {
                            Circle.anchor[0] = Math.abs(Circle.position[0] - Input.mousePos[0]);
                        }
                    break
                // Esquerda
                case 'l':
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

    static inertiaX() {

    }

    static inertiaY() {

    }


}