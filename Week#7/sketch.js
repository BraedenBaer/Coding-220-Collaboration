let animation = [];
let food;
let character;
let score = 0;
let timer = 60;
let bgMusic, goodSound, badSound; // Add sound variables

function preload() {
  animation = [];
  for (let j = 1; j <= 10; j++) {
    animation.push(loadImage(`assets/images/Attack (${j}).png`));
  }

  // Load sounds
  bgMusic = loadSound('background music.mp3');
  goodSound = loadSound('good sound.mp3');
  badSound = loadSound('bad sound.mp3');
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
    let distance = dist(this.x, this.y, food.x, food.y);
    if (distance < 60) {
      score++;
      food.respawn();

      // 🎵 Play Good Sound when food is collected
      goodSound.play();
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

  startMoving() {
    setInterval(() => {
      this.respawn();
    }, 3000);
  }
}

function setup() {
  createCanvas(800, 800);
  character = new Character(10, 10);
  food = new Food();

  setInterval(() => {
    if (timer > 0) {
      timer--;
    } else {
      // 🎵 Play Bad Sound when timer reaches zero
      badSound.play();
    }
  }, 1000);

  // Play background music and loop it
  bgMusic.loop();
}

function draw() {
  background(120);

  fill(255);
  textSize(32);
  text(`Score: ${score}`, 20, 40);
  text(`Time Left: ${timer}`, width - 200, 40);

  if (timer <= 0) {
    textSize(50);
    text("Game Over!", width / 2 - 120, height / 2);
    noLoop();
    return;
  }

  character.move();
  character.display();
  food.display();
  character.checkCollision(food);
}

// ✅ Convert key input to lowercase
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