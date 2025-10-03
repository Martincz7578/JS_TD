import { addRounds } from "../gejm.js";
import { ContactBool, enemyCooldown, inRange } from "./stacker.js";

export let sniper = { x: 2000, y: 3000, speed: 10 };
export let sniperBullet = { x: 0, y: 0, speed: 100, angle: 0, active: false, hitStreak: 0, damage: 250 };

export let detectionRange = 800;
export let contactRange = 50;

export let shootCooldown = 0;
export let damageCooldown = 0;  
export let currentCooldown = 0;
export const maxCooldown = 100;

export let sniperAngle = 0;

let canvas = document.getElementById('canvas');

export function moveSniper(target) {
    if (!target) return;
    sniperAngle = pythagorasSniper(target);
    shootSniper(target);
}

export function shootSniper(target) {
    if (!sniperBullet.active && currentCooldown <= 0 && inRange(target, sniper, detectionRange)) {
        sniperBullet.x = sniper.x + 25;
        sniperBullet.y = sniper.y + 25;
        sniperBullet.angle = sniperAngle;
        sniperBullet.active = true;
        currentCooldown = maxCooldown;
    }else if(currentCooldown > 0){
        currentCooldown--;
    }
}

export function pythagorasSniper(enemy) {
    let dx = enemy.x - sniper.x;
    let dy = enemy.y - sniper.y;
    return Math.atan2(dy, dx);
}

export function drawSniper(ctx) {
    ctx.save();
    ctx.translate(sniper.x + 25, sniper.y + 25);
    ctx.rotate(sniperAngle);
    ctx.fillStyle = 'green';
    ctx.fillRect(-25, -25, 50, 50);
    ctx.restore();
}

export function drawSniperBullet(ctx){
    if (sniperBullet.active) {
        ctx.save();
        ctx.translate(sniperBullet.x, sniperBullet.y);
        ctx.rotate(sniperBullet.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.restore();
    }
}

export function traceSniperBullet(enemy) {
    if(!sniperBullet.active) return;

    sniperBullet.x += Math.cos(sniperBullet.angle) * sniperBullet.speed;
    sniperBullet.y += Math.sin(sniperBullet.angle) * sniperBullet.speed;

    if (enemy.alive && ContactBool(sniperBullet, enemy)) {
        sniperBullet.active = false;
        damageCooldown = 5;
        if(enemy.hp - sniperBullet.damage <= 0) {
            enemy.alive = false;
            enemy.await = enemyCooldown - 50;
            enemy.hp = 0;
            addRounds();
        }else{
            enemy.hp -= sniperBullet.damage;
        }
        sniperBullet.x = 2000;
        sniperBullet.y = 3000;
    }

    if (
            sniperBullet.x > canvas.width ||
            sniperBullet.x < 0 ||
            sniperBullet.y > canvas.height ||
            sniperBullet.y < 0
        ) {
            sniperBullet.active = false;
            sniperBullet.x = 2000;
            sniperBullet.y = 3000;
        }
}

export function setSniperPos(x, y) {
    sniper.x = x;
    sniper.y = y;
}