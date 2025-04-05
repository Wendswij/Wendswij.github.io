let allthekitties = []; // array to store all the lil kitty images
let currentkitty = 0;
let kittyposition = { x: 100, y: 100, w: 100, h: 100 };
let bounce = 0; // setup for bouncing animation
let bgColor; // background colour
let clickCount = 0; // kitty counter


// Followed week 11 tutorial with my own iterations/changes- [Added bouncing and change background colours]
function preload() {
    // used the TheCatAPI = 'https://api.thecatapi.com/v1/images/search?limit=10'; from https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
    let url = 'https://api.thecatapi.com/v1/images/search?limit=20&category_ids=5'; //load 20 kitty images from the cat API, with category 5
    loadJSON(url, successCallback);
}

function successCallback(data) {
    console.log(data);
    // to loop through each kitty data from the cat API
    for (let kitty of data) {
        let img = createImg(kitty.url, "kitty"); // create the img url
        img.hide();
        allthekitties.push(img); // store in the array. keeps it there
    }

    // save the JSON data in localStorage [for potential reuse]
    localStorage.setItem("savedKitties", JSON.stringify(data));

    // getitem to retrive and set the last kitty
    if (localStorage.getItem("lastKittyIndex")) {
        currentkitty = parseInt(localStorage.getItem("lastKittyIndex"));
    }
}

// basic canvas setup 
function setup() {
    createCanvas(600, 400);
    textAlign(CENTER, TOP);
    textSize(14);
    bgColor = color('#CCCCFF'); 

    // Additional stuff: Button to reset the kitty counter
    let resetBtn = createButton("Reset Kitty");
    resetBtn.position(10, height + 10);
    resetBtn.mousePressed(() => {
        currentkitty = 0;
        clickCount = 0;
        localStorage.setItem("lastKittyIndex", currentkitty);
        bounce = 15; // to make the image bounce to make it more dynamic
        bgColor = color('#CCCCFF'); // reset background colour
    });
}

function draw() {
    background(bgColor);

    if (allthekitties.length > 0) {
        let kitty = allthekitties[currentkitty];
        let yBounce = bounce > 0 ? sin(frameCount * 0.3) * bounce : 0;
        image(kitty, kittyposition.x, kittyposition.y + yBounce, kittyposition.w, kittyposition.h); // kitty with bounce effect yay

        fill(0);
        textStyle(BOLD);
        text("Kitty Counter 🐾: " + clickCount, width / 2, 10); // show click counter of the kitty almost like points from a whack-a-mole game :)
    } else {
        fill(0);
        text("Loading kitties...", width / 2, height / 2); // if anything happens, show loading text
    }

    if (bounce > 0) bounce *= 0.95; // ease out of the bounce effect. stop.
}

function mousePressed() {
    // makes the kitties change position after clicks
    if (mouseX > kittyposition.x && mouseX < kittyposition.x + kittyposition.w &&
        mouseY > kittyposition.y && mouseY < kittyposition.y + kittyposition.h) {
        nextKitty();
    }
}

// for other uses, a keyboard function. Incase the click/mouse broken or something
function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        nextKitty();
    } else if (keyCode === LEFT_ARROW) {
        prevKitty();
    }
}

function nextKitty() {
    currentkitty = (currentkitty + 1) % allthekitties.length;
    clickCount++;
    localStorage.setItem("lastKittyIndex", currentkitty);
    movekittyandchangecolor();
}

function prevKitty() {
    currentkitty = (currentkitty - 1 + allthekitties.length) % allthekitties.length;
    clickCount++;
    localStorage.setItem("lastKittyIndex", currentkitty);
    movekittyandchangecolor(); // move kitty and change background colour
}

function movekittyandchangecolor() {
    kittyposition.x = random(width - kittyposition.w); // move ze kitties to a new random position
    kittyposition.y = random(height - kittyposition.h - 40);
    bounce = 15;

    // makes/changes the canvas to a new random background colour
    bgColor = color(
        random(180, 255),  // R
        random(180, 255),  // G
        random(180, 255)   // B
      );
}