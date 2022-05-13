const container = document.getElementById("game-container");
const squareArr = [];
let nextMove = 'X';

// determine if game is over
function gameOver(message) {
    document.getElementById("winner").innerHTML = message;
    container.style.display = "none";
    document.getElementById("game-over").style.display = "block";
}

// determine if game is a tie
function isDraw() {
    let shouldReturn = true;
    squareArr.forEach(({state}) => {
        if(state == "") shouldReturn = false;
    });
    return shouldReturn;
}

// determine who won the game
function wonGame() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i=0; i<lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squareArr[a].state !== "" &&
           squareArr[a].state === squareArr[b].state &&
           squareArr[a].state === squareArr[c].state
        ) {
            return true;
        }
    }
    return false;
}

class Square {
    constructor(el, index) {
        this.element = el;
        this.index = index;
        this.state = "";
    }

    clicked() {
        this.state = nextMove;
        this.element.classList.remove("notClicked");
        this.element.onclick = function () {
            return false;
        }
        this.element.querySelector("p").innerHTML = this.state;
        if(wonGame()) return gameOver("The winner is player " + this.state);
        if(isDraw()) return gameOver("It is a draw");
        nextMove == "X" ? (nextMove = "O") : (nextMove = "X");
    }
}

for (let index = 0; index < 9; index++) {
    const div = document.createElement("div");
    div.classList.add("square", "notClicked");
    div.onclick = function () {
        square.clicked();
    }
    const square = new Square(div, index);
    div.appendChild(document.createElement("p"));
    container.appendChild(div);
    squareArr.push(square);
}