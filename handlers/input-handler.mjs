export class InputHandler {
  static _pressedKeys = {};

  static initialize() {
    document.addEventListener('keydown', evt => this._pressedKeys[evt.key] = true);
    document.addEventListener('keyup', evt => this._pressedKeys[evt.key] = false);
  }

  static isKeyPressed(key) {
    return this._pressedKeys[key] === true;
  }
}
