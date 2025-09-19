//importing enemy and tower types with their functions and data
import { normal, moveNormal/*, pos, currentPos, maxHP*/ } from './enemies/normal.js';


import { setTowerPos } from '../maps/map1.js';

import { stacker, moveStacker, drawStacker, drawStackerBullet, traceStackerBullet/*, stackerBullet, stackerAngle, shootStacker*/ } from './towers/stacker.js';

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
    console.log(event.target.value);
    setTower(1, event.target.value);
});
two.addEventListener("change", (event) => {
    setTower(2, event.target.value);
});
three.addEventListener("change", (event) => {
    setTower(3, event.target.value);
});
four.addEventListener("change", (event) => {
    setTower(4, event.target.value);
});
five.addEventListener("change", (event) => {
    setTower(5, event.target.value);
});
six.addEventListener("change", (event) => {
    setTower(6, event.target.value);
});

export  function setTower(position, tower) {
    setTowerPos(position, tower);
}

//starting your eternal battle (totally not a DOOM reference)
gameLoop();