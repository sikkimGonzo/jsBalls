let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

function random(min, max){
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function Ball(x, y, velX, velY, color, size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function(){
    if(this.x + this.size >= width){
        this.velX = -this.velX;
    }
    if(this.x - this.size <= 0){
        this.velX = -this.velX;
    }
    if(this.y + this.size >= height){
        this.velY = -this.velY;
    }
    if(this.y - this.size <= 0){
        this.velY = -this.velY;
    }
    this.x += this.velX;
    this.y += this.velY;
}

Ball.prototype.collisionDetect = function(){
    balls.forEach(ball => {
        if(!(this === ball)){
            let dx = this.x - ball.x;
            let dy = this.y - ball.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < this.size + ball.size){
                ball.color = this.color = 
                `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
            }
        }
    });
}

let balls = [];
while(balls.length < 5){
    let x = random(0, width);
    let y = random(0, height);
    let velX = random(-7, 7);
    let velY = random(-7, 7);
    let color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    let size = random(10, 20);
    let ball = new Ball(x, y, velX, velY, color, size);
    balls.push(ball);
}

function loop(){
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);
    balls.forEach(x => {
        x.draw();
        x.update();
        x.collisionDetect();
    });
    requestAnimationFrame(loop);
}

loop();