import Bush from './obstacles/Bush';
import Border from './obstacles/Border';

class WorldMap {
    constructor() {
        this.width = 30;
        this.height = 20;

        this.map = [];
        this.objects = [];

        this.start = {
            x: 2 + Number.parseInt(Math.ceil(Math.random() * (this.width - 5)), 10),
            y: 2 + Number.parseInt(Math.ceil(Math.random() * (this.height - 5)), 10)
        };

        let sprites = [
            "grass_0","grass_0","grass_0","grass_0",
            "grass_1",
            "bush_1"
        ];

        // Generation
        for (let x = 0; x < this.width; x++) {
            this.map.push([]);
            for (let y = 0; y < this.height; y++) {
                let type = 'start';
                if (!(x === this.start.x && y === this.start.y)) {
                    if (x === 0 || x === this.width-1 || y === 0 || y === this.height-1) {
                        type = 'border';
                    } else if (Math.random() > 0.2 && (x === 1 || x === this.width-2 || y === 1 || y === this.height-2)) {
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
            for (let y = 0; y < this.height; y++) {
                let cell = this.map[x][y];

                if (cell.type === 'border') {
                    cell.sprite = WorldMap._getBorderBlock(this.map, x, y);
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
                if (cell.type === 'border') {
                    this.objects.push(new Border(x * 16, y * 16));
                }
            }
        }
    }

    static _getBorderBlock(map, x, y) {
        let south = WorldMap._isBorder(map, x, y + 1),
            north = WorldMap._isBorder(map, x, y - 1),
            east = WorldMap._isBorder(map, x + 1, y),
            west = WorldMap._isBorder(map, x - 1, y),
            southwest = WorldMap._isBorder(map, x - 1, y + 1),
            southeast = WorldMap._isBorder(map, x + 1, y + 1),
            northwest = WorldMap._isBorder(map, x - 1, y - 1),
            northeast = WorldMap._isBorder(map, x + 1, y - 1);

        if (north && south && west && !east) {
            return 'border_east';
        } else if (north && south && !west && east) {
            return 'border_west';
        } else if (north && !south && west && east) {
            return 'border_south';
        } else if (!north && south && west && east) {
            return 'border_north';
        } else if (north && !south && !west && east) {
            return 'border_southwest';
        } else if (north && !south && west && !east) {
            return 'border_southeast';
        } else if (!north && south && !west && east) {
            return 'border_northwest';
        } else if (!north && south && west && !east) {
            return 'border_northeast';
        } else if (north && south && west && east) {
            if (northeast && northwest && southeast && !southwest) {
                return 'border_inner_southwest';
            } else if (northeast && northwest && !southeast && southwest) {
                return 'border_inner_southeast';
            } else if (northeast && !northwest && southeast && southwest) {
                return 'border_inner_northwest';
            } else if (!northeast && northwest && southeast && southwest) {
                return 'border_inner_northeast';
            } else if (northeast && northwest && southeast && southwest) {
                return 'border_full';
            } else if (northeast && northwest && !southeast && !southwest) {
                return 'border_south';
            } else if (northeast && !northwest && southeast && !southwest) {
                return 'border_west';
            } else if (!northeast && northwest && !southeast && southwest) {
                return 'border_east';
            } else if (!northeast && !northwest && southeast && southwest) {
                return 'border_north';
            }
        }
        return 'rock';
    }

    static _isBorder(map, x, y) {
        return !map[x] || !map[x][y] || map[x][y].type === 'border';
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
