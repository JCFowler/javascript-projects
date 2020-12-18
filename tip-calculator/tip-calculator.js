const button = document.querySelector("button");
const output = document.querySelector(".output");
const cost = document.querySelector("input");

button.addEventListener("click", () => {
    const tip = (cost.value * 0.15).toFixed(2);
    console.log(tip)
    output.innerHTML = `<h1>You should tip $${tip} on $${cost.value}</h1>`
});