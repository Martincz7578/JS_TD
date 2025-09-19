/*This file contains the logic used for tower called "Stacker"
This towers ability is: stacking damage over time*/

//importing function for adding rounds from gejm.js
import { addRounds } from "../gejm.js";

//exporting data of the tower and its bullet
export let stacker = { x: 200, y: 300, speed: 10 };
export let stackerBullet = { x: 0, y: 0, speed: 15, angle: 0, active: false, hitStreak: 0, damage: 10, tempDamage: 10 };

//exportting ranges
export let detectionRange = 500;
export let contactRange = 50;

//exportting cooldowns
export let damageCooldown = 0;  
export let currentCooldown = 0;
export const maxCooldown = 100;

export let stackerAngle = 0;

//getting canvas info
let canvas = document.getElementById('canvas');

//ctx is not used for the time being
//let ctx = canvas.getContext('2d');

//actions/moves of the tower
export function moveStacker(target) {
    if (!target) return;
    stackerAngle = pythagorasStacker(target);
    shootStacker();
}

//shooting function
export function shootStacker() {
    if (!stackerBullet.active) {
        stackerBullet.x = stacker.x + 25;
        stackerBullet.y = stacker.y + 25;
        stackerBullet.angle = stackerAngle;
        stackerBullet.active = true;
    }
}

//calculations of the right aim angle
export function pythagorasStacker(enemy){
    let dx = enemy.x - stacker.x;
    let dy = enemy.y - stacker.y;
    return Math.atan2(dy, dx);
}

//the towers graphics
export function drawStacker(ctx){
    ctx.save();
    ctx.translate(stacker.x + 25, stacker.y + 25);
    ctx.rotate(stackerAngle);
    ctx.fillStyle = 'blue';
    ctx.fillRect(-25, -25, 50, 50);
    ctx.restore();
}

//the towers bullet graphics
export function drawStackerBullet(ctx){
    if (stackerBullet.active) {
        ctx.save();
        ctx.translate(stackerBullet.x, stackerBullet.y);
        ctx.rotate(stackerBullet.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.restore();
    }
}

//checking contact between tower bullet and enemy
function ContactBool(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy) <= contactRange;
}

//tracing the bullet and checking for contact with enemy
export function traceStackerBullet(enemy) {
    //checking if the bullet is active
    if (!stackerBullet.active) return;

    //calculating new position of the bullet
    stackerBullet.x += Math.cos(stackerBullet.angle) * stackerBullet.speed;
    stackerBullet.y += Math.sin(stackerBullet.angle) * stackerBullet.speed;

    //checking for contact with enemy
    if (enemy.alive && ContactBool(enemy, stackerBullet)) {
        stackerBullet.hitStreak++;
        if(stackerBullet.hitStreak % 3 === 0){
            stackerBullet.damage += 5;
        }
        stackerBullet.active = false;
        damageCooldown = 5;
        //enemy death or just damage :(
        if (enemy.hp - stackerBullet.tempDamage <= 0) {
            enemy.alive = false;
            enemy.await = maxCooldown - 50;
            enemy.hp = 0;
            addRounds();
        } else {
            enemy.hp -= stackerBullet.tempDamage;
        }//resetting bullet position to avoid bugs
        stackerBullet.x = 2000;
        stackerBullet.y = 2000;
    }else{//stack ability reset if no contact
        stackerBullet.hitStreak = 0;
        stackerBullet.tempDamage = stackerBullet.damage;
    }

    //out of bound check
    if (
        stackerBullet.x > canvas.width ||
        stackerBullet.x < 0 ||
        stackerBullet.y > canvas.height ||
        stackerBullet.y < 0
    ) {
        stackerBullet.active = false;
        stackerBullet.x = 2000;
        stackerBullet.y = 2000;
    }
}

export function setStackerPos(x, y) {
    stacker.x = x;
    stacker.y = y;
}