//  DO NOT USE ANYMORE
export class ProgressBar {
    constructor (element, initialValue = 0) {
        this.valueElem = element.querySelector('.progressValue');
        this.fillElem = element.querySelector('.progressFill');
        this.btn = document.createElement("BUTTON");

        this.setValue(initialValue);
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

    //  Updates the value in the bar 
    update () {
        const percentage = this.value + '%';
        this.fillElem.style.width = percentage;
        this.valueElem.textContent = percentage;
    }

    // Adds 1 to the value of the progress bar 
    incrementValue () {
        let val = this.value + 1;
        this.setValue(val);
   }

   // Creates a button with the selected text inside it 
   createButton (text) {
        //  style the basic button
        this.btn.setAttribute("type", "button");
        this.btn.setAttribute("class", "btn btn-light");
        this.btn.innerHTML = text;

        // set the text and style further 
        if (text == "+") {
            this.btn.setAttribute("id", "incrementBtn");
            btn.style.cssText = "color: blue; text-align: right;"
        }
        else if (text == "-"){
            this.btn.setAttribute("id", "decrementBtn");
        }
        
        let position = document.getElementsByClassName("habits")[0]
        position.appendChild(btn);
    }

   


}
// let pb = new ProgressBar(document.querySelector('.progressBar'), 0);