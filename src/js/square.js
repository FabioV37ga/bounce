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

    // Método hold → Quando o usuário segura
    static hold() {
        // Inializa/Reinicia contador de bounces
        Square.bounceAmount = 0;
        // Troca display de bounces p/ 0
        Square.element.parentElement.children[0].textContent = '0'
        // Marca hasEnergy = true
        Square.hasEnergy = true;
        // Marca isHolding = true
        Square.isHolding = true
        // LOG
        console.log('Holding at: [' + Input.mousePos[0] + ', ' + Input.mousePos[1] + ']')
    }

    // Método release → Quando o usuário solta
    static release() {
        // Marca isHolding = false
        Square.isHolding = false
        // Faz o elemento cair
        Square.fall();
        // Habilita inercia
        Square.inertia(Square.currentDirection);
        // Log
        console.log("releasing at: [" + Input.mousePos[0] + ', ' + Input.mousePos[1] + '], at ' + Square.currentDirection + ' direction')

    }

    // Método moveX → Quando o usuáro move no eixo X
    static moveX(direction) {
        // Enquanto usuário estiver segurando...
        if (Square.isHolding) {
            // Marcadores de inércia, salvam o sentido que o elemento está se movendo
            switch (direction) {
                case "r":
                    // Direita
                    Square.currentDirection = 'r';
                    break;
                case "l":
                    // Esquerda
                    Square.currentDirection = 'l';
                    break;
            }
            // Limitador de movimentação do quadrado no eixo x
            if ((Input.mousePos[0] - Square.size[0] / 2) >= 0 &&
                Input.mousePos[0] <= 600 - Square.size[0] / 2) {
                // estiliza o elemento a cada execução de moveX com novos valores de posição do eixo x
                Square.element.style.left = Input.mousePos[0] - Square.size[0] / 2 + 'px'
                // Define posição do elemento
                Square.position[0] = Input.mousePos[0] - Square.size[0] / 2
            }
        }
    }

    // Método moveY → Quando o usuário move no eixo Y
    static moveY(direction) {
        // Enquanto usuário estiver segurando...
        if (Square.isHolding) {
            // Marcadores de inércia, salvam o sentido que o elemento está se movendo
            switch (direction) {
                case "up":
                    // cima
                    break;
                case "down":
                    // baixo
                    break;
            }
            // Limitador de movimentação do quadrado no eixo y
            if ((Input.mousePos[1] + Square.size[1] / 2) <= 600 &&
                Input.mousePos[1] >= Square.size[1] / 2) {
                // Estiliza o elemento a cada execução
                Square.element.style.bottom = Input.mousePos[1] - Square.size[1] / 2 + 'px'
                // define posição do elemento
                Square.position[1] = Input.mousePos[1]
            }
        }
    }

    // Método fall → Simula gravidade com aceleração
    static fall(fromY) {
        // Y inicial: Parâmetro opcional que define de onde o elemento começa a cair, se não for passado, assume-se a posição do mouse
        var initialY = fromY ? fromY : Input.mousePos[1]
        // Velocidade inicia zerada
        var speed = 0;
        // Intervalo
        var interval = setInterval(() => {
            // Enquanto o usuário não estiver segurando o elemento
            if (!Square.isHolding) {
                // Enquando a posição Y for maior que 0 (não encostou no chão)
                if (Square.position[1] > 0) {
                    // Acelera velocidade a cada execução
                    speed += 0.025;
                    // Decrementa posição de acordo com aceleração
                    Square.position[1] -= speed;
                    // Enquanto não atingir o chão da fase
                    if (Square.position[1] > Square.size[1] / 2) {
                        // estiliza elemento com novo y
                        Square.element.style.bottom = Square.position[1] - Square.size[1] / 2 + 'px'
                    } else {
                        // Trava posição no y do chão
                        Square.position[1] = Square.size[1] / 2;
                        // Estiliza elemento
                        Square.element.style.bottom = Square.position[1] - Square.size[1] / 2 + 'px'
                        // Verifica se tem potencial de bounce
                        if (initialY >= Square.size[1]) {
                            Square.isBouncing = true;
                            Square.bounceY(initialY, speed)
                        } else {
                            // breakpoint (não tem mais potencial de bounce)
                            // Incrementa qtd de bounce
                            Square.bounceAmount++;
                            // Alerta bounce
                            Square.alert()
                            // Marca potencial de bounce = false
                            Square.hasEnergy = false;
                            Square.isBouncing = false;
                            // Reseta hasBounced
                            Square.hasBounced = false;
                        }
                        // Limpa intervalo (quando atingir o chão)
                        clearInterval(interval)
                    }
                } else {
                    // Limpa intervalo (quando atingir o chão)
                    clearInterval(interval)
                }
            } else {
                // Limpa intervalo (Se o usuário segurar o elemento)
                clearInterval(interval)
            }
        }, 1);
    }

    // Método bounce → Simula 'pingar' de uma bola, simulando gravidade com desaceleração
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
        // Incrementa o numero de bounces
        Square.bounceAmount++
        // Emite alerta de bounce
        Square.alert()
        // Troca a direção do eixo X
        Square.currentDirection == 'r' ? Square.currentDirection = 'l' : Square.currentDirection = 'r';
        // Liga novamente a inercia
        Square.inertia(Square.currentDirection)
    }

    // Método inertia → Simula inercia, continua movendo elemento no último sentido de quando estava sendo segurado
    static inertia(direction, forca) {
        var maxDistance = 0;
        // Intervalo
        var interval = setInterval(() => {
            // Enquando não estiver segurando, e houver energia (potencial de bounce)
            if (!Square.isHolding && Square.hasEnergy) {
                // LOG
                console.log("inertia: " + direction)
                switch (direction) {
                    // case RIGHT
                    case 'r':
                        if (Square.position[0] < 600 - Square.size[0]) {
                            // Incrementa posicao no eixo X
                            Square.position[0]++
                        } else {
                            // Se bater na parede, chama bounceX
                            Square.bounceX()
                            // para intervalo
                            clearInterval(interval);
                        }
                        // Estiliza elemento
                        Square.element.style.left = Square.position[0] + 'px'
                        break;
                    // case LEFT
                    case 'l':
                        if (Square.position[0] > 0) {
                            // Decrementa posicao no eixo X
                            Square.position[0]--
                        } else {
                            // Se bater na parede, chama bounceX
                            Square.bounceX()
                            // para intervalo
                            clearInterval(interval);
                        }
                        // Estiliza elemento
                        Square.element.style.left = Square.position[0] + 'px'
                        break;
                }
            } else {
                clearInterval(interval)
            }
        }, 1);
    }

    static alert() {
        // Troca o texto do contador de bounces para a quantidade salva de bounces
        Square.element.parentElement.children[0].textContent = Square.bounceAmount
        // Toca um audio sempre que acontece um bounce, para a execução do anterior de necessário
        Square.bounceAudio.paused ? Square.bounceAudio.play() : Square.bounceAudio.currentTime = 0;
        // Função p/ gerar rgb aleatório
        function random_rgb() {
            var o = Math.round, r = Math.random, s = 255;
            return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
        }
        // Define background-color
        Square.element.style.background = random_rgb()
    }
}