// P5.Js: https://p5js.org/reference/
// Array methods reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

// Referenced and followed tutorial from:
// https://p5js.org/examples/classes-and-objects-snowflakes/
// https://editor.p5js.org/SamanthaCui/sketches/w_ZGlLsex
// Week/Class 8
// ----------------------------------------------------------------------------------------------------

// Created an array of objects. to hold the particles objects.
var particles = [];

// Try to work with the HTML elements in the DOM [UI elements]
var explosionSlider;
var explosionLabel;
var changeColorsButton;
var colorPalette = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF']; // Array of hex code colours
var shapeToggle = true; // Boolean toggle that alternates between shapes for each bursts.


// Start by creating the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);

  // To make container divs for all the controls. Also assign it an ID for easier styling
  let controls = createDiv('');
  controls.id('controls');

  // Made a label for the slider. Add to the controls container.
  explosionLabel = createP("Slide to Adjust the Explosion Force!<br>");
  explosionLabel.parent(controls);
  explosionLabel.addClass('explosion-label'); // Styling in css

  // Made the slider. Added to the container. - Styled in css.--
  explosionSlider = createSlider(1, 10, 5);
  explosionSlider.parent(controls);
  explosionSlider.addClass('explosion-slider');

  // Made a buton to change tehe cinfetti colours to make it more dynamic and fun. Assigned a click event handler.
  changeColorsButton = createButton('Change Confetti Colors');
  changeColorsButton.parent(controls);
  changeColorsButton.addClass("change-colors-button");
  changeColorsButton.mousePressed(changeConfettiColors);
}

// Canvas background
function draw() {
  background(17);

  // --------------------------------------------------
  // Canvas Background iteration.
  // function draw() {
  //   background(17, 25); 
  // --> add ',25' if want to make like fireworks from class. [Fade and glide]
  // --------------------------------------------------

  // To update and display each particle in the system.
  for (var p of particles) {
    p.update();
    p.display();
  }

  // Remove the particles from array when the 'lifecycle' is over. [Like when it fades away/over like that]
  particles = particles.filter(function (p) {
    return (p.alpha > 0 && p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height);
  });

  // Created an array containing info text. Also used .join() to help 'concentrate' the elements.
  var info = ["Particles: " + particles.length, "Explosion Force: " + explosionSlider.value()];
  fill(255);
  noStroke();
  text(info.join(" | "), 20, 150); // Display the infos of the particle on the canvas.
}

function mousePressed() {
  // When mouse is pressed, used the current slider value to define the explosion force.
  var force = explosionSlider.value();
  var numParticles = 100; // Number of particles created per explosion.

  // Creae a burst of particles [the particle system]
  for (var i = 0; i < numParticles; i++) {
    var angle = random(TWO_PI); // Random direction in radius.
    var speed = random(1, force); // Speed. influenced by explosion particles.
    var particleType = shapeToggle ? 'circle' : 'square'; // To alternate particle shapes of circles and squares. Uses the shapeToggle boolean.
    var col = color(random(colorPalette)); // The random colour generator from the colour palette array.
    particles.push(new Particle(mouseX, mouseY, angle, speed, particleType, col)); // Add new particles object to particles array. array of objects.
  }

  shapeToggle = !shapeToggle; // Shape toggle for the next burst.
}

// This one helps generate  a random hex colour string.
function getRandomHexColor() {
  let letters = '0123456789ABCDEF';
  let colorStr = '#';
  for (let i = 0; i < 6; i++) {
    colorStr += letters[floor(random(16))];
  }
  return colorStr;
}

// Function to change teh confetti colours by making a new colour palette. Used array.
function changeConfettiColors() {
  colorPalette = [getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor()];
}

// Particle class.
class Particle {
  constructor(x, y, angle, speed, type, col) {
    this.x = x; // X coordinate
    this.y = y; // Y coordinate
    this.vx = cos(angle) * speed; // X velocity
    this.vy = sin(angle) * speed; // Y velocity
    this.alpha = 255; // opacity start.
    this.type = type; // particle type.
    this.col = col; // colour of the particle.
    this.size = random(5, 12); // particle sizes
  }

  // Particle position. Gravity. Opacity fade.
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1; // the gravity part
    this.alpha -= 2; // the fade out effect
    this.col.setAlpha(this.alpha); // the colour fade
  }

  // 'Rendering' --
  display() {
    noStroke();
    fill(this.col);
    if (this.type === 'circle') {
      ellipse(this.x, this.y, this.size);
    } else {
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}