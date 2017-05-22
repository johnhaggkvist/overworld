class Text {
    constructor(text, x, y) {
        this.text = text;
        this.font = "'Press Start 2P', Courier";
        this.size = 12;
        this.x = x | 0;
        this.y = y | 0;
        this.strokeStyle = 'black';
        this.fillStyle = 'red';
    }

    spawn() {
        this.step = 0;
        let maxSpread = this.size / 20;
        this.direction = Math.random() * maxSpread * 2 - maxSpread;
    }

    draw(context) {
        context.font = this.size + "px " + this.font;
        context.strokeStyle = this.strokeStyle;
        context.fillStyle = this.fillStyle;
        context.strokeText(this.text, this.x, this.y);
        context.fillText(this.text, this.x, this.y);
    }

    update() {
        this.x = this.x + this.direction;
        this.y = this.y - Math.cos(this.step / 3) * 2;

        this.step = this.step + 1;
        return this.step < 20;
    }
}

export default Text;
