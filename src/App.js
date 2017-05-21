import Music from './Music';
import logo from './logo.svg';
import './App.css';

class App {
  constructor(canvasId) {    
    this.music = new Music();
    this.music.play("intro");

    document.getElementById(canvasId).addEventListener("click", ev => this.music.play("overworld"));

  }
}

export default App;
