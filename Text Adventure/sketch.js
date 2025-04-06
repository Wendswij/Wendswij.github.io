// Refrenced from:
// https://editor.p5js.org/ehersh/sketches/Hk52gNXR7
// https://editor.p5js.org/msorret/sketches/G08MApKOd
// --------------------------------------------------------------------------------

// Global Variables and Initial Settings.
let gameState = "start"; // states the game to "start", "playing", and "gameover"
let items = []; // to hold object, specifically words.
let score = 0; // the player's score
let timer = 30; // time limit when playing
let lastTime; // stores the timer [Basically it counts the time like 3-2-1.]
let playerName; // player's name input
let difficulty; // adjust the difficulty of finding the words using sliders


// All animal options
let wordOptions = [
    "Deer", "Fox", "Bear", "Squirrel", "Owl", "Wolf", "Raccoon", "Woodpecker", "Chipmunk", "Badger", "Porcupine", "Beaver", "Moose", "Parrot", "Finch", "Elk", "Antelope", "Hedgehog", "Salamander", "Rabbit", "Wildcat", "Quokka", "Weasel", "Eagle", "Ladybug", "Butterfly", "Beetle", "BlueJay", "Hare", "Shrew"];
let allWords = []; // holds 30 animals and choose randomly (wordOptions)
let targetWords = []; // array for the words that needed to be found
let targetWordsRemaining = []; // tracks the target words taht aren't found yet.

// DOM elements. Declares the inputs, buttons, and containers.
let nameInput, diffSlider, fullScreenButton, centerButton;
let canvas;

// Make Canvas and attach it to the div in html.
function setup() {
    canvas = createCanvas(700, 500);
    canvas.parent("canvasContainer");
    textAlign(CENTER, CENTER);
    rectMode(CENTER);

    // to refrence the existing DOMS. using ID's.
    nameInput = select("#playerName");
    diffSlider = select("#difficultySlider");
    fullScreenButton = select("#fullScreenButton");

    // Buttons for start and restart.
    centerButton = createButton("Start Game");
    centerButton.addClass("centerButton");
    centerButton.parent("canvasContainer");
    centerButton.mousePressed(startGame); // press button to start game.

    // Only start game when name is inputed
    nameInput.elt.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            startGame();
        }
    });

    // To go fullscreen.
    fullScreenButton.mousePressed(toggleFullScreen);
}

// Fullscreen on or off.
function toggleFullScreen() {
    let fs = fullscreen();
    fullscreen(!fs);
}

// Start game after players name is placed and checked-
function startGame() {
    // Gets the player's name for other functions
    playerName = nameInput.value().trim();
    if (playerName === "") {
        alert("Please enter your name to start the game!");
        return; // if no name, no game
    }
    difficulty = Number(diffSlider.value()); // this is difficulty slider

    // Reset score, timer, and lasttime
    score = 0;
    timer = 30;
    lastTime = millis();
    items = []; // Clear item for game/next game

    // Shuffle words
    allWords = shuffleArray(wordOptions.slice()).slice(0, 30);

    // Randomly selects 10 out of 30 words to find
    targetWords = shuffleArray(allWords.slice()).slice(0, 10);
    targetWordsRemaining = [...targetWords];

    // Update words needed to be found and score and time.
    updateWordBar();
    updateScoreTime();


// --------------------------------------------------------------------------------
// Grid dimensions
    let cols = 6;
    let rows = 5;
    let cellWidth = width / cols;
    let cellHeight = height / rows;

    // Logic-
    // Loops each word so that it can position them on the grid with random placement. Based on difficulty.
    for (let i = 0; i < 30; i++) {
        let col = i % cols;
        let row = floor(i / cols);
        let baseX = (col + 0.5) * cellWidth;
        let baseY = (row + 0.5) * cellHeight;
        let jitterRangeX = (difficulty / 100) * (cellWidth / 2);
        let jitterRangeY = (difficulty / 100) * (cellHeight / 2);
        let x = baseX + random(-jitterRangeX, jitterRangeX);
        let y = baseY + random(-jitterRangeY, jitterRangeY);

        // Makes the words vary. In colours, sizes, position, and angle. And if its a target.
        items.push({
            text: allWords[i],
            x: x,
            y: y,
            size: random(16, 32),
            angle: random(-PI / 16, PI / 16),
            color: color(random(150, 255), random(150, 255), random(150, 255)),
            target: targetWords.includes(allWords[i])
        });
    }

    // To hide the "start game" button and change it to play
    centerButton.hide();
    gameState = "playing";
}

// Tried using the 'Fisher-Yates algorithm'??? for utility function to shuffle the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = floor(random(i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// A Function to update the target word bar to display the words that is not found yet.
function updateWordBar() {
    let wordBar = select("#wordBar");
    wordBar.html("Target Words: " + targetWordsRemaining.join(", "));
}

// Function to update the score and time. Display.
function updateScoreTime() {
    let scoreDisplay = select("#scoreDisplay");
    let timeDisplay = select("#timeDisplay");
    scoreDisplay.html(playerName + "'s score: " + score);
    timeDisplay.html("Time: " + timer + " s");
}

// Use global mousePressed function to click words on the canvas
function mousePressed() {
    // to only register the clicks when playing
    if (gameState !== "playing") return;
    for (let i = items.length - 1; i >= 0; i--) {
        let item = items[i];
        let d = dist(mouseX, mouseY, item.x, item.y);
        if (d < 20) { // If the click is within a hit radius of 20 pixels
            if (item.target && targetWordsRemaining.includes(item.text)) { // Check if the clicked word is a target and has not been found yet
                targetWordsRemaining = targetWordsRemaining.filter(word => word !== item.text); // Remove the word from the remaining targets and the items array
                items.splice(i, 1);
                score++; // Adds the score
                updateWordBar(); // Update words
                updateScoreTime(); // Updates score and timer
                break;
            }
        }
    }
}

function draw() {
    background(30);

    if (gameState === "start") {
        fill(255);
        textSize(24);
        textAlign(CENTER, CENTER);
        text("Enter your name to play!", width / 2, height / 2 - 50);
    }
    else if (gameState === "playing") {
        let currentTime = millis(); // Update the timer every second
        if (currentTime - lastTime >= 1000) {
            timer--;
            lastTime = currentTime;
            updateScoreTime();
        }

        for (let item of items) {
            push();
            translate(item.x, item.y);
            rotate(item.angle);
            textSize(item.size);
            fill(item.color);
            text(item.text, 0, 0);
            pop();
        }

        // Check if the player has found all target words. win condition logic.
        if (targetWordsRemaining.length === 0) {
            gameState = "GAMEOVER!";
            centerButton.html("Play Again?");
            centerButton.show();
        }

        // Check if time has run out. lose condition logic.
        if (timer <= 0) {
            gameState = "GAMEOVER!";
            centerButton.html("Time's Up, " + playerName + "! Play Again?");
            centerButton.show();
        }
    }
    else if (gameState === "GAMEOVER!") { // Game over display message. if player win or lose.
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        if (targetWordsRemaining.length === 0) {
            text("You WIN! Congratulations " + playerName + "!", width / 2, height / 2 - 50);
        } else {
            text("GAMEOVER " + playerName + "!", width / 2, height / 2 - 50);
        }
    }
}

// Exit fullscreen mode. Binded to escape key.
function keyPressed() {
    if (keyCode === ESCAPE && fullscreen()) {
        fullscreen(false);
    }
}