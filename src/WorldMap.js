import Bush from './obstacles/Bush';

class WorldMap {
    constructor() {
        this.width = 30;
        this.height = 20;

        this.map = [];
        this.objects = [];

        this.start = {
            x: Number.parseInt(Math.ceil(Math.random() * this.width) - 1, 10),
            y: Number.parseInt(Math.ceil(Math.random() * this.height) - 1, 10)
        };

        let sprites = [
            "grass_0","grass_0","grass_0","grass_0",
            "grass_1",
            "bush_1"
        ];
        for (var x = 0; x < this.width; x++) {
            this.map.push([]);
            for (var y = 0; y < this.height; y++) {
                let sprite = 'tiles';
                if (!(x === this.start.x && y === this.start.y)) {
                    sprite = sprites[Number.parseInt(Math.round(Math.random() * (sprites.length - 1)), 10)];
                    if (sprite === 'bush_1') {
                        this.objects.push(new Bush(x * 16, y * 16));
                    }
                }
                this.map[x].push(sprite);
            }
        }
    }

    spawn() {

    }

    draw(context, offset) {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                let sprite = this.map[i][j];
                context.drawImage(document.getElementById(sprite), i * 16 - offset.x, j * 16 - offset.y);
            }
        }
    }

    update() {
        return true;
    }
}

export default WorldMap;
