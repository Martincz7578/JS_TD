export let stacker = { x: 2000, y: 3000, speed: 10 };
export let stackerBullet = { x: 0, y: 0, speed: 15, angle: 0, active: false, damage: 10, tempDamage: 10 };

export let detectionRange = 250;
export let contactRange = 50;

export let damageCooldown = 0;  
export let currentCooldown = 0;
export const enemyCooldown = 100;

export let stackerAngle = 0;

let hitStreak = 0;
let highestStreakDemage = 0;

let canvas = document.getElementById('canvas');

export function resetHitStreak() { 
    hitStreak = 0; 
    highestStreakDemage = stackerBullet.tempDamage; 
    stackerBullet.tempDamage = stackerBullet.damage; 
}

export function moveStacker(target) {
    if (!target) return;
    stackerAngle = pythagorasStacker(target);
    shootStacker(target);
}

export function inRange(enemy, tower = stacker, range = detectionRange) {
    const dx = enemy.x - tower.x;
    const dy = enemy.y - tower.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= range;
}

export function shootStacker(target) {
    if (!stackerBullet.active && inRange(target)) {
        stackerBullet.x = stacker.x + 25;
        stackerBullet.y = stacker.y + 25;
        stackerBullet.angle = stackerAngle;
        stackerBullet.active = true;
    }
}

export function pythagorasStacker(enemy){
    let dx = enemy.x - stacker.x;
    let dy = enemy.y - stacker.y;
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
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.restore();
    }
}

export function ContactBool(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy) <= contactRange;
}

export function traceStackerBullet(enemy) {
    if (!stackerBullet.active) return;

    stackerBullet.x += Math.cos(stackerBullet.angle) * stackerBullet.speed;
    stackerBullet.y += Math.sin(stackerBullet.angle) * stackerBullet.speed;

    if (enemy.alive && ContactBool(enemy, stackerBullet)) {
        hitStreak++;
        stackerBullet.tempDamage = hitStreak % 3 === 0 ? hitStreak / 3 * stackerBullet.damage : highestStreakDemage;
        if (stackerBullet.tempDamage > highestStreakDemage) highestStreakDemage = stackerBullet.tempDamage;
        stackerBullet.active = false;
        damageCooldown = 5;
        if (enemy.hp - stackerBullet.tempDamage <= 0) {
            enemy.alive = false;
            enemy.await = enemyCooldown - 50;
            enemy.hp = 0;
            resetHitStreak();
        } else {
            enemy.hp -= stackerBullet.tempDamage;
        }
        stackerBullet.x = 2000;
        stackerBullet.y = 3000;
    }

    if (
        stackerBullet.x > canvas.width ||
        stackerBullet.x < 0 ||
        stackerBullet.y > canvas.height ||
        stackerBullet.y < 0
    ) {
        stackerBullet.active = false;
        stackerBullet.x = 2000;
        stackerBullet.y = 3000;
    }
}

export function setStackerPos(x, y) {
    stacker.x = x;
    stacker.y = y;
}