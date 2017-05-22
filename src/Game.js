import Music from './Music';
import Text from './Text';
import logo from './logo.svg';
import './Game.css';

class Game {
  constructor(canvasId) {    
    this.music = new Music();

    this.canvas = document.getElementById(canvasId);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.context = this.canvas.getContext('2d');
    this.objects = [];

    this.canvas.addEventListener("click", ev => this.addObject(new Text(Number.parseInt(Math.random()*10, 10), ev.offsetX, ev.offsetY)));
  }

  start() {
    this.gameloop();
    this.music.play("intro");
  }

  addObject(object) {
    this.objects.push(object);
    object.spawn();
  }

  gameloop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameloop());
  }

  update() {
    for (let object of this.objects) {
      if (!object.update()) {
        this.objects.splice(this.objects.indexOf(object), 1);
      };
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    for (let object of this.objects) {
      object.draw(this.context);
    }
  }
}

export default Game;
