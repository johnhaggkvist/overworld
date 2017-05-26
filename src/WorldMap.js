import Bush from './obstacles/Bush';

class WorldMap {
    constructor() {
        this.width = 15;
        this.height = 10;
        this.sprites = [
            "grass_0",
            "grass_1",
            "bush_1"
        ];

        this.map = [];
        this.objects = [];
        for (var i = 0; i < this.width; i++) {
            this.map.push([]);
            for (var j = 0; j < this.height; j++) {
                let sprite = this.sprites[Number.parseInt(Math.round(Math.random() * (this.sprites.length - 1)))];
                this.map[i].push(sprite);
                if (sprite == 'bush_1' && !((i == 7 || i == 8) && (j == 4 || j == 5))) {
                    this.objects.push(new Bush(i*16, j*16));
                }
            }
        }
    }

    spawn() {

    }

    draw(context) {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                let sprite = this.map[i][j];
                context.drawImage(document.getElementById(sprite), i * 16, j * 16);
            }
        }
    }

    update() {
        return true;
    }
}

export default WorldMap;
