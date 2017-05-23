import Music from './Music';
import Text from './Text';
import Logo from './Logo';
import Controller from './Controller';
import './Game.css';

class Game {
  constructor(canvasId) {    
    this.music = new Music();

    this.canvas = document.getElementById(canvasId);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.context = this.canvas.getContext('2d');
    this.objects = [];

    this.controller = new Controller();
  }

  start() {
    this.loading();    
  }

  intro() {
    this.gameloop();
    this.addObject(new Logo());
    //this.music.play("intro");
    this.canvas.addEventListener("click", ev => this.addObject(new Text(Number.parseInt(Math.random()*10, 10), ev.offsetX, ev.offsetY)));
  }

  loading() {
    let percentage = document.getElementById("loading").dataset.percent;

    if (percentage >= 1.0) {
        this.intro();
    } else {
      this.draw();

      let x = this.width / 4,
        y = this.height / 2 - 5,
        width = this.width / 2;

      this.context.fillStyle = 'darkred';
      this.context.fillRect(x - 2, y - 2, width + 4, 10 + 4);
      this.context.fillStyle = 'red';
      this.context.fillRect(x, y, width * percentage, 10);

      requestAnimationFrame(() => this.loading());
    } 
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
    if (this.controller.space()) {
      this.addObject(new Text(Number.parseInt(Math.random()*1000, 10), this.width/2, this.height / 4 * 3));
    }

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
