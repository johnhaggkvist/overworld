class Sound {
    constructor(volume, musicVolume) {
        this.volume = volume || 0.25;

        function loadSounds(sounds) {
            let loadedSounds = [];
            for (let sound of sounds) {
                let audio = document.getElementById(sound);
                if (audio) {
                    loadedSounds.push(audio);
                } else {
                    console.error('Could not find: ' + sound);
                }
            }
            return loadedSounds;
        }
        this.sounds = loadSounds(['intro', 'overworld', 'gameover',
            'sword', 'bush']);

        // TODO: refactor into methods
        this.getSound = function(track) {
            for (let sound of this.sounds) {
                if (sound.id === track) {
                    return sound;
                }
            }
            return undefined;
        }

        this.setVolume = function(volume) {
            this.volume = volume;
            for (let sound of this.sounds) {
                sound.volume = this.volume;
            }
        }

        this.setVolume(this.volume);

        this.playMusic = function(track) {
            if (this.playing) {
                this.playing.pause();
                this.playing.currentTime = 0;
                this.playing = undefined;
            }

            this.playing = this.getSound(track);

            if (this.playing) {
                //this.playing.play();
            }
        }

        this.playSound = function(track) {
            let sound = this.getSound(track);

            if (sound) {
                sound.currentTime = 0;
                sound.play();
            }
        }
    }

    static get instance() {
        if (!this.soundInstance) {
            this.soundInstance = new Sound();
        }
        return this.soundInstance;
    }
}

export default Sound;
