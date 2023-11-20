class Square {
    static elemento = document.querySelector(".square");
    static isHolding = false

    static hold() {
        Square.isHolding = true
        console.log(Input.mousePos)
        console.log("holding...")
    }

    static release() {
        Square.isHolding = false
        console.log(Input.mousePos)
        console.log("releasing...")
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
            if (Input.mousePos[0] - 30 >= 0 && Input.mousePos[0] <= 570) {
                this.elemento.style.left = Input.mousePos[0] - 30 + 'px'
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
            if (Input.mousePos[1] + 30 <= 600 && Input.mousePos[1] >= 30) {

                this.elemento.style.bottom = Input.mousePos[1] - 30 + 'px'
            }
        }

    }
}