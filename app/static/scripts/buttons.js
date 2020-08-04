

function addButton (symbol) {
    let btn = document.createElement("BUTTON");
    let buttonPosition = document.getElementsByClassName("habits")[0];

    btn.innerHTML = symbol;
    buttonPosition.appendChild(btn);
}

addButton("-");
addButton("+");

console.log("Ran function addButton");
