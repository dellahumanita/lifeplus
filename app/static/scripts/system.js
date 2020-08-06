//TODO
console.log("new version");

export class System {
    constructor (id) {
        this.id = id;
        this.progressBar = document.querySelector('.progressBar');
        this.valueElem = this.progressBar.querySelector('.progressValue');
        this.fillElem = this.progressBar.querySelector('.progressFill');
  
        this.btn = document.createElement("BUTTON");

    }

    getId () {
        return this.id;
    }

    setId (id) {
        this.id = id;
    }

    //  PROGRESS BAR FUNCTIONS 
    createProgressBar(initialValue = 0) {
        this.setValue(initialValue);
        this.progressBar.setAttribute("id", this.generateId("progressBar"));    
    }

    setValue (newValue) {
        if (newValue < 0) {
            newValue = 0;
        }
    
        if (newValue > 100) {
            newValue = 100;
        }

        this.value = newValue;
        this.update();
    }

    update () {
        const percentage = this.value + '%';
        this.fillElem.style.width = percentage;
        this.valueElem.textContent = percentage;

    }

    incrementValue () {
        let val = this.value + 1;
        this.setValue(val);
   }

   // BUTTON FUNCTIONS 
   createButton (text) {
        this.btn.setAttribute("type", "button");
        this.btn.setAttribute("class", "btn btn-light");
        this.btn.innerHTML = text;

        // set the text and style further 
        if (text == "+") {
            let btnType = "incrementBtn";
            this.btn.setAttribute("id", this.generateId(btnType));
            btn.style.cssText = "color: blue; text-align: right;"
        }
        else if (text == "-"){
            let btnType = "decrementBtn";
            this.btn.setAttribute("id", this.generateId(btnType));
        }
        
        // find position and add to HTML
        let position = document.getElementsByClassName("habits")[0]
        position.appendChild(btn);

   }

   generateId (element) {
       let elementId = element + this.id;

       return elementId;
   }

}