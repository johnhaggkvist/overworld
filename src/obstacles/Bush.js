import Leaf from './Leaf';

class Bush {
   constructor(x, y) {
       this.x = x;
       this.y = y;
       this.width = 16;
       this.height = 16;
       this.alive = true;
       this.timeToLive = 10;
       console.log(this.x);
       this.leaves = [new Leaf(this.x, this.y), new Leaf(this.x, this.y), new Leaf(this.x, this.y)];
   }

   spawn() {

   }

   update() {
       if (!this.alive) {
           for (let leaf of this.leaves) {
               leaf.update();
           }
           console.log(this.timeToLive);
           if (this.timeToLive-- <= 0) {
               return false;
           }
       }
       return true;
   }

   damage() {
       this.alive = false;
   }

   draw(context) {
       if (this.alive) {
           context.drawImage(document.getElementById("bush_0"), this.x, this.y);
       } else {
           for (let leaf of this.leaves) {
               leaf.draw(context);
           }
       }
   }
  
}

export default Bush;
