import { InputHandler } from './handlers/input-handler.mjs';
import { UpdateService } from './services/update-service.mjs';
import { DrawService } from './services/draw-service.mjs';

import { Player } from './player.mjs';

export class Game {
  static _player;

  static _stateOfWorld;
  static _existingEntities = {};
  static _webSocket;

  static initializeGame() {
    this._player = new Player();

    InputHandler.initialize();
    DrawService.initialize();

    this._initializeWebSocket();
  }

  static _initializeWebSocket() {
    this._webSocket = new WebSocket('ws://localhost:8080');

    this._webSocket.onmessage = ({ data }) => {
      this._stateOfWorld = JSON.parse(data);
    };

    // this._webSocket.onopen = data => console.log({ data, log: 'websocket opened' });
    // this._webSocket.onerror = data => console.log({ data, log: 'websocket error' });
    // this._webSocket.onclose = data => console.log({ data, log: 'websocket close' });
  }

  static runGame() {
    UpdateService.updateGame(this._player, this._webSocket);
    DrawService.drawGame(this._player);

    if (this._stateOfWorld) {
      const entities = Object.values(this._stateOfWorld.entities);

      entities.forEach((entity) => {
        if (entity.id !== this._player.id) {
          const storedEntity = this._existingEntities[entity.id] || new Player(entity.id, entity.xPos, entity.yPos);

          UpdateService.updateOtherPlayer(storedEntity, entity.xPos, entity.yPos);
          DrawService.drawPlayer(storedEntity);

          this._existingEntities[entity.id] = this._existingEntities[entity.id] || storedEntity;
        }
      });
    }

    requestAnimationFrame(this.runGame.bind(this));
  }
}
