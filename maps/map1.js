import { setStackerPos, stacker } from "/JS/towers/stacker.js";
import { setSniperPos, sniper } from "/JS/towers/sniper.js";

import { pos } from "/JS/enemies/normal.js";

import { revertChoice } from "/JS/gejm.js";

let turretPositions = [
    {x: 2, y: 2},
    {x: 3, y: 3},
    {x: 5, y: 5},
    {x: 6, y: 2},
    {x: 7, y: 4},
    {x: 8, y: 3}
]

let towersStates = {
    stacker: { placed: false, pos: null },
    sniper: { placed: false, pos: null }
}

function isPositionOccupied(position) {
    switch(position) {
        case towersStates.stacker.pos:
            towersStates.stacker.placed = false;
            towersStates.stacker.pos = null;
            setStackerPos(2000, 3000);
            break;
        case towersStates.sniper.pos:
            towersStates.sniper.placed = false;
            towersStates.sniper.pos = null;
            setSniperPos(2000, 3000);
            break;
    }
}

export function setTower(position, tower) {
    switch(tower) {
        case "stacker":
            if (!towersStates.stacker.placed) {
                isPositionOccupied(position);
                setStackerPos(turretPositions[position - 1].x * 50, turretPositions[position - 1].y * 50);
                towersStates.stacker.placed = true;
                towersStates.stacker.pos = position;
            }else{
                revertChoice(document.getElementById(`slot${position}`), "None");
            }
            break;
        case "sniper":
            if(!towersStates.sniper.placed) {
                isPositionOccupied(position);
                setSniperPos(turretPositions[position - 1].x * 50, turretPositions[position - 1].y * 50);
                towersStates.sniper.placed = true;
                towersStates.sniper.pos = position;
            }else{
                revertChoice(document.getElementById(`slot${position}`), "None");
            }
            break;
        case "None":
            isPositionOccupied(position);
            break;
        default:
            console.log('Unknown tower type:', tower);
    }
}
