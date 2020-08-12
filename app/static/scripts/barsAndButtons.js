import { Habit } from "./habit.js";

function findHabitIds () {
    return document.getElementsByClassName("habitId");
}

function findTrackingValues() {
    return document.querySelectorAll(".trackingValue");
}

export {findHabitIds, findTrackingValues};

function findGoalValues() {
    return document.querySelectorAll(".goalValue");
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

    let trackingValues = findTrackingValues();
    let goalValues = findGoalValues();

    for (let i = 0; i < habits.length; i++) {
        var habitObj = habits[i].habitObject;
        var trackingVal = trackingValues[i].innerHTML.trim();
        habitObj.createProgressBar(trackingVal);
        habitObj.createButtons();

    }


}


main();

// exported variables 
