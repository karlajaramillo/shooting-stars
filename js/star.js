class Star {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.type = '';
    this.addSize = 20;
    if (Math.random() < 0.5) {
      this.type = 'fromRight';
      this.x = this.canvas.width;
      this.y = Math.floor(Math.random() * (this.canvas.height * .35)); 
      this.radius = Math.floor(Math.random() * (35 - 10) + 10);  
      this.speed = 0 // to test
      //this.speed = Math.floor(Math.random() * 5);

    } else {
      this.type = 'fromLeft';
      this.x = 0;
      this.y = Math.floor(Math.random() * (this.canvas.height * .35));
      this.radius = Math.floor(Math.random() * (30 - 5) + 5);
      this.speed = 0; // to test
      //this.speed = Math.floor(Math.random() * 5);
    }
    this.color = `hsl(${Math.random() * 360}, 50%, 50%)`
    this.angle = Math.atan2(this.canvas.height / 2 - this.y, this.canvas.width / 2 - this.x)

    this.curve = {
      x: Math.cos(this.angle),
      y: Math.sin(this.angle)
    }
  }

  draw () {
    this.ctx.beginPath();
    if (this.type === 'fromLeft') this.ctx.arc(this.x - this.radius, this.y  - this.radius, this.radius, 0, Math.PI * 2, false);
    if (this.type === 'fromRight') this.ctx.arc(this.x + this.radius, this.y - this.radius, this.radius, 0, Math.PI * 2, false); 
    this.ctx.shadowBlur = 20;
    //this.ctx.shadowColor =  "#f7ed76" //yellow, "#fdf8cc"// white
    //this.ctx.shadowColor = 'rgba(117, 245, 241, .8)';
    this.ctx.shadowColor = '#ffc107';
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update () {
    //this.speed += 0.02; // to test
    if (this.type === 'fromLeft') {
      this.x = this.x + this.speed + this.curve.x;
      this.y = this.y + this.speed + this.curve.y;
    }
    if (this.type === 'fromRight') {
      this.x = this.x - this.speed + this.curve.x;
      this.y = this.y + this.speed + this.curve.y;
    }
  }
  //remove stars off the screen
  handleScreenCollision (arrayStars, index) {
    if (this.type === 'fromLeft') {
      if (this.x + this.radius/2 >= this.canvas.width) {
        arrayStars.splice(index, 1);
        }
      }
      else if (this.type === 'fromRight') {
        if (this.x - this.radius/2 <= 0) {
          arrayStars.splice(index, 1);
      }
    }
  }
  checkIfClickedStar (arrayStars, index, mouseX, mouseY) {
    this.left = Math.round(this.x - this.radius - this.addSize);
    this.right = Math.round(this.x + this.radius + this.addSize);
    this.top = Math.round(this.y - this.radius - this.addSize);
    this.bottom = Math.round(this.y + this.radius + this.addSize);

    // console.log(`index: ${index},
    // coordX: ${this.x},
    // radius: ${this.radius},
    // right: ${this.right}
    // left: ${this.left}
    // coordY: ${this.y},
    // top: ${this.top},
    // bottom: ${this.bottom},
    // mouseX: ${mouseX},
    // mouseY: ${mouseY}
    // `)

    const collision = 
      // horizontal
      (mouseX > this.left && mouseX < this.right)
      && 
      // vertical
      (mouseY > this.top && mouseY < this.bottom)
      //console.log(collision);
      //if (collision) alert('collision')
      if (collision) return collision;
  }


}