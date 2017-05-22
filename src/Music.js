class Music {
    constructor() {
        let audio = function(path) {
            let audio = new Audio(path);
            audio.loop = true;
            audio.preload = "auto";
            return audio;
        };

        this._intro = audio("intro.mp3");
        this._overworld = audio("overworld.mp3");
        this._gameover = audio("gameover.mp3");
    
        this.play = function(track) {
            if (this.playing) {
                this.playing.pause();
                this.playing.currentTime = 0;
                this.playing = undefined;
            }

            if (track === "intro") {
                this.playing = this._intro;
            } else if (track === "overworld") {
                this.playing = this._overworld;
            } else if (track === "gameover") {
                this.playing = this._gameover;
            }

            if (this.playing) {
                this.playing.play();
            }
        }
    }
}

export default Music;
