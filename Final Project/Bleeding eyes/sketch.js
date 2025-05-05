let drips = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  background(10);

  // red light
  ambientLight(200, 0, 0);
  directionalLight(255, 0, 0, 0, 0, -1);

  // rotate very slowly
  rotateY(frameCount * 0.002);

  // draw red cube
  push();
  fill(150, 0, 0);
  box(200);
  pop();

  // add blood dribs
  if (frameCount % 10 === 0) {
    drips.push({ x: random(-80, 80), y: -100 });
  }

  for (let i = drips.length - 1; i >= 0; i--) {
    let d = drips[i];
    d.y += 2;

    push();
    translate(d.x, d.y, 0);
    fill(180, 0, 0);
    sphere(4);
    pop();

    if (d.y > 150) drips.splice(i, 1);
  }

  // blinking eye with mouse
  let eyeX = map(mouseX, 0, width, -width / 2, width / 2);
  let eyeY = map(mouseY, 0, height, -height / 2, height / 2);
  let blink = abs(sin(frameCount * 0.1)) * 40;

  push();
  translate(eyeX, eyeY, 150);
  // Eyeball
  fill(255);
  sphere(20);
  // Iris
  fill(100, 0, 0);
  sphere(10);
  // top eyelid
  push();
  translate(0, -blink, 0);
  rotateX(PI / 2);
  fill(0);
  ellipse(0, 0, 40, 20);
  pop();
  // bottom eyelid
  push();
  translate(0, blink, 0);
  rotateX(PI / 2);
  fill(0);
  ellipse(0, 0, 40, 20);
  pop();
  pop();
}