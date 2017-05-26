class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 8;
        this.height = this.width;
        this.changeSprite = 1;
        this.walkingStep = 0;
        this.direction = 'down';
        this.sprite = 'player_' + this.direction + '_' + this.walkingStep;
        this.walkingX = 0;
        this.walkingY = 0;
    }

    spawn() {

    }

    draw(context) {
        // TODO: Circle hitbox?
        context.drawImage(document.getElementById(this.sprite), this.x - (22 - this.width) / 2, this.y - 6 - (22 - this.height) / 2);
    }

    collides(x, y, object) {        
        return !(
            (x + this.width < object.x) ||
            (x > object.x + object.width) ||
            (y + this.height < object.y) ||
            (y > object.y + object.height)
        );
    }

    update(objects) {
        if (this.walkingX || this.walkingY) {
            this.changeSprite = this.changeSprite - 1;
            if (this.changeSprite == 0) {
                this.walkingStep = (this.walkingStep + 1) % 7;
                this.changeSprite = 6;
            }

            let x = this.x + this.walkingX,
                y = this.y + this.walkingY,
                collisionX = false,
                collisionY = false;
            
            if (this.walkingY > 0) this.direction = 'down';
            else if (this.walkingY < 0) this.direction = 'up';
            if (this.walkingX > 0) this.direction = 'right';
            else if (this.walkingX < 0) this.direction = 'left';

            for (let object of objects) {
                if (this.walkingY != 0 && this.collides(this.x, y, object)) {
                    this.walkingY = 0;
                    y = this.y;
                    this.collisionY = true;
                }
                if (this.walkingX != 0 && this.collides(x, this.y, object)) {
                    this.walkingX = 0;
                    x = this.x;
                    this.collisionX = true;
                }
            }

            if (!collisionX) {
                this.x = x;
            }
            if (!collisionY) {
                 this.y = y;
            }
            
            this.walkingX = 0;
            this.walkingY = 0;
        } else {
            this.walkingStep = 0;
            this.changeSprite = 1;
        }
        this.sprite = 'player_' + this.direction + '_' + this.walkingStep;
        return true;
    }

    down() {
        this.walkingY = 1;
    }

    up() {
        this.walkingY = -1;
    }

    left() {
        this.walkingX = -1;
    }

    right() {
        this.walkingX = 1;
    }
}

export default Player;
