let animation = [];
let food;
let character;

function preload() {
  for (let j = 1; j <= 10; j++) {
    animation.push(loadImage(`images/Attack (${j}).png`));
  }
}

class Character {
  constructor(x, y, frames) {
    this.x = x;
    this.y = y;
    this.frames = frames;
    this.currentFrame = 0;
    this.speed = 3;
    this.moving = { w: false, s: false, a: false, d: false };
  }

  updateFrame() {
    if (frameCount % 5 === 0) { // Update every 5 frames
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }
  }

  move() {
    if (this.moving.w) this.y -= this.speed;
    if (this.moving.s) this.y += this.speed;
    if (this.moving.a) this.x -= this.speed;
    if (this.moving.d) this.x += this.speed;
  }

  display() {
    this.updateFrame();
    image(this.frames[this.currentFrame], this.x, this.y, 100, 100);
  }

  checkCollision(food) {
    let d = dist(this.x + 25, this.y + 25, food.x, food.y); // Adjust for center
    console.log(d) 
    if (d < 30) { // Adjusted collision threshold
      food.respawn();
    }
  }
}

class Food {
  constructor() {
    this.respawn();
  }

  respawn() {
    this.x = random(50, 750);
    this.y = random(50, 750);
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 20, 20);
  }
}

function setup() {
  createCanvas(800, 800);
  character = new Character(10, 10, animation);
  food = new Food();
}

function draw() {
  background(120);
  character.move();
  character.display();
  food.display();
  character.checkCollision(food);
}

function keyPressed() {
  if (key === 'w') character.moving.w = true;
  if (key === 's') character.moving.s = true;
  if (key === 'a') character.moving.a = true;
  if (key === 'd') character.moving.d = true;
}

function keyReleased() {
  if (key === 'w') character.moving.w = false;
  if (key === 's') character.moving.s = false;
  if (key === 'a') character.moving.a = false;
  if (key === 'd') character.moving.d = false;
}