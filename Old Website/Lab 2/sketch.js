var mintBrick, orangeBrick, purpleCircle, yellowTriangle, cyanRect;
function setup(){
    createCanvas(600,350);
}

var mintBrick = {
    x: 0,
    y: 0,
    w: 80,
    h: 30,
    xSpeed: 3,
    ySpeed: 2,
    colour: '#58D68D',
    draw: function(){
        fill( this.colour );
        rect(this.x, this.y, this.w, this.h);
    },
    move: function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < 0 || this.x > width - this.w){
            this.xSpeed *= -1;
        }
        if(this.y > height - this.h || this.y < 0){
            this.ySpeed *= -1;
        }
    }
};

var orangeBrick = {
    x: 40,
    y: 50,
    w: 30,
    h: 30,
    xSpeed: 2,
    ySpeed: 1,
    colour: '#E59866',
    draw: function(){
        fill( this.colour );
        rect(this.x, this.y, this.w, this.h);
    },
    move: function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < 0 || this.x > width - this.w){
            this.xSpeed *= -1;
        }
        if(this.y < 0 || this.y > height - this.h){
            this.ySpeed *= -1;
        }
    }
};

var purpleCircle = {
    x: 100,
    y: 120,
    radius: 20,
    xSpeed: 1.5,
    ySpeed: 1,
    colour: '#BB8FCE',
    draw: function(){
        fill(this.colour);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    },
    move: function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < this.radius || this.x > width - this.radius) {
            this.xSpeed *= -1;
        }
        if(this.y > height - this.radius || this.y < this.radius) {
            this.ySpeed *= -1;
        }
    }
};

var yellowTriangle = {
    x: 200,
    y: 50,
    size: 30,
    xSpeed: 2,
    ySpeed: 1.2,
    colour: '#F9E79F',
    draw: function(){
        fill(this.colour);
        triangle(this.x, this.y, this.x - this.size, this.y + this.size, this.x + this.size, this.y + this.size);
    },
    move: function(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x < this.size || this.x > width - this.size) {
            this.xSpeed *= -1;
        }
        if (this.y > height - this.size || this.y < this.size) {
            this.ySpeed *= -1;
        }
    }
};

var cyanRect = {
    x: 500,
    y: 0,
    w: 30,
    h: 60,
    xSpeed: 0,
    ySpeed: 2.2,
    colour: '#85C1E9',
    draw: function(){
        fill(this.colour);
        rect(this.x, this.y, this.w, this.h);
    },
    move: function(){
        this.y += this.ySpeed;

        if (this.y < 0 || this.y > height - this.h) {
            this.ySpeed *= -1;
        }
    }
}; 

function draw(){
    background('#191970'); 
    mintBrick.draw();
    mintBrick.move();
    orangeBrick.draw();
    orangeBrick.move();
    purpleCircle.draw();
    purpleCircle.move();
    yellowTriangle.draw();
    yellowTriangle.move();
    cyanRect.draw();
    cyanRect.move();
}