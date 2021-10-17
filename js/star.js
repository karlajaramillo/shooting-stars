class Star {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.type = '';
    if (Math.random() < 0.5) {
      this.type = 'fromRight';
      this.x = this.canvas.width;
      this.y = Math.floor(Math.random() * (this.canvas.height * .35)); 
      this.radius = Math.floor(Math.random() * (35 - 10) + 10);  
      this.speed = Math.floor(Math.random() * 5);

    } else {
      this.type = 'fromLeft';
      this.x = 0;
      this.y = Math.floor(Math.random() * (this.canvas.height * .35));
      this.radius = Math.floor(Math.random() * (30 - 5) + 5);
      this.speed = 0;
    }
    this.color = `hsl(${Math.random() * 360}, 50%, 50%)`
    this.angle = Math.atan2(this.canvas.height / 2 - this.y, this.canvas.width / 2 - this.x)

    this.curve = {
      x: Math.cos(this.angle),
      y: Math.sin(this.angle)
    }
    
  }

  draw () {
    console.log(this.type)
    this.ctx.beginPath();
    if (this.type === 'fromLeft') this.ctx.arc(this.x - this.radius, this.y  - this.radius, this.radius, 0, Math.PI * 2, false);
    if (this.type === 'fromRight') this.ctx.arc(this.x + this.radius, this.y - this.radius, this.radius, 0, Math.PI * 2, false); 
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update () {
    this.speed += 0.03;
    if (this.type === 'fromLeft') {
      this.x = this.x + this.speed + this.curve.x;
      this.y = this.y + this.speed + this.curve.y;
    }
    if (this.type === 'fromRight') {
      this.x = this.x - this.speed + this.curve.x;
      this.y = this.y + this.speed + this.curve.y;
    }
  }
}



