class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.changeSprite = 1;
        this.walkingStep = 0;
        this.direction = 'down';
        this.sprite = 'player_' + this.direction + '_' + this.walkingStep;
    }

    spawn() {

    }

    draw(context) {
        context.drawImage(document.getElementById(this.sprite), this.x - 11, this.y - 13);
    }

    update() {
        if (this.walking) {
            this.changeSprite = this.changeSprite - 1;
            if (this.changeSprite == 0) {
                this.walkingStep = (this.walkingStep + 1) % 7;
                this.changeSprite = 6;
            }
            this.walking = false;
        } else {
            this.walkingStep = 0;
            this.changeSprite = 1;
        }
        this.sprite = 'player_' + this.direction + '_' + this.walkingStep;
        return true;
    }

    walk(dir) {
        this.walking = true;
        this.direction = dir;
        if (dir === 'down') {
            this.y = this.y + 1;
        }
        if (dir === 'up') {
            this.y = this.y - 1;
        }
        if (dir === 'right') {
            this.x = this.x + 1;
        }
        if (dir === 'left') {
            this.x = this.x - 1;
        }
    }

    down() {
        this.walk('down');
    }

    up() {
        this.walk('up');
    }

    left() {
        this.walk('left');
    }

    right() {
        this.walk('right');
    }
}

export default Player;
