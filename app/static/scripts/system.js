//TODO: fix constructor variables so that the progressBars 
//      are in the progressBar functions, same with the buttons 
//TODO: make sure that they are pointing to the correct div with
//      their correspoinding hid

//FINAL SYSTEM SCRIPT

export class System {
    constructor (id) {
        this.id = id;
        this.progressBar = document.querySelector('.progressBar');
        this.valueElem = this.progressBar.querySelector('.progressValue');
        this.fillElem = this.progressBar.querySelector('.progressFill');
        this.btn = document.createElement("BUTTON");
        
        this.createProgressBar();
        this.createButton("-");
        this.createButton("+");
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
        this.valueElem.setAttribute("id", this.generateId("progressValue")); 
        this.fillElem.setAttribute("id", this.generateId("progressFill"));    
   
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
            var btnId = this.generateId("incrementBtn");
            this.btn.setAttribute("id", btnId);
            this.btn.style.cssText = "color: blue; text-align: right;"
        }
        if (text == "-"){
            var btnId = this.generateId("decrementBtn");
            // var idString = '#' + btnId;
            this.btn.setAttribute("id", btnId);
        }
        
        // find position and add to HTML
        let positions = document.getElementsByClassName("progressButtons");
        for (let i = 0; i < positions.length; i++) {
            positions[i].appendChild(this.btn);
        }

   }

   generateId (element) {
       let elementId = element + this.id;

       return elementId;
   }

}