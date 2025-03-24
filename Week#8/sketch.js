let animation = [];
let food;
let character;
let score = 0;
let timer = 60;
let health = 100;
let bgMusic, goodSound, badSound;
let immovableObjects = [];
let goodItems = [];
let badItems = [];

function preload() {
  for (let j = 1; j <= 10; j++) {
    animation.push(loadImage(`assets/images/Attack (${j}).png`));
  }

  soundFormats('mp3', 'wav');
  bgMusic = loadSound('assets/sounds/background music.mp3');
  goodSound = loadSound('assets/sounds/good sound.mp3');
  badSound = loadSound('assets/sounds/bad sound.mp3');
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.frames = animation;
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
    let nextX = this.x;
    let nextY = this.y;

    if (this.moving.w) nextY -= this.speed;
    if (this.moving.s) nextY += this.speed;
    if (this.moving.a) nextX -= this.speed;
    if (this.moving.d) nextX += this.speed;

    let blocked = false;
    for (let obj of immovableObjects) {
      if (obj.collidesWith(nextX, nextY, 100)) {
        blocked = true;
        break;
      }
    }

    if (!blocked) {
      this.x = nextX;
      this.y = nextY;
    }
  }

  display() {
    this.updateFrame();
    image(this.frames[this.currentFrame], this.x, this.y, 100, 100);
  }

  checkCollision(food) {
    let distance = dist(this.x, this.y, food.x, food.y);
    if (distance < 60) {
      score++;
      food.respawn();
      if (goodSound && goodSound.isLoaded()) goodSound.play();
    }
  }

  checkGoodItemCollision() {
    for (let i = goodItems.length - 1; i >= 0; i--) {
      let item = goodItems[i];
      let d = dist(this.x, this.y, item.x, item.y);
      if (d < 40) {
        score++;
        goodItems.splice(i, 1);
        if (goodSound && goodSound.isLoaded()) goodSound.play();
      }
    }
  }

  checkBadItemCollision() {
    for (let i = badItems.length - 1; i >= 0; i--) {
      let item = badItems[i];
      let d = dist(this.x, this.y, item.x, item.y);
      if (d < 40) {
        health -= 20;
        badItems.splice(i, 1);
        if (badSound && badSound.isLoaded()) badSound.play();
      }
    }
  }
}

class Food {
  constructor() {
    this.respawn();
    this.respawnInterval = setInterval(() => {
      this.respawn();
    }, 3000);
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

class ImmovableObject {
  constructor() {
    this.x = random(50, 750);
    this.y = random(50, 750);
    this.size = 50;
  }

  display() {
    fill(0, 100, 200);
    rect(this.x, this.y, this.size, this.size);
  }

  collidesWith(x, y, size) {
    return (
      x < this.x + this.size &&
      x + size > this.x &&
      y < this.y + this.size &&
      y + size > this.y
    );
  }
}

class GoodItem {
  constructor() {
    this.x = random(50, 750);
    this.y = random(50, 750);
  }

  display() {
    fill(0, 255, 0);
    ellipse(this.x, this.y, 20, 20);
  }
}

class BadItem {
  constructor() {
    this.x = random(50, 750);
    this.y = random(50, 750);
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, 20, 20);
  }
}

function setup() {
  createCanvas(800, 800);
  character = new Character(10, 10);
  food = new Food();

  for (let i = 0; i < 3; i++) {
    immovableObjects.push(new ImmovableObject());
  }

  for (let i = 0; i < 5; i++) {
    goodItems.push(new GoodItem());
    badItems.push(new BadItem());
  }

  setInterval(() => {
    if (timer > 0) {
      timer--;
    } else {
      if (badSound && badSound.isLoaded()) badSound.play();
    }
  }, 1000);

  if (bgMusic && bgMusic.isLoaded()) {
    bgMusic.setLoop(true);
    bgMusic.play();
  }
}

function draw() {
  background(120);

  fill(255);
  textSize(32);
  text(`Score: ${score}`, 20, 40);
  text(`Time Left: ${timer}`, width - 200, 40);
  text(`Health: ${health}`, 20, 80);

  // 🏆 WIN
  if (score >= 10) {
    textSize(50);
    fill(0, 255, 0);
    text("You Win!", width / 2 - 100, height / 2);
    noLoop();
    return;
  }

  // 💀 LOSE
  if (timer <= 0 || health <= 0) {
    textSize(50);
    fill(255, 0, 0);
    text("Game Over!", width / 2 - 120, height / 2);
    noLoop();
    return;
  }

  for (let obj of immovableObjects) {
    obj.display();
  }

  for (let item of goodItems) {
    item.display();
  }

  for (let item of badItems) {
    item.display();
  }

  character.move();
  character.display();
  food.display();
  character.checkCollision(food);
  character.checkGoodItemCollision();
  character.checkBadItemCollision();
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