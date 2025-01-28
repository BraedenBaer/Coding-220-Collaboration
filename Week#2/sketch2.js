//llink to piece
//https://editor.p5js.org/

//This is what chat GPT came up with for a pizza made with code:
function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(255);
  
    // Draw a brown circle for the pizza base
    fill(160, 82, 45);
    ellipse(200, 200, 300, 300);
  
    // Draw red circles for tomato sauce
    fill(255, 0, 0);
    ellipse(150, 150, 100, 100);
    ellipse(250, 250, 100, 100);
  
    // Draw yellow circles for cheese
    fill(255, 255, 0);
    ellipse(180, 220, 80, 80);
    ellipse(220, 180, 80, 80);
  }
  