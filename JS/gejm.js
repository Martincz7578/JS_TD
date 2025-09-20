//importing enemy and tower types with their functions and data
import { stacker, moveStacker, drawStacker, drawStackerBullet, traceStackerBullet, setStackerPos/*, stackerBullet, stackerAngle, shootStacker*/ } from './towers/stacker.js';

import { normal, moveNormal/*, pos, currentPos, maxHP*/ } from './enemies/normal.js';


import { setTower } from '../maps/map1.js';

//exporting rounds for future boss rounds or other purposes
export let rounds = 0;

//adding rounds function
export function addRounds() { rounds++; }

//canvas and ctx setup
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//drawing canvas, enemies and towers
function draw(ctx) {
    ctx.clearRect(0, 0, 1920, 1080);
    drawStacker(ctx);
    drawStackerBullet(ctx);
    if (normal.alive === true) {
        ctx.fillStyle = 'red';
        ctx.fillRect(normal.x, normal.y, 50, 50);
    }
}

//calculating closest enemy for targeting
function calcClosestEnemy(tower, enemies) {
    let closestEnemy = null;
    let minDistance = Infinity;

    enemies.forEach(enemy => {
        if (enemy.alive) {
            const dx = enemy.x - tower.x;
            const dy = enemy.y - tower.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < minDistance) {
                minDistance = distance;
                closestEnemy = enemy;
            }
        }
    });

    return closestEnemy;
}

//main update function
function update() {
    traceStackerBullet(normal);
    moveNormal();

    const closest = calcClosestEnemy(stacker, [normal]);
    if (closest) {
        moveStacker(closest);
    }

    logz();
}

//logging
function logz() {
    document.getElementById('hp').innerText = normal.hp;
    document.getElementById('rounds').innerText = rounds;
}

//game loop
function gameLoop() {
    update();
    draw(ctx);
    requestAnimationFrame(gameLoop);
}

const one = document.getElementById("slot1");
const two = document.getElementById("slot2");
const three = document.getElementById("slot3");
const four = document.getElementById("slot4");
const five = document.getElementById("slot5");
const six = document.getElementById("slot6");

one.addEventListener("change", (event) => {
    let value = event.target.value;
    setTower(1, value);
});
two.addEventListener("change", (event) => {
    let value = event.target.value;
    setTower(2, value);
});
three.addEventListener("change", (event) => {
    let value = event.target.value;
    setTower(3, value);
});
four.addEventListener("change", (event) => {
    let value = event.target.value;
    setTower(4, value);
});
five.addEventListener("change", (event) => {
    let value = event.target.value;
    setTower(5, value);
});
six.addEventListener("change", (event) => {
    let value = event.target.value;
    setTower(6, value);
});

function revertChoice(element, previousValue) {
    element.value = previousValue;
}

//starting your eternal battle (totally not a DOOM reference)
gameLoop();