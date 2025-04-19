// ------------------------
// This part is remixed from the "Bouncy Bubbles" tutorial.
// p5.js Referenced Tutorial: https://editor.p5js.org/p5/sketches/Motion:_Bouncy_Bubbles
// ------------------------

let bubbles = [];
let numBubbles = 17; // This is to set a specific number of bubbles
let initialSpeeds = []; // Sets the original speed for the reset button

function setup() {
    createCanvas(500,500);
    for (let i = 0; i < numBubbles; i++) { // Making the Bubbles (as objects) as seen in the p5.js reference
        let speedX = random(2, 4);
        let speedY = random(2, 4);
        bubbles.push(new Bubble(random(width), random(height), speedX, speedY, random(15, 40)));
        
        initialSpeeds.push({ speedX: speedX, speedY: speedY }); // The original speed
    }
}

function draw() {
    background(225); // Changed to lighter color for visibility

    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].checkEdges();
        bubbles[i].display();
    }
}

// This part is from the tutorial
class Bubble {
    constructor(x, y, speedX, speedY, radius) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.radius = radius;
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    checkEdges() {
        if (this.x > width - this.radius || this.x < this.radius) {
            this.speedX *= -1;
        }
        if (this.y > height - this.radius || this.y < this.radius) {
            this.speedY *= -1;
        }
    }

    display() {
        fill(0, 1, 255, 150);
        noStroke();
        ellipse(this.x, this.y, this.radius * 2);
    }
}

// ------------------------
// This part comes from W3Schools Tutorial for HTML DOM Element addEventListener().
// W3Schools Referenced Tutorial: https://www.w3schools.com/js/js_htmldom_eventlistener.asp
// ------------------------

    // Increase Speed Button
    document.getElementById("speedUpButton").addEventListener("click", function() {
        for (let i = 0; i < bubbles.length; i++) {
            bubbles[i].speedX *= 1.5;
            bubbles[i].speedY *= 1.5;
        }
    });

    // Decrease Speed Button
    document.getElementById("slowDownButton").addEventListener("click", function() {
        for (let i = 0; i < bubbles.length; i++) {
            bubbles[i].speedX *= 0.6;
            bubbles[i].speedY *= 0.6;
        }
    });

    // Reset Speed Button
    document.getElementById("resetButton").addEventListener("click", function() {
        for (let i = 0; i < bubbles.length; i++) {
            bubbles[i].speedX = initialSpeeds[i].speedX;
            bubbles[i].speedY = initialSpeeds[i].speedY;
        }
    });