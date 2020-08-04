export class Buttons {

    constructor(text, position) {
        this.text = text;
        this.position = position;
    }

    add () {
        let btn = document.createElement("BUTTON");
    
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "btn btn-light");
        btn.innerHTML = this.text;

        if (this.text == "+") {
            btn.setAttribute("id", "incrementBtn");
            btn.style.cssText = "color: blue; text-align: right;"
        }
        else if (this.text == "-"){
            btn.setAttribute("id", "decrementBtn");
        }
        
        this.position.appendChild(btn);
    
    }

    align (className) {
        let btnDiv = document.getElementsByClassName(className)[0];
        btnDiv.style.cssText = "text-align: center;"
    }

    track () {
        let btn = document.getElementById("incrementBtn");
        
    }

    __generateId () {
        const id = Math.floor((Math.random() * 100) + 1);
        return id;
  
    }
}

// let incBtn = new Buttons("+", document.querySelector(".habits"));
// let decBtn = new Buttons("-", document.querySelector(".habits"));
// incBtn.add();
// decBtn.add();




