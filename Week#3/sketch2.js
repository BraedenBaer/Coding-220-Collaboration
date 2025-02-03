//llink to piece
//https://editor.p5js.org/

//This is what I made//

let pepperoni = [];
let cheeseColor;
let pizzaX, pizzaY;

function setup() {
  createCanvas(1500, 700);
  cheeseColor = color(255, 255, 0); // Yellow
  pizzaX = width / 2;
  pizzaY = height / 2;
}

function draw() {
  background(255);

  // Make the pizza move
  pizzaX += random(-5, 5);
  pizzaY += random(-5, 5);

  // Pizza base
  fill(160, 82, 45);
  ellipse(pizzaX, pizzaY, 400, 400);

  // Tomato sauce
  fill(255, 10, 10);
  ellipse(pizzaX, pizzaY, 350, 350);

  // Cheese
  fill(cheeseColor);
  ellipse(pizzaX, pizzaY, 325, 325);

  // Move and draw pepperoni
  fill(255, 10, 10);
  for (let p of pepperoni) {
    p.x += p.speedX;
    p.y += p.speedY;

    // Bounce within pizza area
    if (dist(p.x, p.y, pizzaX, pizzaY) > 160) {
      p.speedX *= -1;
      p.speedY *= -1;
    }

    ellipse(p.x, p.y, 50, 50);
  }

  // Green olives (wiggle near mouse)
  fill(50, 200, 10);
  ellipse(mouseX + random(-5, 5), mouseY + random(-5, 5), 25, 25);
  ellipse(mouseX - 50 + random(-5, 5), mouseY + 30 + random(-5, 5), 25, 25);
  ellipse(mouseX + 50 + random(-5, 5), mouseY - 30 + random(-5, 5), 25, 25);

  // Display title
  fill(0);
  textSize(24);
  text("The Wacky Waving Wiggling Pizza", 20, height - 650)

  // Name
  textSize(16);
  text("Braeden Lee Baerlocher", 1300, height - 50);
}

// Add pepperoni on mouse click
function mousePressed() {
  pepperoni.push({ x: mouseX, y: mouseY, speedX: random(-1, 1), speedY: random(-1, 1) });
}


// Change cheese color when arrow keys up and down pressed
function keyPressed() {
  let colors = [
    color(255, 255, 0), // Yellow
    color(128, 0, 128), // Purple
    color(0, 0, 255), // Blue
    color(355, 300, 300), // White
  ];
  cheeseColor = random(colors);
}