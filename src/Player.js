class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'player_down_0';
    }

    spawn() {

    }

    draw(context) {
        context.drawImage(document.getElementById(this.sprite), this.x - 12, this.y - 12);
    }

    update() {
        return true;
    }

    right() {
        this.x = this.x + 1;
        this.sprite = 'player_right_0';
    }
}

export default Player;
