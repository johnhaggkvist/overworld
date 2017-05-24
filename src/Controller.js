class Controller {
  
  KEYCODES = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    ENTER: 13
  };

  constructor() {
    this.keyStates = {};
    let toggleKey = (keyCode, down) => this.keyStates[keyCode] = down;

    window.addEventListener('keydown', (event) => toggleKey(event.keyCode, true));
    window.addEventListener('keyup',   (event) => toggleKey(event.keyCode, false));
  }

  pressed(keyCode) {
    return !!this.keyStates[keyCode];
  }

  up() {
    return this.pressed(this.KEYCODES.UP);
  }

  down() {
    return this.pressed(this.KEYCODES.DOWN);
  }

  left() {
    return this.pressed(this.KEYCODES.LEFT);
  }

  right() {
    return this.pressed(this.KEYCODES.RIGHT);
  }

  space() {
    return this.pressed(this.KEYCODES.SPACE);
  }

  enter() {
    return this.pressed(this.KEYCODES.ENTER);
  }
  
}

export default Controller;
