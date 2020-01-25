class Player {
  constructor(xPos = 0, yPos = 0) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 32;
    this.height = 32;
    this.color = 'black';
    this.speed = 3;
  }

  update() {
    if (InputHandler.isKeyPressed('ArrowUp')) this.yPos -= this.speed;
    if (InputHandler.isKeyPressed('ArrowRight')) this.xPos += this.speed;
    if (InputHandler.isKeyPressed('ArrowDown')) this.yPos += this.speed;
    if (InputHandler.isKeyPressed('ArrowLeft')) this.xPos -= this.speed;
  }
}

const player = new Player();

class InputHandler {
  static _pressedKeys = {};

  static initialize() {
    document.addEventListener('keydown', evt => this._pressedKeys[evt.key] = true);
    document.addEventListener('keyup', evt => this._pressedKeys[evt.key] = false);
  }

  static isKeyPressed(key) {
    return this._pressedKeys[key] === true;
  }
}

class UpdateService {
  static updateGame() {
    this._updatePlayer(player);
  }

  static _updatePlayer(player) {
    player.update();
  }
}

class DrawService {
  static _canvas;
  static _ctx;

  static initialize() {
    this._canvas = document.querySelector('canvas');
    this._ctx = this._canvas.getContext('2d');

    this._canvas.width = 800;
    this._canvas.height = 600;
  }

  static drawGame() {
    this._clearCanvas();
    this._drawPlayer(player);
  }

  static _clearCanvas() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  static _drawPlayer(player) {
    this._ctx.fillStyle = player.color;
    this._ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
  }
}

class Game {
  static initializeGame() {
    InputHandler.initialize();
    DrawService.initialize();
  }

  static runGame() {
    UpdateService.updateGame();
    DrawService.drawGame();

    requestAnimationFrame(this.runGame.bind(this));
  }
}

Game.initializeGame();
Game.runGame();
