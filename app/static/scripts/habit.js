export class Habit {
    constructor (id, habitDiv) {
        // initialize fields 
        this.id = id;
        this.habitDiv = habitDiv;

        //setup progress bar and its components
        this.progressBar = this.habitDiv.querySelector('.progressBar');
        this.valueElem = this.progressBar.querySelector('.progressValue');
        this.fillElem = this.progressBar.querySelector('.progressFill');

        //setup buttons 
        this.incrementButton = this.habitDiv.querySelector(".incrementButton");
        this.decrementButton = this.habitDiv.querySelector(".decrementButton");

        this.trackingValue = parseInt(this.habitDiv.querySelector(".trackingValue").innerHTML.trim());
        this.goalValue = parseInt(this.habitDiv.querySelector(".goalValue").innerHTML.trim());
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
        div.setAttribute("id", this.__generateId(name));
    }


    // MAIN function create a function bar
    createProgressBar(initialValue = 0) {
        // generate and set ids for each component of the progress bar
        this.__setDivId(this.progressBar, "progressBar");
        this.__setDivId(this.valueElem, "progressValue");
        this.__setDivId(this.fillElem, "progressFill");

        this.__setValue(initialValue);
   
    }


    // sets the value of the progress bar
    __setValue (newValue) {
        let percentage = Math.round((newValue/this.goalValue) * 100)

        if (percentage < 0) {
            newValue = 0;
        }
        if (percentage > 100) {
            newValue = 100;
        }

        this.value = newValue;
        this.__update();
    }


    // __updates the text of the progress bar value
    __update () {
        const percentage = Math.round((this.trackingValue/this.goalValue) * 100) + '%';
        this.fillElem.style.width = percentage;
        this.valueElem.textContent = percentage;
    }


    // adds 1 to the value for the incrementButton
    incrementValue () {
        if (this.trackingValue < this.goalValue) {
            this.trackingValue++;
        }

        this.__setValue(this.trackingValue); 
   }


   // subtracts 1 from the value for the decrementButton
   decrementValue () {
       if (this.trackingValue > 0) {
        this.trackingValue--;
       }
       this.__setValue(this.trackingValue);
   }
   

   // MAIN function to create the button 
   createButtons () {
        // create "-" button
        this.__createBtnElement("-", "minusBtn",
            "decrementButton", this.decrementButton);
        // create "+" button
        this.__createBtnElement("+", "plusBtn",
            "incrementButton", this.incrementButton); 

   }


   // actually creating the button elements
   __createBtnElement (text, btnName, divName, div) {
        let btn = document.createElement("BUTTON"); 
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "btn btn-light");
        btn.style.cssText = "margin: 10px; display: inline-block;"
        btn.innerHTML = text;

        // set id of div
        let btnDivId = this.__generateId(divName);
        this.__setDivId(div, divName);

        // set id and and function of button
        btn.setAttribute("id", this.__generateId(btnName));
        var self = this;

        if (btnName == "plusBtn") {
            btn.addEventListener("click", function() { 
                self.incrementValue();    });
        }
        else {
            btn.addEventListener("click", function() {
                self.decrementValue();    });
        }

        // find position and add to the html
        let position = document.getElementById(btnDivId);
        position.appendChild(btn);
   }



}