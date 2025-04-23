let img;

class Box extends threedshape
{
    constructor(x, y, speedX, speedY, width, height)
    {
        super(x,y, speedX, speedY);
        this.width = width;
        this.height = height;

    }

    draw()
    {
        push();
        super.moveShape();

        function preload() {
            img = loadImage ("CUTTING_disdain.jpg"); 

            function setup() {
                createCanvas(60, 40, WEBGL);
              }
              
              function draw() {
                background(100);
                
                texture(img);
            
                rotateY(frameCount * 0.01);
                box(200);
              }

        box(this.width, this.height);
        pop();
    }

}
}