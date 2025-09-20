import { setStackerPos } from "../JS/towers/stacker.js";

let turretPositions = [
    {x: 2, y: 2},
    {x: 3, y: 3},
    {x: 5, y: 5}
]

export function setTower(position, tower) {
    console.log('Setting tower:', tower, 'at position:', position);
    console.trace();
    switch(tower) {
        case "stacker":
            setStackerPos(turretPositions[position - 1].x * 50, turretPositions[position - 1].y * 50);
            break;
        default:
            console.log('Unknown tower type:', tower);
    }
}
