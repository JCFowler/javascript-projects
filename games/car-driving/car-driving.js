const score = document.querySelector('.score');
const gane = document.querySelector('.gane');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

let keys = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false,
};
let player = { 
    speed: 7,
    score: 0
};

startScreen.addEventListener('click', start);
document.addEventListener('keydown', pressOn);
document.addEventListener('keyup', pressOff);

function start() {
    startScreen.classList.add('hide');
    gameArea.classList.remove('hide');
    gameArea.innerHTML = '';
    player.start = true;
    player.score = 0;

    window.requestAnimationFrame(playGame);

    for (let x = 0; x < 10; x++) {
        let div = document.createElement('div');
        div.classList.add('line');
        div.y = x * 150;
        div.style.top = (x * 150) + 'px';
        gameArea.appendChild(div);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    for (let x = 0; x < 4; x++) {
        let enemy = document.createElement('div');
        enemy.innerHTML = (x + 1);
        enemy.classList.add('enemy');
        enemy.y = ((x + 1) * 600) * -1;
        enemy.style.top = enemy.y + 'px';
        enemy.style.left = Math.floor(Math.random() * 150) + 'px';
        enemy.style.backgroundColor = randomColor();
        gameArea.appendChild(enemy);
    }
}

function endGame() {
    player.start = false;
    score.innerHTML = 'Game Over<br>Score was ' + player.score;
    startScreen.classList.remove('hide');
    // gameArea.classList.add('hide');
}

function moveLines() {
    let lines = document.querySelectorAll('.line');
    for (line of lines) {
        if (line.y >= 1500) {
            line.y -= 1500;
        }
        line.y += player.speed;
        line.style.top = line.y + 'px';
    }
}

function moveEnemys(car) {
    let elements = document.querySelectorAll('.enemy');
    for (ele of elements) {
        if (isCollide(car, ele)) {
            endGame();
        }
        if (ele.y >= 1500) {
            ele.y = -600;
            ele.style.left = Math.floor(Math.random() * 150) + 'px';
            ele.style.backgroundColor = randomColor();
        }
        ele.y += player.speed;
        ele.style.top = ele.y + 'px';
    }
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        (aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right));
}

function playGame() {
    let car = document.querySelector('.car');
    moveLines();
    moveEnemys(car);
    let road = gameArea.getBoundingClientRect();
    if (player.start) {
        if (keys.ArrowUp && player.y > road.top) { 
            player.y -= player.speed; 
        }
        if (keys.ArrowDown && player.y < road.bottom) { 
            player.y += player.speed; 
        }
        if (keys.ArrowLeft && player.x > 0) { 
            player.x -= player.speed; 
        }
        if (keys.ArrowRight && player.x < (road.x - 50)) { 
            player.x += player.speed; 
        }

        car.style.left = player.x + 'px';
        car.style.top = player.y + 'px';
        window.requestAnimationFrame(playGame)
        player.score ++;
        score.innerText = 'Score: ' + player.score;
    }
}

function pressOn(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function pressOff(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ('0' + String(hex)).substr(-2);
    }
    return '#' + c() + c() + c();
}