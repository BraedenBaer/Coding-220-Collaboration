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

  // Extra white light to brighten cube
  directionalLight(255, 255, 255, 0, 1, -1);

  // Slow ambient camera movement
  rotateY(millis() * 0.0002);
  rotateX(sin(millis() * 0.0003) * 0.05);

  // Draw brighter, glowing breathing cube (the "room")
  push();
  let breathing = 200 + sin(millis() * 0.002) * 30;
  emissiveMaterial(100, 0, 0); // glowing dark red
  box(breathing, breathing, breathing, 10, 10);
  pop();

  // Creepy floating sphere that follows mouse
  let mx = map(mouseX, 0, width, -200, 200);
  let my = map(mouseY, 0, height, -200, 200);
  push();
  translate(mx * 0.5, my * 0.5, 100);
  ambientMaterial(255, 100, 100);
  sphere(40 + sin(millis() * 0.01) * 10, 24, 24);
  pop();
}
