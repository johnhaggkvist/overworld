import Music from './Music';
import Text from './Text';
import Logo from './Logo';
import Controller from './Controller';
import Player from './Player';
import './Game.css';

class Game {
  SCENE = {
    LOADING: 0,
    INTRO: 1,
    GAME: 2
  }

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
    this.scene = this.SCENE.LOADING;
    this.gameloop();
  }

  intro() {
    this.objects = [];
    this.addObject(new Logo());
    this.scene = this.SCENE.INTRO;
    //this.music.play("intro");
    //this.canvas.addEventListener("click", ev => this.addObject(new Text(Number.parseInt(Math.random()*10, 10), ev.offsetX, ev.offsetY)));
  }

  game() {
    this.objects = [];
    this.scene = this.SCENE.GAME;
    //this.music.play("overworld");
    this.player = new Player(this.width / 2, this.height / 2);
    this.addObject(this.player);
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
    } 
  }

  addObject(object) {
    this.objects.push(object);
    object.spawn();
  }

  gameloop() {
    if (this.scene === this.SCENE.LOADING) {
      this.loading();
    } else {
      this.update();
      this.draw();
    }

    requestAnimationFrame(() => this.gameloop());
  }

  update() {
    if (this.scene === this.SCENE.INTRO && (this.controller.space() || this.controller.enter())) {
      this.game();
    } else if (this.scene === this.SCENE.GAME) {
      if (this.controller.right()) {
        this.player.right();
      }
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
