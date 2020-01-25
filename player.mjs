import { InputHandler } from './handlers/input-handler.mjs';

export class Player {
  constructor(id = Date.now(), xPos = 0, yPos = 0) {
    this.id = id;
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
