
// detect when incrementButton is being clicked so that
//  -   pop up message below the progress bar encouraging the user
//  -   extract tracking value as json file
//  -   add tracking value to the db 


//find all the habit divs 

function findHabitIds() {
    return document.getElementsByClassName("habitId");
}

function getHabitIdDivs(ids) {
    let habitIdDivs = [];
    for (let i = 0; i < ids.length; i++) {
        let hid = ids[i].innerHTML.trim();
        let divHid = document.getElementById(hid);
        habitIdDivs[i] = divHid;
    }

    return habitIdDivs;

}

function buttonListener (buttonName, message) {
    // find all habit ids
    let habitIds = findHabitIds();
    // extract habit object divs 
    let habitDivs = getHabitIdDivs(habitIds);
    //for each habit object div, get the button 
    for (let i = 0; i < habitDivs.length; i++) {
        let id = habitDivs[i].querySelector(".habitId").innerHTML.trim();
        console.log(habitDivs[i].innerHTML);
        //search for button id 
        let button = habitDivs[i].querySelector('button' + buttonName + id);
        console.log(button); //FIXME: returns null  
        // let buttonId = div.querySelector(div)
        // // when any part of the div is selected, do
        // $(div).click(   function(){

        // })
        //create an id for each button 

    }
    //display a message in each id div



    
}


function main() {
    buttonListener("#plusBtn", "Keep it up!");
    // buttonListener("#minusBtn", "Try again tomorrow.");    
    console.log("Ran buttonListeners.js");
}




main();
