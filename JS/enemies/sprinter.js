import { resetHitStreak } from "/JS/towers/stacker.js";
import { enemyPositions } from "/maps/map1.js";
import { rounds } from "/JS/gejm.js";

export let sprinter = { x: 50, y: 50, speed: 10, alive: true, hp: 50, await: 150 };

export let currentPos = 0;

export let maxHP = sprinter.hp;

let canvas = document.getElementById('canvas');

export function sprint(spawnCondition = false){
    maxHP = 50 + (rounds * 10);
    if(sprinter.alive === true){
        if(sprinter.x != enemyPositions[currentPos].x * 50){
            sprinter.x += sprinter.speed;
        }
        if(sprinter.y != enemyPositions[currentPos].y * 50){
            sprinter.y += sprinter.speed;
        }
        if(currentPos < enemyPositions.length-1 && sprinter.x == enemyPositions[currentPos].x * 50 && sprinter.y == enemyPositions[currentPos].y * 50){
            currentPos++;
        }
    }else{
        if(sprinter.await < 0 && spawnCondition){
            currentPos = 0;
            sprinter.alive = true;
            sprinter.x = enemyPositions[currentPos].x*50;
            sprinter.y = enemyPositions[currentPos].y*50;
            sprinter.hp = maxHP;
            resetHitStreak();
        }
        sprinter.await--;
    }
}

export function drawFast(ctx){
    if(sprinter.alive){
        ctx.save();
        ctx.fillStyle = 'yellow';
        ctx.fillRect(sprinter.x, sprinter.y, 50, 50);
        ctx.restore();
    }
}