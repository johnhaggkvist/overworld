class Bush {
   constructor(x, y) {
       this.x = x;
       this.y = y;
       this.width = 16;
       this.height = 16;
   }

   spawn() {

   }

   update() {
       return true;
   }

   draw(context) {
       context.drawImage(document.getElementById("bush_0"), this.x, this.y);
   }
  
}

export default Bush;
