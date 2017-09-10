class Logo {
    constructor(x, y) {
        this.text = "Overworld";
        this.font = "'Press Start 2P', Courier";
        this.size = 18;
        this.x = x || 40;
        this.y = y || 40;
        this.strokeStyle = 'black';
        this.fillStyle = 'red';
        this.step = 0;
    }

    spawn() {

    }

    draw(context) {
        context.globalAlpha = 1;
        context.font = "19px " + this.font;
        context.fillStyle = 'darkred';
        context.fillText(this.text, 40 - 4 + Math.cos(this.step / 50), 40 + 3 + Math.cos(this.step / 40) * 2);

        context.font = "18px " + this.font;
        context.fillStyle = 'red';
        context.fillText(this.text, 40, 40 + Math.cos(this.step / 40) * 2);

        context.font = "9px " + this.font;
        context.fillStyle = 'white';
        context.fillText("A tiny Zeldaish game", 30, 70);
        context.fillText(" made by John Forne", 30, 80);
        context.fillText("     in 2017", 30, 90);
        context.fillText(" music by visager.us", 30, 110);

        context.fillStyle = 'white';
        context.globalAlpha = 0.5 + Math.abs(Math.cos(this.step / 40) / 2);
        context.fillText("<press space to play>", 30, 135);
        context.globalAlpha = 1;
    }

    update() {
        this.step = this.step + 1;
        return true;
    }
}

export default Logo;
