export class DrawService {
  static _canvas;
  static _ctx;

  static initialize() {
    this._canvas = document.querySelector('canvas');
    this._ctx = this._canvas.getContext('2d');

    this._canvas.width = 800;
    this._canvas.height = 600;
  }

  static drawGame(player) {
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
