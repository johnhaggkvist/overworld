import Game from './Game';
import './index.css';

console.log("index");
window.onload = function() {
    console.log("Loaded");
    let game = new Game("game");
    game.start();
};
