// Enemy logic moved from player.js
export let enemy = { x: 50, y: 50, speed: 2, alive: true, hp: 100 };

export let pos = [
    {x: 1, y: 1},
    {x: 2, y: 1},
    {x: 3, y: 1},
    {x: 4, y: 1},
    {x: 4, y: 2},
    {x: 4, y: 3},
    {x: 4, y: 4},
    {x: 4, y: 5}
];

export let currentPos = 0;

export let maxHP=100;

export function moveEnemy(){
	if(enemy.alive === true){
		if(enemy.x != pos[currentPos].x * 50){
			enemy.x += enemy.speed;
		}
		if(enemy.y != pos[currentPos].y * 50){
			enemy.y += enemy.speed;
		}
		if(currentPos < pos.length-1 && enemy.x == pos[currentPos].x * 50 && enemy.y == pos[currentPos].y * 50){
			currentPos++;
		}
	}else{
		if(enemy.await < 0){
			currentPos = 0;
			enemy.alive = true;
			enemy.x = pos[currentPos].x*50;
			enemy.y = pos[currentPos].y*50;
			maxHP += 10;
			enemy.hp = maxHP;
			rounds++;
			if(rounds%10==0 && rounds > 5) enemy.hp = maxHP * 5;
		}
		enemy.await--;
	}
}
