import { enemy, moveEnemy, pos, currentPos, maxHP } from './enemies/normal.js';
import { stacker, stackerBullet, stackerAngle, moveStacker, shootStacker, drawStacker, drawStackerBullet, logsStacker, traceStackerBullet } from './towers/stacker.js';

let rounds = 0;
let bossRound = false;

let canvas = document.getElementById('canvas');
if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
}
let ctx = canvas.getContext('2d');

function isNear(a, b, range) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy) < range;
}

function ContactBool(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy) <= contactRange;
}

function draw(ctx) {
    ctx.clearRect(0, 0, 1920, 1080);
    drawStacker(ctx);
    drawStackerBullet(ctx);
    // Draw enemy
    if(enemy.alive === true){
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x, enemy.y, 50, 50);
    }
}

function update() {
    traceStackerBullet();
    moveEnemy();
    moveStacker();
    logsStacker();
    if(rounds % 10 == 0) bossRound = true;
    else bossRound = false;
}

function gameLoop() {
    update();
    draw(ctx);
    requestAnimationFrame(gameLoop);
}

gameLoop();