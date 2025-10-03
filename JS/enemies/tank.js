import { resetHitStreak } from "/JS/towers/stacker.js";
import { enemyPositions } from "/maps/map1.js";
import { rounds } from "/JS/gejm.js";

export let tank = { x: 50, y: 50, speed: 0.5, alive: true, hp: 1000, await: 100 };

export let currentPos = 0;

export let maxHP = 100;

let canvas = document.getElementById('canvas');

export function moveTank(spawnCondition = false){
    maxHP = 1000 + (rounds * 10);
    if(tank.alive === true){
        if(tank.x != enemyPositions[currentPos].x * 50){
            tank.x += tank.speed;
        }
        if(tank.y != enemyPositions[currentPos].y * 50){
            tank.y += tank.speed;
        }
        if(currentPos < enemyPositions.length-1 && tank.x == enemyPositions[currentPos].x * 50 && tank.y == enemyPositions[currentPos].y * 50){
            currentPos++;
        }
    }else{
        if(tank.await < 0 && spawnCondition){
            currentPos = 0;
            tank.alive = true;
            tank.x = enemyPositions[currentPos].x*50;
            tank.y = enemyPositions[currentPos].y*50;
            tank.hp = maxHP;
            resetHitStreak();
        }
        tank.await--;
    }
}

export function drawTank(ctx){
    if(tank.alive){
        ctx.save();
        ctx.fillStyle = 'gray';
        ctx.fillRect(tank.x-10, tank.y-10, 70, 70);
        ctx.restore();
    }
}