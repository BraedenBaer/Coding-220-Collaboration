var sqaureX = 100;
var speed2X = 5;
var speed = 5;
var speedY = 5;
var appleImage;
var appleX = 200;
var myFont;

function setup()
{
  createCanvas(800,800);
  speed = random(1,20);
  speedY = random(1,20);
  appleImage = loadImage("assest/images/appleImage.jpg")
  myFont = loadFont("assests/fontsArdhelia_Free.ttf")
  setInterval(moveapple,1000);
}

function draw()
{
  background(100,100,100);
  sqaure(sqaureX,100, 50);
  square(sqaure2X, 200, 50);
  image(createImageBitmap, CSSMatrixComponent,400, 100, 100);
  if(keyIsPressed)
  {
    if(key == "d")
    {
      sqaureX += 10;
      sqaure += 10;
      //catX += 10;
    }
  }
  // square = squareX + speed;

  if(squareX+50 >= width || squareX < 0)
  {
    speed *= -1;
  }

textSize(32);
textFont(myFont);
text('Moving Food Stuffs', 200, 600);

}