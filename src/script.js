//Selecionando todas as celulas
const cells = document.querySelectorAll('.cell');

//Definindo jogadores
const playerX = 'X';
const player0 = 'O';

checkingTurn = true;

//Combinações de vitória
const combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8],
]

//Capturando onde o jogador clica
document.addEventListener('click', e => {
    if(e.target.matches('.cell')) {
        play(e.target.id);
    }
})

//Adicionando vez do jogador, vericando rodada e verificando vencedor
function play(id) {
    const cell = document.getElementById(id);

    turn = checkingTurn ? playerX : player0;
    addTurn(cell, turn, id);
    checkingWinner(turn);
}

//Mostrando na tela jogada e adiconando classe
function addTurn (cell, turn, id) {
    //Caso o jogador tente jogar na mesma celula, o if faz o bloqueio
    const text_cell = document.getElementById(id).textContent;
    
    if(text_cell.length < 1) {
        cell.textContent = turn;
        cell.classList.add(turn);
    }
}

//Função para vereficar vencedor
function checkingWinner(turn) {
    const winner = combinations.some((comb) => {
        return comb.every((index) => {
            return cells[index].classList.contains(turn);
        });
    });

    if(winner) {
        finishGame(turn);
    } else if(checkingATie()) {
        finishGame();
    } else {
        checkingTurn = !checkingTurn; //Passando a vez pro outro jogador
    }
}

//Função para verificar empate
function checkingATie() {
    let o = 0;
    let x = 0;

    for(index in cells) {
        if(!isNaN(index)) {
            if(cells[index].classList.contains(player0)) {
                o++;
            }

            if(cells[index].classList.contains(playerX)) {
                x++;
            }            
        }
    }
    //Retorna um valor boolean 
    return o + x == 9 ? true : false; 
}

//Finalizando o jogo e entrando tela de reinicio
function finishGame(winner = null) {
    const tela_reset = document.getElementById('tela-reset');
    const input_area = document.getElementById('input-area')

    const h1 = document.createElement('h1');
    h1.classList.add('text-gameover')

    const reset = document.createElement('input');
    reset.classList.add('reset-button')

    reset.type = 'button';
    reset.value = 'REINICIAR JOGO'

    reset.onclick = function () {
        location.reload();
    };

    input_area.appendChild(h1);
    input_area.appendChild(reset)
    tela_reset.style.display = 'block'

    if(winner) {
        h1.innerHTML = `O player <span>${winner}</span> foi o vencedor!`
    } else {
        h1.innerHTML = 'O jogo empatou! =)'
    }
}