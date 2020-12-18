const myCal = document.querySelector(".myCal");
const myKeys = [
    ["1","2","3","+"],
    ["4","5","6","-"],
    ["7","8","9","*"],
    ["C","0","=","/"]
];
const myOper = ["+","-","*","/"];

let output;

// Used to wait for the DOM to load everything.
document.addEventListener("DOMContentLoaded", function() {
    output = document.createElement("div");
    output.innerHTML = "0";
    output.classList.add("output");
    myCal.appendChild(output);

    for (keys of myKeys) {
        let div = document.createElement("div");
        console.dir(div)
        div.classList.add("row");
        for (key of keys) {
            let btn = document.createElement("div");
            btn.innerHTML = key;
            btn.classList.add('btn');
            btn.addEventListener('click', btnClick);
            div.appendChild(btn);
        };
        myCal.appendChild(div);
    };
});

function btnClick() {
    const value = this.innerText;
    let cal = output.innerText;
    if (cal == 0) {
        cal = '';
    }
    if (value === '=') {
        cal = eval(cal);
    } else if(value === 'C') {
        cal = 0;
    } else {
        let lastChar = cal.substring(cal.length - 1);
        if (myOper.includes(value)) {
            if (myOper.includes(lastChar)) {
                cal = cal.substring(0, cal.length - 1);
            } else {
                cal = eval(cal);
            }
        }
        cal = cal + value;
    }
    output.innerText = cal;
}