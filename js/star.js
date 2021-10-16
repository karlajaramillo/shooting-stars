class Star {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x1 = 0;
    this.x2 = this.canvas.width;
    this.radius1 = Math.floor(Math.random() * (30 - 5) + 5);
    this.radius2 = Math.floor(Math.random() * (30 - 5) + 5);
    this.y1 = Math.floor(Math.random() * (this.canvas.height * .35) + this.radius1);
    this.y2 = Math.floor(Math.random() * (this.canvas.height * .35) + this.radius2);

    //this.velocity 
    //this.color = `hsla( ${hue} ,100%, 50%, 1)`;
    this.color = 'blue';
    this.direction1 = 1;
    this.direction2 = -1;
    this.speed1 = Math.floor(Math.random() * 100);
    this.speed2 = Math.floor(Math.random() * 100);
    //this.circlesToDraw = Math.floor(Math.random() * 5);

  }

  // numberCircles (circlesToDraw, side) {
  //   if (side === 'left') this.ctx.arc(this.x1 + this.radius1, this.y1, this.radius1, 0, Math.PI * 2, false);
  //   if (side ==='right') this.ctx.arc(this.x2 - this.radius2, this.y2, this.radius2, 0, Math.PI * 2, false); 
  // }

  draw () {
  //start angle -->0
    this.ctx.beginPath();
    this.ctx.arc(this.x1 + this.radius1, this.y1, this.radius1, 0, Math.PI * 2, false);
    this.ctx.arc(this.x2 - this.radius2, this.y2, this.radius2, 0, Math.PI * 2, false); 
    //this.numberCircles(this.circlesToDraw, side)
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update () {
    debugger
    this.x1 = this.x1 + this.direction1 * this.speed1; 
    this.x2 = this.x2 + this.direction2 * this.speed2; 
  }

  setDirection(direction) {
    this.direction1 = direction;
    this.direction2 = direction;
  }
}
