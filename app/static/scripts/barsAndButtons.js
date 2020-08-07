import { Habit } from "./habit.js";

function findHabitIds () {
    return document.getElementsByClassName("habitId");
}

function main() {
    let habitIds = findHabitIds();
    console.log(habitIds);
    let habits = {};
    // iteratively create a new habit for each system
    for (let i = 0; i < habitIds.length; i++) {
        let habitIdVal = habitIds[i].innerHTML.trim();
        console.log(habitIdVal);
        habits[i] = {
            'habit': new Habit(habitIdVal,
        document.querySelector("#" + CSS.escape(habitIdVal) ))};
    }

}


main();

console.log("Success!");