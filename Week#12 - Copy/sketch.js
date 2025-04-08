var shape1, shape2, shape3, shape4, shape5;
var shapes = [];
var currentNumber = 0;
function setup()
{
    createCanvas(800,800, WEBGL);
    shape1 = new Box(random(100,200),random(100,200), .02, .05, 50, 25);
    shape2 = new Torus(random(-50,-200),random(-10,-200), .01, .1, 30, 20);
    shape3 = new Torus(random(-50,-200),random(80,300), .08, .03, 80, 40);
    shape4 = new Box(random(50,250),random(50,100), .05, .15, 70, 15);
    shape5 = new Box(random(10,40),random(70,150), .04, .05, 100, 25);

    shapes[0] = shape1;
    shapes[1] = shape2;
    shapes[2] = shape3;
    shapes[3] = shape4;
    shapes[4] = shape5;


    setInterval(changeShape, 1500);
}

function draw()
{
    background(120,100, 150);
   // console.log(round(random(0,2)));
    
   shapes[currentNumber].draw();
    

}

function changeShape()
{
    currentNumber = round(random(0,4));
}