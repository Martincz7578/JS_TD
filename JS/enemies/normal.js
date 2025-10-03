import { resetHitStreak } from "/JS/towers/stacker.js";
import { enemyPositions } from "/maps/map1.js";
import { rounds } from "/JS/gejm.js";

export let normal = { x: 50, y: 50, speed: 2, alive: true, hp: 100, await: 50 };

export let currentPos = 0;

export let maxHP = normal.hp;

export let leadSpawnCondition = false;

let canvas = document.getElementById('canvas');

export function moveNormal(spawnCondition = false){
	maxHP = 100 + (rounds * 10);
	if(normal.alive === true){
		if(normal.x != enemyPositions[currentPos].x * 50){
			normal.x += normal.speed;
		}
		if(normal.y != enemyPositions[currentPos].y * 50){
			normal.y += normal.speed;
		}
		if(currentPos < enemyPositions.length-1 && normal.x == enemyPositions[currentPos].x * 50 && normal.y == enemyPositions[currentPos].y * 50){
			currentPos++;
		}
	}else{
		if(normal.await < 0 && spawnCondition){
			currentPos = 0;
			normal.alive = true;
			normal.x = enemyPositions[currentPos].x*50;
			normal.y = enemyPositions[currentPos].y*50;
			console.log(maxHP);
			normal.hp = maxHP;
			resetHitStreak();
			//leader function, will be moved.
			leadSpawnCondition = true;
		}
		normal.await--;
	}
}

export function resetLeadSpawnCondition(){
	leadSpawnCondition = false;
}

export function drawNormal(ctx){
	if(normal.alive){
		ctx.save();
		ctx.fillStyle = 'red';
		ctx.fillRect(normal.x, normal.y, 50, 50);
		ctx.restore();
	}
}