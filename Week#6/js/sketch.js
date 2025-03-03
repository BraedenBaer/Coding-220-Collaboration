let animation = [];
let food;
let character;
let score = 0;
let timer = 60; //Countdown timer
let gameOver = false; // Check if game is over

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
    if (frameCount % 5 === 0) {
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
    if (gameOver) return; // Stop checking collision if game is over

    let d = dist(this.x + 50, this.y + 50, food.x, food.y);
    if (d < 30) {
      score++;
      food.respawn(); // I had chatgpt help me with this part
    }
  }
}

class Food {
  constructor() {
    this.respawn();
    this.startMoving();
  }

  respawn() {
    this.x = random(50, 750);
    this.y = random(50, 750);
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 20, 20);
  }

  moveRandomly() {
    this.x = random(50, 750);
    this.y = random(50, 750);
    this.startMoving();
  }

  startMoving() {
    if (gameOver) return; 

    let randomTime = random(1000, 5000);
    setTimeout(() => {
      this.moveRandomly();
    }, randomTime);
  }
} // I had chatgpt help me with this part


function startTimer() {
  let countdown = setInterval(() => {
    if (timer > 0) {
      timer--;
    } else {
      clearInterval(countdown);
      gameOver = true; // I used chatgpt for help with this part as well
    }
  }, 1000);
}

function setup() {
  createCanvas(800, 800);
  character = new Character(10, 10, animation);
  food = new Food();
  startTimer(); // Start countdown when game begins
}

function draw() {
  background(120);

  if (gameOver) {
    // Display Game Over screen
    fill(255, 0, 0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2);
    textSize(32);
    text(`Final Score: ${score}`, width / 2, height / 2 + 50);
    return;
  }

  character.move();
  character.display();
  food.display();
  character.checkCollision(food);

  // Display score
  fill(255);
  textSize(24);
  text(`Score: ${score}`, 20, 30);

  // Display timer
  text(`Time Left: ${timer}s`, width - 150, 30);
}

function keyPressed() {
  let k = key.toLowerCase();
  if (k === 'w') character.moving.w = true;
  if (k === 's') character.moving.s = true;
  if (k === 'a') character.moving.a = true;
  if (k === 'd') character.moving.d = true;
}

function keyReleased() {
  let k = key.toLowerCase();
  if (k === 'w') character.moving.w = false;
  if (k === 's') character.moving.s = false;
  if (k === 'a') character.moving.a = false;
  if (k === 'd') character.moving.d = false;
}