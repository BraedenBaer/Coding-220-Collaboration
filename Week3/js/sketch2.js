let img1, img2, img3;
let myFont;
let x = 50; // Moving image position
let y = 200; // Timer-based movement
let startTime;
let moveImg = false;

function preload() {
  img1 = loadImage("images/apple.png");
  img2 = loadImage("images/cookie.png");
  img3 = loadImage("images/hot dog.png"); // Renamed to avoid space issues
  myFont = loadFont("assests/fonts/Ardhelia_Free.ttf");
}

function setup() {
  createCanvas(600, 400);
  textFont(myFont);
  textSize(32);
  startTime = millis();  // Store start time for timer movement
}

function draw() {
  background(220);
  
  // Title
  text("Floating Food Stuffs", 50, 50);

  // Display images
  image(img1, x, 150, 100, 100); // Moving image
  image(img3, 350, 50, 100, 100);

  // Move img1 across the screen
  x += 2;
  if (x > width) {
    x = -100; // Reset when off-screen
  }

  // Timer logic for moving img2 (cookie)
  let elapsedTime = millis() - startTime;
  if (elapsedTime > 3000) {  // After 3 seconds, start moving
    moveImg = true;
  }

  if (moveImg) {
    y -= 2; // Move upwards
  }

  image(img2, 250, y, 100, 100); // Cookie moves based on timer
}