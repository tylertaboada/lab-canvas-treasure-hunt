// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const tileCount = 10;
const tileSize = width / tileCount;

// Iteration 1
function drawGrid() {
  context.lineWidth = 2;
  for (let x = 0; x <= height; x += tileSize) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = 0; y <= width; y += tileSize) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
}

class Character {
  constructor(col, row, direction) {
    this.col = col;
    this.row = row;
    this.direction = direction;
  }
  moveDown() {
    this.row = this.row + 1;
    this.direction = 'down';
  }
  moveUp() {
    this.row = this.row - 1;
    this.direction = 'up';
  }
  moveLeft() {
    this.col = this.col - 1;
    this.direction = 'left';
  }
  moveRight() {
    this.col = this.col + 1;
    this.direction = 'right';
  }
}

class Treasure {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.setRandomPosition();
  }
  setRandomPosition() {
    let randomPositionRow = Math.floor(Math.random() * 10);
    let randomPositionCol = Math.floor(Math.random() * 10);
    this.row = randomPositionRow;
    this.col = randomPositionCol;
  }
}

const treasure = new Treasure(0, 5);

const player = new Character(0, 0);

function drawTreasure() {
  const treasureImage = new Image();
  treasureImage.src = 'images/treasure.png';
  treasureImage.addEventListener('load', () => {
    context.drawImage(
      treasureImage,
      treasure.col * 50,
      treasure.row * 50,
      50,
      50
    );
  });
}

function drawPlayer() {
  if (player.direction === 'down') {
    const playerImage = new Image();
    playerImage.src = 'images/character-down.png';
    playerImage.addEventListener('load', () => {
      context.drawImage(playerImage, player.col * 50, player.row * 50, 50, 50);
    });
  } else if (player.direction === 'left') {
    const playerImage = new Image();
    playerImage.src = 'images/character-left.png';
    playerImage.addEventListener('load', () => {
      context.drawImage(playerImage, player.col * 50, player.row * 50, 50, 50);
    });
  } else if (player.direction === 'right') {
    const playerImage = new Image();
    playerImage.src = 'images/character-right.png';
    playerImage.addEventListener('load', () => {
      context.drawImage(playerImage, player.col * 50, player.row * 50, 50, 50);
    });
  } else if (player.direction === 'up') {
    const playerImage = new Image();
    playerImage.src = 'images/character-up.png';
    playerImage.addEventListener('load', () => {
      context.drawImage(playerImage, player.col * 50, player.row * 50, 50, 50);
    });
  }
}

window.addEventListener('keydown', event => {
  // Stop the default behavior (moving the screen to the left/up/right/down)
  event.preventDefault();

  // React based on the key pressed
  switch (event.keyCode) {
    case 37:
      player.moveLeft();
      break;
    case 38:
      player.moveUp();
      break;
    case 39:
      player.moveRight();
      break;
    case 40:
      player.moveDown();
      break;
  }
  if (player.col === treasure.col && player.row === treasure.row) {
    treasure.setRandomPosition();
    console.log('it worked');
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawEverything();
});

function drawEverything() {
  drawGrid();
  drawPlayer();
  drawTreasure();
}
drawEverything();
