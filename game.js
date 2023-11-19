// Game state
let phase = "waiting"; // waiting | stretching | turning | walking transitioning | falling
let lastTimestamp;

let heroX; // Changes when moving forward
let heroY; // Only changes when falling
let sceneOffset; // Moves the whole game

let platforms = [];
let sticks = [];

let score = 0;

// Configuration
const canvasWidth = 375;
const canvasHeight = 375;
const platformHeight = 100;

// Getting the canvas element
const canvas = document.getElementById("game");

// Getting the drawing context
const ctx = canvas.getContext("2d");

// Further UI elements
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart");

// Start game
resetGame();

// Resets game state and layout
function resetGame() {
  // Reset game state
  phase = "waiting";
  lastTimestamp = undefined;

  // The first platform is always the same
  platforms = [{ x: 50, w: 50 }];
  generatePlatform();
  generatePlatform();
  generatePlatform();
  generatePlatform();

  // Initialize hero position
  heroX = platforms[0].x + platforms[0].w - 30; // Hero positioned before the edge
  heroY = 0;

  // How much we should shift the screen back
  sceneOffset = 0;

  // There's always a stick, even if it appears to be invisible (length: 0)
  sticks = [{ x: platforms[0].x + platforms[0].w, length: 0, rotation: 0 }];

  // Score
  score = 0;

  // Reset UI
  restartButton.style.display = "none"; // Hides reset button
  scoreElement.innerText = score; // Reset score display

  draw();
}

function generatePlatform() {
  const minGap = 40;
  const maxGap = 200;
  const minWidth = 20;
  const maxWidth = 100;

  // X coordinate of the right edge of the furthest platform
  const lastPlatform = platforms[platforms.length - 1];
  let furthestX = lastPlatform.x + lastPlatform.w;

  const x = furthestX + minGap + Math.floor(Math.random() * (maxGap - minGap));
  const w = minWidth + Math.floor(Math.random() * (maxWidth - minWdith));

  platforms.push({ x, w });
}

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Save the current transformation
  ctx.save();

  // Shifting the view
  ctx.translate(-sceneOffset, 0);

  // Draw scene
  drawPlatforms();
  drawHero();
  drawSticks();

  // Restore transformation to the last save
  ctx.restore();
}

window.addEventListener("mousedown", (e) => {});

window.addEventListener("mouseup", (e) => {});

function animate(timestamp) {}
