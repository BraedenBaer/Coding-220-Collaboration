let textures = [];
let shapes = [];
let fontRegular;

function preload() {
  
  for (let i = 0; i < 5; i++) {
    textures[i] = loadImage(`https://picsum.photos/200?random=${i + 1}`);
  }

  fontRegular = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

function setup() {
  createCanvas(800, 600, WEBGL);
  textFont(fontRegular);

  let types = ['box', 'sphere', 'cylinder', 'cone', 'torus'];
  for (let i = 0; i < 5; i++) {
    shapes.push({
      type: types[i],
      tex: textures[i],
      speed: 0.01 + i * 0.01,
      angle: 0,
      pos: createVector(random(-250, 200), random(-230, 200), 0)
    });
  }
}

function draw() {
  background(100);
  orbitControl();

  for (let shape of shapes) {
    push();
    translate(shape.pos.x, shape.pos.y, shape.pos.z);
    rotateX(shape.angle);
    rotateY(shape.angle);
    texture(shape.tex);

    switch (shape.type) {
      case 'box': box(20); break;
      case 'sphere': sphere(20); break;
      case 'cylinder': cylinder(45, 70); break;
      case 'cone': cone(35, 60); break;
      case 'torus': torus(30, 10); break;
    }

    pop();
    shape.angle += shape.speed;
  }


  resetMatrix();
  camera(); 
  fill(255);
  textSize(16);
  text("Braeden Lee Baerlocher – Random Shapes Project", -400, -220);
  text("Random Clicking Shapes", -380, -190);
}

function mousePressed() {
  let indices = [];
  while (indices.length < 2) {
    let r = floor(random(shapes.length));
    if (!indices.includes(r)) {
      indices.push(r);
    }
  }

  for (let i of indices) {
    shapes[i].pos = createVector(random(-200, 200), random(-200, 200), 0);
  }
}