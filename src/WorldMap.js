import Bush from './obstacles/Bush';
import Border from './obstacles/Border';

class WorldMap {
    constructor() {
        this.width = 30;
        this.height = 20;

        this.map = [];
        this.objects = [];

        this.start = {
            x: 1 + Number.parseInt(Math.ceil(Math.random() * this.width) - 3, 10),
            y: 1 + Number.parseInt(Math.ceil(Math.random() * this.height) - 3, 10)
        };

        let sprites = [
            "grass_0","grass_0","grass_0","grass_0",
            "grass_1",
            "bush_1"
        ];

        // Generation
        for (let x = 0; x < this.width; x++) {
            this.map.push([]);
            for (var y = 0; y < this.height; y++) {
                let type = 'start';
                if (!(x === this.start.x && y === this.start.y)) {
                    if (x === 0 || x === this.width-1 || y === 0 || y === this.height-1) {
                        type = 'border';
                    } else {
                        type = 'grass';
                    }
                }
                this.map[x].push({
                    type: type
                });
            }
        }

        // Painting
        for (let x = 0; x < this.width; x++) {
            this.map.push([]);
            for (var y = 0; y < this.height; y++) {
                let cell = this.map[x][y];

                if (cell.type === 'border') {
                    cell.sprite = 'rock';
                } else if (cell.type === 'start') {
                    cell.sprite = 'tiles';
                }  else {
                    cell.sprite = sprites[Number.parseInt(Math.round(Math.random() * (sprites.length - 1)), 10)];
                }
            }
        }

        // Objectification
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let cell = this.map[x][y];
                if (cell.sprite === 'bush_1') {
                    this.objects.push(new Bush(x * 16, y * 16));
                }
                if (cell.sprite === 'rock') {
                    this.objects.push(new Border(x * 16, y * 16));
                }
            }
        }

    }

    spawn() {

    }

    draw(context, offset) {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                let cell = this.map[i][j];
                context.drawImage(document.getElementById(cell.sprite), i * 16 - offset.x, j * 16 - offset.y);
            }
        }
    }

    update() {
        return true;
    }
}

export default WorldMap;
