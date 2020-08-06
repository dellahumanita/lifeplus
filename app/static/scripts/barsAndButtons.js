import { System } from "./system.js";

function findHabitIds () {
    return document.getElementsByClassName("habitId");
}

//TODO: attach all functions related to their creation here
function main() {
    let habitIds = findHabitIds();
    let systems = {};
    for (let i = 0; i < habitIds.length; i++) {
        let habitIdVal = habitIds[i].innerHTML.trim();
        systems[i] = {'sys': new System(habitIdVal)};
        //TODO: still showing undefined?
        // console.log(systems[i]); 
    }

}


main();

console.log("Success!");