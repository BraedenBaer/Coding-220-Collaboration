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
    
    // Controls animation speed
    setInterval(() => this.updateFrame(), 50);
  }

  updateFrame() {
    this.currentFrame++;
    if (this.currentFrame >= this.frames.length) {
      this.currentFrame = 0;
    }
  }

  display() {
    image(this.frames[this.currentFrame], this.x, this.y);
  }
}

let character;

function setup() {
  createCanvas(800, 800);
  character = new Character(100, 100, animation);
}

function draw() {
  background(120);
  character.display();
}