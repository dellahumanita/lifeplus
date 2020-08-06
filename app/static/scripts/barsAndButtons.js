import { System } from "./system.js";

function findHabitIds () {
    return document.getElementsByClassName("habitId");
}

//TODO: attach all functions related to their creation here
function main() {
    let habitIds = findHabitIds();
    let systems = {};
    for (let i = 0; i < habitIds.length; i++) {
        systems[i] = {'sys': new System(habitIds[i])};
        console.log(systems[i]);
    }

    console.log(systems.length);
}


main();

console.log("Success!");