// Player/tower logic moved from player.js
export let stacker = { x: 200, y: 300, speed: 10 };
export let stackerBullet = { x: 0, y: 0, speed: 15, angle: 0, active: false, hitStreak: 0, damage: 10, tempDamage: 10 };

export let detectionRange = 500;
export let contactRange = 50;

export let damageCooldown = 0;
export let currentCooldown = 0;
export const maxCooldown = 100;

export let stackerAngle = 0;


export function isNear(a, b, range) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy) < range;
}

export function ContactBool(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy) <= contactRange;
}

export function moveStacker(action) {
    shootStacker();
}

export function shootStacker() {
    if (!stackerBullet.active) {
        stackerBullet.x = stacker.x + 25;
        stackerBullet.y = stacker.y + 25;
        stackerBullet.angle = stackerAngle;
        stackerBullet.active = true;
    }
}

export function pythagorasStacker(){
    let dx = normal.x - stacker.x;
    let dy = normal.y - stacker.y;
    return Math.atan2(dy, dx);
}

export function drawStacker(ctx){
    ctx.save();
    ctx.translate(stacker.x + 25, stacker.y + 25);
    ctx.rotate(stackerAngle);
    ctx.fillStyle = 'blue';
    ctx.fillRect(-25, -25, 50, 50);
    ctx.restore();
}

export function drawStackerBullet(ctx){
    if (stackerBullet.active) {
        ctx.save();
        ctx.translate(stackerBullet.x, stackerBullet.y);
        ctx.rotate(stackerBullet.angle);
        ctx.fillStyle = 'red';
        ctx.fillRect(-5, -5, 10, 10);
        ctx.restore();
    }
}

export function logsStacker(){
}

export function traceStackerBullet() {
    if (!stackerBullet.active) return;

    stackerBullet.x += Math.cos(stackerBullet.angle) * stackerBullet.speed;
    stackerBullet.y += Math.sin(stackerBullet.angle) * stackerBullet.speed;

    if (normal.alive && ContactBool(normal,stackerBullet)) {
        stackerBullet.hitStreak++;
        if(stackerBullet.hitStreak % 3 === 0){
            stackerBullet.damage += 5;
        }
        stackerBullet.active = false;
        damageCooldown = 5;
        if (normal.hp - stackerBullet.tempDamage <= 0) {
            normal.alive = false;
            normal.await = maxCooldown - 50;
            normal.hp = 0;
        } else {
            normal.hp -= stackerBullet.tempDamage;
        }
        stackerBullet.x = 2000;
        stackerBullet.y = 2000;
    }else{
        stackerBullet.hitStreak = 0;
        stackerBullet.tempDamage = stackerBullet.damage;
    }

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
