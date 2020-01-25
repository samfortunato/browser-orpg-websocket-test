export class UpdateService {
  static updateGame(player) {
    this._updatePlayer(player);
  }

  static _updatePlayer(player) {
    player.update();
  }
}
