class Input {
    static area = document.querySelector(".area")
    static mousePos = [0, 0];

    static initialize() {
        Input.mouseDown();
        Input.mouseUp();
        Input.mouseMove();
        Input.mouseLeave();
    }

    static mouseDown() {
        Square.element.addEventListener("mousedown", () => {
            Square.hold()
        })
    }

    static mouseUp() {
        Square.element.parentElement.addEventListener("mouseup", () => {
            Square.isHolding ? Square.release() : null;
        })
    }

    static mouseMove() {
        var pos = [0, 0];
        this.area.addEventListener("mousemove", function (event) {
            // Zera a posição do mouse em relação a div.area
            var x = event.clientX - (Math.trunc(window.innerWidth / 2) - 300);
            var y = event.clientY - 80;
            // Atribui nova posição sempre que o mouse move
            var newPos = [x, y];
            // Determina, comparando a posição anterior com a nova, qual direção o usuário está movendo o mouse
            // eixo x
            if (newPos[0] != pos[0]) {
                newPos[0] > pos[0] ? Square.moveX("r") : Square.moveX("l")
                pos[0] = newPos[0];
            }
            // eixo y
            if (newPos[1] != pos[1]) {
                newPos[1] < pos[1] ? Square.moveY("up") : Square.moveY("down")
                pos[1] = newPos[1];
            }
            // Atribui coordenadas a this.mousePos[]
            Input.mousePos = [pos[0], Math.abs(pos[1] - 600)]
        })
    }

    static mouseLeave() {
        this.area.addEventListener("mouseleave", function (event) {
            Square.isHolding == true ? console.log("leaving...") + Square.release() : null;
        })
    }
}