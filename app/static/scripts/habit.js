//TODO: fix constructor variables so that the progressBars 
//      are in the progressBar functions, same with the buttons 
//TODO: make sure that they are pointing to the correct div with
//      their correspoinding hid

//FINAL SYSTEM SCRIPT

export class Habit {
    constructor (id, habitDiv) {
        // initialize fields 
        this.id = id;
        this.habitDiv = habitDiv
        console.log(this.habitDiv);

        //setup progress bar and its components
        this.progressBar = this.habitDiv.querySelector('.progressBar');
        this.valueElem = this.progressBar.querySelector('.progressValue');
        this.fillElem = this.progressBar.querySelector('.progressFill');

        //setup buttons 
        this.incrementButton = this.habitDiv.querySelector(".incrementButton");
        this.decrementButton = this.habitDiv.querySelector(".decrementButton");
    }


    // getter function
    getId () {
        return this.id;
    }


    // setter function
    setId (id) {
        this.id = id;
    }


    //  generate an id based on elementHID
    __generateId (element) {
        let elementId = element + this.getId();
 
        return elementId;
    }
 

    // generates and sets the id of the div 
    __setDivId (div, name) {
        div.setAttribute("id", this.__generateId(div));
    }


    // MAIN function create a function bar
    createProgressBar(initialValue = 0) {
        // generate and set ids for each component of the progress bar
        this.__setDivId(this.progressBar);
        this.__setDivId(this.valueElem);
        this.__setDivId(this.fillElem);

        this.__setValue(initialValue);
   
    }


    // sets the value of the progress bar
    __setValue (newValue) {
        if (newValue < 0) {
            newValue = 0;
        }
        if (newValue > 100) {
            newValue = 100;
        }

        this.value = newValue;
        this.__update();
    }


    // __updates the text of the progress bar value
    __update () {
        const percentage = this.value + '%';
        this.fillElem.style.width = percentage;
        this.valueElem.textContent = percentage;
    }


    // adds 1 to the value for the incrementButton
    incrementValue () {
        let val = this.value + 1;
        this.__setValue(val);
   }


   // subtracts 1 from the value for the decrementButton
   decrementValue () {
       let val = this.value - 1;
       this.__setValue(val);
   }
   

   // MAIN function to create the button 
   createButtons () {
        // create "-" button
        this.__createBtnElement("-", "minusBtn", 'this.decrementValue();',
            this.decrementButton);
        // create "+" button
        this.__createBtnElement("+", "plusBtn", 'this.incrementValue();',
        this.incrementButton, "color: blue; text-align: right;"); 

   }


   // actually creating the button elements
   __createBtnElement (text, btnName, task, div, styling=0) {
        let btn = document.createElement("BUTTON"); 
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "btn btn-light");
        btn.innerHTML = text;
        let btnDivId = this.__generateId(div);
        btn.setAttribute("id", this.__generateId(btnName));
        btn.setAttribute("onclick", task);
        // btn.styling.cssText =  styling;
        let position = document.getElementById(btnDivId);
        position.appendChild(btn);
   }


}