let x = 0;
let y = 0;
let x2 = 800;
let y2 = 400;
let canvas;

function setup() {
  canvas = createCanvas(720, 480);
  
  // Optional: attach to specific container if defined
  const container = document.getElementById("p5-container");
  if (container) {
    canvas.parent(container);
  }
}

function draw() {
  background('#191970');

  // Draw moving circle
  fill(204, 204, 255); // light purple color
  noStroke();
  circle(x, y, 20);
  x = (x + 3) % width;
  y = (y + 1) % height;

  // Draw moving rectangle
  fill(255, 204, 204); // light red color
  rect(x2, y2, 20, 20);
  x2 = (x2 - 2 + width) % width;
  y2 = (y2 - 1 + height) % height;
}
