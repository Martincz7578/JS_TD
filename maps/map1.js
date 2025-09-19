import { setStackerPos } from "../JS/stacker.js"

let turretPositions = [
    {x: 2, y: 2},
    {x: 3, y: 3},
    {x: 5, y: 5}
]

export function setTower(position, tower) {
    switch(tower) {
        case "stacker":
            setStackerPos(position.x * 50, position.y * 50);
            break;
        default:
            console.log('Unknown tower type:', tower);
    }
}
