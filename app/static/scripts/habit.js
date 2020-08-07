//TODO: fix constructor variables so that the progressBars 
//      are in the progressBar functions, same with the buttons 
//TODO: make sure that they are pointing to the correct div with
//      their correspoinding hid

//FINAL SYSTEM SCRIPT

export class Habit {
    constructor (id, habitDiv) {
        this.id = id;
        //setup progress bar and it components
        this.progressBar = habitDiv.querySelector('.progressBar');
        this.valueElem = this.progressBar.querySelector('.progressValue');
        this.fillElem = this.progressBar.querySelector('.progressFill');
        this.createProgressBar();
        //setup buttons 
        this.incrementBtn = habitDiv.querySelector(".incrementButton");
        this.decrementBtn = habitDiv.querySelector(".decrementButton");
        
    }


    getId () {
        return this.id;
    }

    setId (id) {
        this.id = id;
    }

    setElementId (element, id) {
        element.setAttribute("id", this.generateId(element));
    }


    //  PROGRESS BAR FUNCTIONS 
    createProgressBar(initialValue = 0) {

        // generate and set ids for each component of the progress bar
        this.setElementId(this.progressBar);
        this.setElementId(this.valueElem);
        this.setElementId(this.fillElem);

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
            positions[i].setAttribute("id", this.generateId("progressButtons"));
            // positions[i].appendChild(this.btn);
        }

   }

   generateId (element) {
       let elementId = element + this.getId();

       return elementId;
   }

}