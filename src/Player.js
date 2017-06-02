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

    use() {
        this.swingingSword = true;
        this.swordSwing = 5;
    }

    hitbox() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2
        };
    }

    draw(context, offset) {
        // TODO: Circle hitbox?
        let sprite = document.getElementById(this.sprite),
            xOffset = (sprite.dataset.x || 0) - offset.x,
            yOffset = (sprite.dataset.y || 0) - offset.y;

        context.drawImage(sprite, this.hitbox().x - (22 - this.width) / 2 + xOffset, this.hitbox().y - 6 - (22 - this.height) / 2 + yOffset);
        
        if (this.debug) {
            context.strokeStyle = 'red';
            context.strokeRect(this.hitbox().x - offset.x, this.hitbox().y - offset.y, this.width, this.width);
        
            if (this.swingingSword) {
                context.strokeRect(this.swordBox.x - offset.x, this.swordBox.y - offset.y, this.swordBox.width, this.swordBox.height);
            }
        }
}

    collides(x, y, object) {
        return this._collides(x, y, this.width, this.height, object);
    }

    _collides(x, y, width, height, object) {
        return !(
            (x + width / 2 < object.x) ||
            (x - width / 2 > object.x + object.width) ||
            (y + height / 2 < object.y) ||
            (y - height / 2 > object.y + object.height)
        ); 
    }

    _swordBox(direction) {
        let hitbox = this.hitbox();
        let swingSize = 16; // TODO: Breaks if not 16, maybe fix

        let swordBox = {
            x: hitbox.x,
            y: hitbox.y,
            width: swingSize,
            height: swingSize
        };
    
        if (this.direction === 'down') {
            swordBox.y += this.height;
            swordBox.x -= this.width / 2;
        } else if (this.direction === 'up') {
            swordBox.y -= swingSize;
            swordBox.x -= this.width / 2;
        } else if (this.direction === 'right') {
            swordBox.x += this.width;
            swordBox.y -= this.height / 2;
        } else if (this.direction === 'left') {
            swordBox.x -= swingSize;
            swordBox.y -= this.height / 2;
        }

        swordBox.centerX = swordBox.x + swingSize / 2;
        swordBox.centerY = swordBox.y + swingSize / 2;

        return swordBox;
    }

    _damage(objects) {
        this.swordBox = this._swordBox(this.direction);
        let swordBox = this.swordBox;
        for (let object of objects) {
            if (typeof object.damage === "function") {
                if (this._collides(swordBox.centerX, swordBox.centerY, swordBox.width, swordBox.height, object)) {
                    object.damage();
                }
            }  
        }
    }

    update(objects) {
        let sprite = undefined;
        if (this.swingingSword) {
            if (this.swordSwing === 5) {
                this._damage(objects);
            }

            sprite = 'sword_' + this.direction + '_' + Number.parseInt(Math.abs(5 - Math.ceil(this.swordSwing)), 10);
            this.swordSwing = this.swordSwing - 0.25;
            if (this.swordSwing <= 0) {
                this.swingingSword = false;
            }
        } else if (this.walkingX || this.walkingY) {
            this.changeSprite = this.changeSprite - 1;
            if (this.changeSprite === 0) {
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
                if (this.walkingY !== 0 && this.collides(this.x, y, object)) {
                    this.walkingY = 0;
                    y = this.y;
                    this.collisionY = true;
                }
                if (this.walkingX !== 0 && this.collides(x, this.y, object)) {
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
        if (sprite === undefined) {
            sprite = 'player_' + this.direction + '_' + this.walkingStep;
        }
        this.sprite = sprite;
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
