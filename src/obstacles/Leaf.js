class Leaf {
    constructor(x, y, id) {
        this.x = x | 0;
        this.y = y | 0;
        this.startY = this.y;
        this.step = 0;
        let maxSpread = 2;
        this.direction = Math.random() * maxSpread * 2 - maxSpread;
        this.sprite = 'leaf_' + Number.parseInt(Math.round(Math.random(2)), 10);
    }

    spawn() {
    
    }

    draw(context) {
        context.drawImage(document.getElementById(this.sprite), this.x , this.y);
    }

    update() {
        this.step = this.step + 1;
        let time = 40;
        this.x = this.x + this.direction;
        let bounce = (Math.cos(this.step / 2) * 4) * (time - this.step) / time;
        this.y = this.startY + bounce;

        return this.step < time;
    }
}

export default Leaf;
