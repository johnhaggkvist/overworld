import Bush from './obstacles/Bush';
import Border from './obstacles/Border';

class WorldMap {
    constructor() {
        this.width = 100;
        this.height = 60;

        this.map = [];
        this.objects = [];

        let sprites = [
            "grass_0","grass_0","grass_0","grass_0",
            "grass_1",
            "bush_1"
        ];

        // Generation
        this.map = WorldMap._generateMap(this.width, this.height);

        // Painting
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let cell = this.map[x][y];

                if (cell.type === 'end') {
                    cell.sprite = 'tiles';
                } else if (cell.type === 'border') {
                    cell.sprite = WorldMap._getBorderBlock(this.map, x, y);
                } else if (cell.type === 'start') {
                    this.start = {
                        x: x,
                        y: y
                    };
                    cell.sprite = 'tiles';
                }  else {
                    cell.sprite = sprites[Number.parseInt(Math.round(Math.random() * (sprites.length - 1)), 10)];
                }
            }
        }

        // Treeification
        this._treefy();
        this._poleify();

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

    _poleify() {
        let isPole = (x, y) => this.map[x][y].sprite.indexOf('pole_') !== -1;
        
        for (let x = 0; x < this.width - 1; x++) {
            for (let y = 0; y < this.height - 1; y++) {
                if (isPole(x, y)) {
                    let south = isPole(x, y + 1),
                        east = isPole(x + 1, y),
                        west = isPole(x - 1, y);
                    if (west && !east && !south) {
                        this.map[x][y].sprite = 'pole_west';
                    } else if (!west && east && !south) {
                        this.map[x][y].sprite = 'pole_east';
                    } else if (!west && !east && south) {
                        this.map[x][y].sprite = 'pole_south';
                    } else if (west && east && !south) {
                        this.map[x][y].sprite = 'pole_east_west';
                    } else if (!west && east && south) {
                        this.map[x][y].sprite = 'pole_south_east';
                    } else if (west && !east && south) {
                        this.map[x][y].sprite = 'pole_south_west';
                    } else if (west && east && south) {
                        this.map[x][y].sprite = 'pole_south_east_west';
                    }
                }
            }
        }
    }

    _treefy() {
        for (let x = 0; x < this.width - 1; x++) {
            for (let y = 0; y < this.height - 1; y++) {
                if (this.map[x][y].sprite === 'border_northwest'
                    && this.map[x + 1][y].sprite === 'border_northeast'
                    && this.map[x][y + 1].sprite === 'border_southwest'
                    && this.map[x + 1][y + 1].sprite === 'border_southeast') {
                        let tile = Math.random() >= 0.5 ? 'tree' : 'stump';
                        this.map[x][y].sprite = tile + '_northwest'
                        this.map[x + 1][y].sprite = tile + '_northeast'
                        this.map[x][y + 1].sprite = tile + '_southwest'
                        this.map[x + 1][y + 1].sprite = tile + '_southeast'
                } 
            }
        }
    }

    static _getEnd(width, height) {
        let fiftyFifty = () => Math.random() >= 0.6,
            placeOnX = fiftyFifty(),
            x = placeOnX 
                ? 3 + Math.floor(Math.random() * (width - 6)) 
                : fiftyFifty() ? 0 : width - 1,
            y = !placeOnX 
                ? 3 + Math.floor(Math.random() * (height - 6))
                : fiftyFifty() ? 0 : height - 1;
        return [
            {
                x: x,
                y: y
            },
            {
                x: x + (placeOnX ? (fiftyFifty() ? -1 : 1) : 0) * 1,
                y: y + (!placeOnX ? (fiftyFifty() ? -1 : 1) : 0) * 1,
            }];
    }

    static _borderPercentace(map) {
        let cells = 0,
            borders = 0;
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[x].length; y++) {
                cells += 1;
                if (map[x][y].type === 'border') borders += 1;
            }
        }
        return borders / cells;
    }

    static _generateMap(width, height) {
        let map = [];

        for (let x = 0; x < width; x++) {
            map.push([]);
            for (let y = 0; y < height; y++) {
                map[x].push({
                    type: 'border'
                });
            }
        }
        let end = WorldMap._getEnd(width, height);
        for (let endPos of end) {
            map[endPos.x][endPos.y].type = 'end';
        }

        let drunkWalk = (pos) => {
            let directions = [];
            for (let direction of [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}]) {
                let checkPos = {
                    x: pos.x + direction.x,
                    y: pos.y + direction.y
                };
                if (checkPos.x > 0 && checkPos.x < width - 1 && checkPos.y > 0 && checkPos.y < height - 1) {
                    directions.push(direction);
                    if (map[checkPos.x][checkPos.y].type === 'border') {
                        directions.push(direction);
                    }
                }
            }

            let walk = directions[Math.floor(Math.random() * directions.length)],
                newPos = {
                    x: pos.x + walk.x,
                    y: pos.y + walk.y
            };

            map[newPos.x][newPos.y].type = 'grass';
            return newPos;
        };
        let pos = drunkWalk(end[0]);
        while (WorldMap._borderPercentace(map) > 0.6) {
            pos = drunkWalk(pos);
        }

        let start = function findStart(pos) {
            let directions = [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}],
                walk = directions[Math.floor(Math.random() * directions.length)],
                newPos = {
                    x: pos.x + walk.x,
                    y: pos.y + walk.y
            };

            if (newPos.x > 0 && newPos.x < width - 1 && newPos.y > 0 && newPos.y < height - 1) {
                pos = newPos;
                if (map[pos.x][pos.y].type === 'grass') {
                    map[pos.x][pos.y].type = 'start';
                    return pos;
                }
            }
            return findStart(pos);
        };
        start({x: width / 2, y: height / 2});
        return map;
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

        if (north && south && west && east) {
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
            } else if (!northeast && northwest && southeast && !southwest) {
                return 'border_northwest_southeast';
            } else if (northeast && !northwest && !southeast && southwest) {
                return 'border_northeast_southwest';
            }
        }
        if (north && south && west && !east && northwest && southwest) {
            return 'border_east';
        } else if (north && south && !west && east && northeast && southeast) {
            return 'border_west';
        } else if (north && !south && west && east && northwest && northeast) {
            return 'border_south';
        } else if (!north && south && west && east && southeast && southwest) {
            return 'border_north';
        } else if ((!south || !west || !southwest) && north && east && northeast) {
            return 'border_southwest';
        } else if ((!south || !east || !southeast) && north && west && northwest) {
            return 'border_southeast';
        } else if ((!north || !west || !northwest) && south && east && southeast) {
            return 'border_northwest';
        } else if ((!north || !east || !northeast) && south && west && southwest) {
            return 'border_northeast';
        }
        return 'pole_alone';
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
