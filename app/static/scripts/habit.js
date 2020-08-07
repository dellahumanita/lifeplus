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

        //setup progress bar and its components
        this.progressBar = this.habitDiv.querySelector('.progressBar');
        this.valueElem = this.progressBar.querySelector('.progressValue');
        this.fillElem = this.progressBar.querySelector('.progressFill');
        // this.createProgressBar();

        //setup buttons 
        this.incrementButton = this.habitDiv.querySelector(".incrementButton");
        this.decrementButton = this.habitDiv.querySelector(".decrementButton");
        // this.createButtons("-");
        // this.createButtons("+");
    }

    // getter function
    getId () {
        return this.id;
    }
    // setter function
    setId (id) {
        this.id = id;
    }

    // generates and sets the id of the div 
    __setElementId (div) {
        return div.setAttribute("id", this.__generateId(div));
    }


    // MAIN function create a function bar
    createProgressBar(initialValue = 0) {
        // generate and set ids for each component of the progress bar
        this.__setElementId(this.progressBar);
        this.__setElementId(this.valueElem);
        this.__setElementId(this.fillElem);

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
       // create and style the buttons using Bootstrap
        btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "btn btn-light");

        // create "+" button
        this.__createBtnElement("+", btn, "plusBtn", this.incrementValue(),
                this.incrementButton,  "color: blue; text-align: right;"); 
        // create "-" button
        this.__createBtnElement("-", btn, "minusBtn", this.decrementValue(),
            this.decrementButton);

        // id generation and further styling 
        // if (text == "+") {
        //     // create an id for the incrementButton div 
        //     incrementButtonId = this.__setElementId(this.incrementButton);
        //     // create an id for the button
        //     btn.setAttribute("id", this.__generateId("plusBtn"));
        //     // set the increment functionality 
        //     btn.setAttribute("onclick", this.incrementValue());
        //     // styling
        //     btn.style.cssText = "color: blue; text-align: right;"
        //     // append to the div 
        //     let position = document.getElementById(incrementButtonId);
        //     position.appendChild(btn);
        // }
        // if (text == "-"){
        //     // create an id for the decrementButton div 
        //     decrementButtonId = this.__setElementId(this.decrementButton);
        //     // create an id for the button
        //     btn.setAttribute("id", this.__generateId("minusBtn"));
        //     // set the functionality
        //     btn.setAttribute("onclick", this.decrementValue());
        //     // append to the div 
        //     let position = document.getElementById(decrementButtonId);
        //     position.appendChild(btn);
        // }
        
   }

   __createBtnElement (text, btn, btnName, task, div, styling=null) {
        btn.innerHTML = text;
        let btnId = this.__setElementId(div);
        btn.setAttribute("id", this.__generateId(btnName));
        btn.setAttribute("onclick", task);
        btn.styling.cssText = styling;
        let position = document.getElementById(btnId);
        position.appendChild(btn);
   }

   __generateId (element) {
       let elementId = element + this.getId();

       return elementId;
   }

}