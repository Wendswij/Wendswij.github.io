var x = 0;
var y = 0;
var x2 = 800;
var y2 = 400;

function setup(){
    createCanvas(720,480);
}

function draw(){
    background('#097969') // Javascript does this thing called automatic semicolon insertion
    circle(x,y,20,20); //moving circle
    x = x + 3;
    x = x % width; // modulo operator
    y = y + 1;
    y = y % height;

    rect(x2,y2,20,20); //moving rectangle
    x2 = x2 - 2 + width;
    x2 = x2 % width;
    y2 = y2 - 1 + height;
    y2 = y2 % height;
}