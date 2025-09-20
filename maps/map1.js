import { setStackerPos } from "../JS/towers/stacker.js";
import { revertChoice } from "../JS/gejm.js";

let turretPositions = [
    {x: 2, y: 2},
    {x: 3, y: 3},
    {x: 5, y: 5},
    {x: 6, y: 2},
    {x: 7, y: 4},
    {x: 8, y: 3}
]

let placedTowers = {
    stacker: false
}

export function setTower(position, tower) {
    switch(tower) {
        case "stacker":
            if (!placedTowers.stacker) {
                setStackerPos(turretPositions[position - 1].x * 50, turretPositions[position - 1].y * 50);
                placedTowers.stacker = true;
            }else{
                revertChoice(document.getElementById(`slot${position}`), "None");
            }
            break;
        case "None":
            break;
        default:
            console.log('Unknown tower type:', tower);
    }
}
