export class UpdateService {
  static updateGame(player, webSocket = null) {
    this._updatePlayer(player);

    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(JSON.stringify(player));
    }
  }

  static updateOtherPlayer(player, xPos, yPos) {
    player.xPos = xPos;
    player.yPos = yPos;
  }

  static _updatePlayer(player) {
    player.update();
  }
}
