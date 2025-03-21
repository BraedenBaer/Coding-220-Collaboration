var animation = [];

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
    this.size = 80; // Size used for collision

    setInterval(() => this.updateFrame(), 50);
  }

  updateFrame() {
    this.currentFrame++;
    if (this.currentFrame >= this.frames.length) {
      this.currentFrame = 0;
    }
  }

  display() {
    image(this.frames[this.currentFrame], this.x, this.y, this.size, this.size);
  }
}

class Food {
  constructor() {
    this.size = 30;
    this.respawn(); // Start at a random position
  }

  respawn() {
    this.x = random(width - this.size);
    this.y = random(height - this.size);
  }

  display() {
    fill(255, 100, 100);
    noStroke();
    ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size);
  }

  isEaten(character) {
    let d = dist(this.x + this.size / 2, this.y + this.size / 2, character.x + character.size / 2, character.y + character.size / 2);
    return d < (this.size + character.size) / 2;
  }
}

let character;
let food;

function setup() {
  createCanvas(800, 800);
  character = new Character(100, 100, animation);
  food = new Food();
}

function draw() {
  background(120);
  character.display();
  food.display();

  if (food.isEaten(character)) {
    food.respawn();
    // You could add score or sound here
  }

  // Character movement with arrow keys
  if (keyIsDown(LEFT_ARROW)) character.x -= 3;
  if (keyIsDown(RIGHT_ARROW)) character.x += 3;
  if (keyIsDown(UP_ARROW)) character.y -= 3;
  if (keyIsDown(DOWN_ARROW)) character.y += 3;
}