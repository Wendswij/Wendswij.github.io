function setup(){
    createCanvas(windowWidth,windowHeight);
}

function draw(){
    background(123, 104, 238);
    fill('#90EE90');
    stroke('#008080');
    for(let i = 0; i < 10000; i++){
        let x = (i*28) % width;
        let y = (i*11) % height;
        triangle(x, y, x+10, y+15, x-10, y+15);
    }
    
    fill('#B0E0E6');
    stroke('#0000CD');
    if(mouseX < 200){
        circle(mouseX,mouseY,80);
    }else{
        rect(mouseX,mouseY,60,40);
    }
}