class Particle {
  constructor(canvas, x, y, color) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x; //position of the star
    this.y = y; // position of the star
    this.radius = 3; // radius of the star
    this.color = color; // color of the star
    this.velocityX = Math.random() - 1; //from -1 to 1 (1 not included) - random for each of particle
    this.velocityY = Math.random() - 1; //random for each of particle
  }
  
  draw () { 
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  } 

  update () { 
    this.x = this.x + this.velocityX;
    this.y = this.y + this.velocityY;
  } 
}
