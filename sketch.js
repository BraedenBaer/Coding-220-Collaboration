let flicker = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  background(10);

  // Flickering red ambient light
  flicker = random(150, 255);
  ambientLight(flicker, 0, 0);
  directionalLight(255, 0, 0, 0, 0, -1);

  // Move camera slowly for eerie feel
  rotateY(millis() * 0.0002);
  rotateX(sin(millis() * 0.0003) * 0.05);

  // Draw distorted breathing walls
  push();
  let breathing = 200 + sin(millis() * 0.002) * 30;
  fill(20, 0, 0);
  box(breathing, breathing, breathing, 10, 10);
  pop();

  // Draw creepy floating sphere that follows the mouse
  let mx = map(mouseX, 0, width, -200, 200);
  let my = map(mouseY, 0, height, -200, 200);
  push();
  translate(mx * 0.5, my * 0.5, 100);
  ambientMaterial(255, 100, 100);
  sphere(40 + sin(millis() * 0.01) * 10, 24, 24);
  pop();
}