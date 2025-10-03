import { stacker, moveStacker, drawStacker, drawStackerBullet, traceStackerBullet } from './towers/stacker.js';
import { sniper, moveSniper, drawSniper, drawSniperBullet, traceSniperBullet } from './towers/sniper.js';

import { normal, moveNormal, drawNormal, leadSpawnCondition,  resetLeadSpawnCondition} from '/JS/enemies/normal.js';
import { tank, moveTank, drawTank } from '/JS/enemies/tank.js';
import { sprinter, sprint, drawFast } from '/JS/enemies/sprinter.js';

import { setTower } from '/maps/map1.js';

const towers = [stacker, sniper];
const enemies = [normal, tank, sprinter];
const moves = [moveNormal, moveTank, sprint];

export let rounds = 0;
export function addRounds() { rounds++; }
window.setRound = function(value) { rounds = value; }

const start = document.getElementById('start');
start.addEventListener('click', () => {
    start.style.display = 'none';
    gameLoop();
});

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function draw(ctx) {
    ctx.clearRect(0, 0, 1920, 1080);
    drawStacker(ctx);
    drawStackerBullet(ctx);
    drawSniper(ctx);
    drawSniperBullet(ctx);
    drawNormal(ctx);
    drawTank(ctx);
    drawFast(ctx);
}

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

function moveIt(tower, target){    
    switch(tower){
        case stacker:
            moveStacker(target);
            traceStackerBullet(target);
            break;
        case sniper:
            moveSniper(target);
            traceSniperBullet(target);
            break;
    }
}

function advance(){
    const notAlive = enemies.every(enemy => !enemy.alive);
    if(!notAlive && leadSpawnCondition) addRounds(); resetLeadSpawnCondition();
    moves.forEach(move => move(notAlive));
}

function update() {
    advance();
    for (let tower of towers) {
        let closer = calcClosestEnemy(tower, enemies);
        if(closer) moveIt(tower, closer);
    }
    logz();
}

function logz() {
    document.getElementById('hp').innerText = normal.hp;
    document.getElementById('rounds').innerText = rounds;
}

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

export function revertChoice(element, previousValue) {
    element.value = previousValue;
}