import { theTetrominoes, displayTetrominoes, GRID_WIDTH} from './tetris-blocks.js';

const grid = document.querySelector('.grid');
const miniGrid = document.querySelector('.mini-grid');
const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');
let squares = [];
const displaySquares = [];

let displayIndex = 0;
let nextRandom = 0;
let timerId;
let score = 0;
const colors = ['orange', 'red', 'purple', 'green', 'blue'];

let random = Math.floor(Math.random() * theTetrominoes.length);
let currentPosition = 4;
let currentRotation = 0;
let current = theTetrominoes[random][currentRotation];

document.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i < 200; i++) {
        const div = document.createElement('div');
        squares.push(div);
        grid.appendChild(div);
    }
    for (let i = 0; i < 10; i++) {
        const div = document.createElement('div');
        div.classList.add('taken');
        squares.push(div);
        grid.appendChild(div);
    }
    for (let i = 0; i < 16; i++) {
        const div = document.createElement('div');
        displaySquares.push(div);
        miniGrid.appendChild(div);
    }
});

startBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    } else {
        draw();
        timerId = setInterval(moveDown, 500);
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        displayShape();
    }
});

document.addEventListener('keyup', e => {
    switch (e.code) {
        case 'ArrowUp':
            rotate();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
    }
});


function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino');
        squares[currentPosition + index].style.backgroundColor = colors[random];
    });
}

function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino');
        squares[currentPosition + index].style.backgroundColor = '';
    });
}

function freeze() {
    if (current.some(index => squares[currentPosition + index + GRID_WIDTH].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'));
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        current = theTetrominoes[random][currentRotation];
        currentPosition = 4;
        draw();
        displayShape();
        addScore();
        gameOver();
    }
}

function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % GRID_WIDTH === 0);

    if (!isAtLeftEdge) {
        currentPosition -= 1;
    }

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition += 1;
    }

    draw();
}

function moveRight() {
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % GRID_WIDTH === GRID_WIDTH - 1);

    if (!isAtRightEdge) {
        currentPosition += 1;
    }

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -= 1;
    }

    draw();
}

function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
        currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
}

function displayShape() {
    displaySquares.forEach(sq => {
        sq.classList.remove('tetromino');
        sq.style.backgroundColor = '';
    });

    displayTetrominoes[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('tetromino');
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
    })
}

function moveDown() {
    undraw();
    currentPosition += GRID_WIDTH;
    draw();
    freeze();
}

function addScore() {
    for (let i = 0; i < 199; i += GRID_WIDTH) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

        if (row.every(index => squares[index].classList.contains('taken'))) {
            score += 10;
            scoreDisplay.innerHTML = score;
            row.forEach(index => {
                squares[index].classList.remove('taken');
                squares[index].classList.remove('tetromino');
                squares[index].style.backgroundColor = '';
            });
            const squaresRemoved = squares.splice(i, GRID_WIDTH);
            squares = squaresRemoved.concat(squares);
            squares.forEach(cell => grid.appendChild(cell));
        }
    }
}

function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = 'End';
        clearInterval(timerId);
    }
}