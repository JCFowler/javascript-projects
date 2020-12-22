let block;
let functionList;
let funList = [];
const movementArray = ['up', 'right', 'down', 'left'];

// Used to wait for the DOM to load everything.
document.addEventListener("DOMContentLoaded", function() {
    block = document.createElement('div');
    block.textContent = 'Set Path'
    block.style.width = '100px';
    block.style.height = '100px';
    block.style.backgroundColor = 'red';
    block.style.color = 'white';
    block.style.lineHeight = '100px';
    block.style.textAlign = 'center';
    block.style.position = 'absolute';
    block.style.top = '50%';
    block.style.left = '50%';
    document.body.appendChild(block);

    functionList = document.createElement('div');
    document.body.appendChild(functionList);
});

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    switch(event.code) {
        case 'ArrowUp':
            addFun('up');
            break;
        case 'ArrowRight':
            addFun('right');
            break;
        case 'ArrowDown':
            addFun('down');
            break;
        case 'ArrowLeft':
            addFun('up');
            break;
        case 'KeyC':
            const color = randomColor();
            block.style.backgroundColor = color;
            break;
        case 'KeyR':
            const temp = movementArray[Math.floor(Math.random() * movementArray.length)]
            addFun(temp);
            break;
        case 'Enter':
            mover();
            break;
    }
});

function mover() {
    if (funList.length > 0) {
        let cur = block.getBoundingClientRect();
        let el = funList.shift();
        let item = el.textContent.replace('+', '');
        functionList.removeChild(el);
        block.innerHTML = 'Move: ' + item;
        
        switch (item) {
            case 'up':
                block.style.top = cur.top - cur.height + 'px';
                break;
            case 'right':
                block.style.left = cur.left + cur.width + 'px';
                break;
            case 'down':
                block.style.top = cur.top + cur.height + 'px';
                break;
            case 'left':
                block.style.left = cur.left - cur.width + 'px';
                break;
        }
        setTimeout(mover, 300);
    } else {
        block.innerHTML = 'Set Path';
    }
}

function addFun(val) {
    let span = document.createElement('span');
    span.textContent = '+' + val;
    span.style.padding = '10px';
    span.style.border = '1px solid #ddd';
    span.addEventListener('mouseover', () => {
        span.style.backgroundColor = 'red';
        span.style.color = 'white';
    });
    span.addEventListener('mouseout', () => {
        span.style.backgroundColor = 'white';
        span.style.color = 'black';
    });
    span.addEventListener('click', () => {
        const curIndex = funList.indexOf(span);
        funList.splice(curIndex, 1);
        functionList.removeChild(span);
    });

    functionList.appendChild(span);
    funList.push(span);
}

function randomColor() {
    return '#' + Math.random().toString(16).substr(-6);
}
