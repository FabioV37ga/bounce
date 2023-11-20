class Input {
    static mousePos = [];

    static initialize() {
        Input.mouseDown();
        Input.mouseUp();
        Input.mouseMove();
        Input.mouseLeave();
    }

    static mouseDown() {
        Square.elemento.addEventListener("mousedown", () => {
            Square.hold()
        })
    }

    static mouseUp() {
        Square.elemento.addEventListener("mouseup", () => {
            Square.release()
        })
    }

    static mouseMove() {
        var area = document.querySelector(".area");
        var pos = [0, 0];
        area.addEventListener("mousemove", function (event) {
            var x = event.clientX - (Math.trunc(window.innerWidth / 2) - 300);
            var y = event.clientY - 80;
            var newPos = [x, y];
            if (newPos[0] != pos[0]) {
                newPos[0] > pos[0] ? Square.moveX("r") : Square.moveX("l")
                pos[0] = newPos[0];
            }

            if (newPos[1] != pos[1]) {
                newPos[1] < pos[1] ? Square.moveY("up") : Square.moveY("down")
                pos[1] = newPos[1];
            }

            Input.mousePos = [pos[0], Math.abs(pos[1] - 600)]
            // console.log(Input.mousePos)
        })
    }

    static mouseLeave() {
        var area = document.querySelector(".area");
        area.addEventListener("mouseleave", function(event){
            Square.release()
        })
    }
}