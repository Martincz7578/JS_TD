/* Normal enemy logic
Enemy ability: Being normal unlike me */

// Enemy info
export let normal = { x: 50, y: 50, speed: 2, alive: true, hp: 100 };

// Enemy pathing
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

// Max STANDARD health (increases every round)
export let maxHP=100;

//enemy moving algorithm
export function moveNormal(){
	//If he's alive
	if(normal.alive === true){
		//x check
		if(normal.x != pos[currentPos].x * 50){
			normal.x += normal.speed;
		}
		//y check
		if(normal.y != pos[currentPos].y * 50){
			normal.y += normal.speed;
		}
		//updating current position
		if(currentPos < pos.length-1 && normal.x == pos[currentPos].x * 50 && normal.y == pos[currentPos].y * 50){
			currentPos++;
		}
	}else{//he's ded
		if(normal.await < 0){
			currentPos = 0;
			normal.alive = true;
			normal.x = pos[currentPos].x*50;
			normal.y = pos[currentPos].y*50;
			maxHP += 10;
			normal.hp = maxHP;
			rounds++;
			if(rounds%10==0 && rounds > 5) normal.hp = maxHP * 5;
		}
		//wait, hold on, wait a minute
		normal.await--;
	}
}