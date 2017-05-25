class WorldMap {
    constructor() {
        this.sprites = [
            "grass_0",
            "grass_1",
            "bush_0",
            "bush_1"
        ];

        this.map = [];
        for (var i = 0; i < 20; i++) {
            this.map.push([]);
            for (var j = 0; j < 20; j++) {
                this.map[i].push(this.sprites[Number.parseInt(Math.round(Math.random() * 3))]);
            }
        }
    }

    spawn() {

    }

    draw(context) {
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 20; j++) {
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
