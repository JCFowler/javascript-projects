const rawTxt = document.querySelector(".input");
const finTxt = document.querySelector(".output");
const counter = document.querySelector(".counter");
const btn = document.querySelector("button");
const exp = /([A-Za-z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

btn.addEventListener('click', () => {
    let temp = rawTxt.value;
    const emailData = temp.match(exp);

    let holder = [];
    for (email of emailData) {
        if (holder.indexOf(email) === -1) {
            holder.push(email);
        }
    }
    let tempHolder = holder.join(', ');
    counter.innerText = holder.length;
    finTxt.innerText = tempHolder;
});

finTxt.addEventListener('click', () => {
    finTxt.select();
})