
// detect when incrementButton is being clicked so that
//  -   pop up message below the progress bar encouraging the user
//  -   extract tracking value as json file
//  -   add tracking value to the db 


//find all the habit divs 

function buttonListener (buttonDiv, message) {
    var habitIds = document.getElementsByClassName("habitId");
    for (let i = 0; i < habitIds.length; i++) {
        $("." + habitIds[i].innerHTML.trim()).ready( function() {
            $(buttonDiv).click(    function() {
                let content = message;
                $("#message").text(content);    //display message
            });    
        });
    }
}

function main() {
    buttonListener(".incrementButton", "Keep it up!");
    buttonListener(".decrementButton", "Try again tomorrow.");    
    console.log("Ran incrementButton.js");
}




main();
