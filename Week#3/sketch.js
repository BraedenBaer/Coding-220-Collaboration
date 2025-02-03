//This is what chatgpt made//

let pepperoni = [];
let cheeseColor;
let pizzaX, pizzaY;

function setup() {
  createCanvas(800, 800);
  cheeseColor = color(255, 255, 0); // Default cheese color (yellow)
  pizzaX = width / 2;
  pizzaY = height / 2;

  // Create random pepperoni positions
  for (let i = 0; i < 8; i++) {
    pepperoni.push({ x: random(350, 650), y: random(350, 650), speedX: random(-1, 1), speedY: random(-1, 1) });
  }
}

function draw() {
  background(255);

  // Make the pizza base move slightly
  pizzaX += random(-1, 1);
  pizzaY += random(-1, 1);

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
}

// Add pepperoni on mouse click
function mousePressed() {
  pepperoni.push({ x: mouseX, y: mouseY, speedX: random(-1, 1), speedY: random(-1, 1) });
}
