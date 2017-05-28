class Bush {
   constructor(x, y) {
       this.x = x;
       this.y = y;
       this.width = 16;
       this.height = 16;
       this.alive = true;
   }

   spawn() {

   }

   update() {
       return this.alive;
   }

   damage() {
       this.alive = false;
   }

   draw(context) {
       context.drawImage(document.getElementById("bush_0"), this.x, this.y);
   }
  
}

export default Bush;
