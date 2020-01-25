import { InputHandler } from './handlers/input-handler.mjs';
import { UpdateService } from './services/update-service.mjs';
import { DrawService } from './services/draw-service.mjs';

import { Player } from './player.mjs';

export class Game {
  static _player;

  static initializeGame() {
    this._player = new Player();

    InputHandler.initialize();
    DrawService.initialize();
  }

  static runGame() {
    UpdateService.updateGame(this._player);
    DrawService.drawGame(this._player);

    requestAnimationFrame(this.runGame.bind(this));
  }
}
