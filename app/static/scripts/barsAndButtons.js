import { Habit } from "./habit.js";

function findHabitIds () {
    return document.getElementsByClassName("habitId");
}

function main() {
    let habitIds = findHabitIds();
    let habits = [];

    // iteratively create a new habit for each system
    for (let i = 0; i < habitIds.length; i++) {
        let habitIdVal = habitIds[i].innerHTML.trim();
        habits[i] = {
            'habitObject': new Habit(habitIdVal,
                document.querySelector("#" + CSS.escape(habitIdVal) )) };
    }


    for (let i = 0; i < habits.length; i++) {
        var habitObj = habits[i].habitObject;
        habitObj.createProgressBar();
        habitObj.createButtons();

    }

    // var example = habits[0].habitObject;
    // example.incrementValue();
    // example.incrementValue();



}


main();

console.log("Success!");