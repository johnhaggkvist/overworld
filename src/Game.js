import Sound from './Sound';
import Logo from './Logo';
import WorldMap from './WorldMap';
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
    this.sound = Sound.instance;

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
    this.sound.playMusic("intro");
  }

  game() {
    this.objects = [];
    this.scene = this.SCENE.GAME;
    this.sound.playMusic("overworld");
    this.map = new WorldMap();
    this.player = new Player(this.map.start.x * 16 + 8, this.map.start.y * 16 + 8);
    this.map.objects.forEach((object) => this.addObject(object));
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
      if (this.controller.space() && !this.player.swingingSword) {
        this.player.use(this.context);
        this.sound.playSound("sword");
      } else {
        if (this.controller.down()) {
         this.player.down();
        } else if (this.controller.up()) {
          this.player.up();
        }
        if (this.controller.right()) {
         this.player.right();
        } else if (this.controller.left()) {
         this.player.left();
        }
      }
    }

    if (this.map) this.map.update();
    if (this.player) this.player.update(this.objects);

    for (let object of this.objects) {
      if (!object.update()) {
        this.objects.splice(this.objects.indexOf(object), 1);
      };
    }
  }

  draw() {
    let offset = this.offset();
    this.context.clearRect(0, 0, this.width, this.height);

    if (this.map) this.map.draw(this.context, offset);

    for (let object of this.objects) {
      object.draw(this.context, offset);
    }

    if (this.player) this.player.draw(this.context, offset);
  }

  offset() {
    let x = 0, 
        y = 0;
    if (this.player) {
      x = this.player.x - this.width / 2;
      y = this.player.y - this.height / 2;
      
      if (x < 0) {
        x = 0;
      } else if (x > this.map.width * 16 - this.width) {
        x = this.map.width * 16 - this.width;
      }
      
      if (y < 0) {
        y = 0;
      } else if (y > this.map.height * 16 - this.height) {
        y = this.map.height * 16 - this.height;
      }
    }
    return {
      x: x,
      y: y
    };
  }
}

export default Game;
