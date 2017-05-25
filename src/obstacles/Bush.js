class Bush {
   constructor(x, y) {
       this.x = x;
       this.y = y;
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
