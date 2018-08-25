'use strict';
class GameComponent {
  constructor(image, gridRow, xPosition) {
    this.sprite = image;
    this.row = gridRow;
    this.x = xPosition;
    this.y = gridRow * 85;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Enemies/Bugs our player must avoid
class Enemy extends GameComponent{
  constructor(level = 1) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    let image = 'images/enemy-bug.png';

    let xPosition = 0;

    let row = Math.floor(Math.random() * 3 + 1);

    super(image, row, xPosition);

    this.difficulty = level;

    this.speedX = Math.floor(Math.random() * 3 + (level * 2));
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    if (dt >= 0.01) {
      this.x += this.speedX;
    }
  }
}

class Player extends GameComponent {
  constructor(charImage = 'images/char-cat-girl.png') {
    let initCol = 3;
    let initRow = 100;

    super(charImage, initRow, initCol * 101);
    this.col = initCol;
    this.won = false;
  }
  setXYPosition() {
    this.x = this.col * 101;
    this.y = this.row * 83;
  }

  update() {
        this.col = 2;
   this.row = 4;
   this.setXYPosition();
   return;
/*    allEnemies.forEach((enemy) => {
      if (this.checkCollision(enemy)) {
        this.col = 2;
        this.row = 4;
        this.setXYPosition();
        return;
      }
    });*/
  }

/*  checkCollision(enemy) {
    if (this.row == enemy.row) {
      let playerLeft = this.x + 20;
      let playerRight = playerLeft + 50;
      let enemyLeft = enemy.x;
      let enemyRight = enemyLeft + 91;
      if ((playerLeft <= enemyRight && playerLeft >= enemyLeft) || (playerRight <= enemyRight && playerRight >= enemyLeft)) {
        return true; 
      }
    }
    return false;
  }*/

  handleInput(pressedKey) {
    if (this.row > 0) {
      switch (pressedKey) {
        case 'left':
          this.col = this.col > 0 ? this.col - 1 : 0;
          break;
        case 'right':
          this.col = this.col < 4 ? this.col + 1 : 4;
          break;
        case 'up':
          this.row = this.row > 0 ? this.row - 1 : 0;
          if (this.row == 0) {
            this.wins();
          }
          break;
        case 'down':
          this.row = this.row < 5 ? this.row + 1 : 5;
      }
    }
    this.setXYPosition();
  }

  wins() {
    this.won = true;
    announceWinning();
  }
  reset() {
    this.col = 2;
    this.row = 5;
    this.setXYPosition();
    this.won = false;
  }
}

function announceWinning() {
  setTimeout(function() {
    document.getElementById('win-modal').style.display = 'block';
  }, 1000);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

// Place the player object in a variable called player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

