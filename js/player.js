class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 100;
    this.height = 86;
    this.x = (this.canvas.width - this.width) / 2; // started position
    this.y = this.canvas.height - 100; // started position
    this.direction = 0;
    this.score = 0;
    this.imgPlayerLeft =  "./images/yoda-left.png";
    this.imgPlayerRight =  "./images/yoda-right.png";
    this.pointerX = 0;
  }

  // Draw - player
  draw () {
    if (this.x >= (this.canvas.width - this.width) / 2) {
      let imgRight = new Image(); // create image object
      this.ctx.shadowBlur = 5;
      this.ctx.shadowColor = '#ffc107';
      imgRight.src = this.imgPlayerRight;
      this.ctx.drawImage(imgRight, this.x, this.y, this.width, this.height);
    }
    if (this.x <= (this.canvas.width - this.width) / 2) {
      let imgLeft = new Image(); // create image object
      this.ctx.shadowBlur = 5;
      this.ctx.shadowColor = '#ffc107';
      imgLeft.src = this.imgPlayerLeft;
      this.ctx.drawImage(imgLeft, this.x, this.y, this.width, this.height);
    }
  }

  // Update - player
  update () {
     this.x = this.pointerX - this.width + this.direction;
  }

  // Change direction of player if collide with screen
  checkScreen () { 
    if (
      this.x + this.width  <= 0){
      this.direction = 1; // add 1, so the direction is to right
    }  
     if (this.x + this.width  >= this.canvas.width) { // off to the right
      //console.log(`pointer+direction+width: ${this.pointerX + this.direction + this.width}`) 
      this.direction = -1; // to the left of the board
    }
  }

  // Set direction
  setDirection (direction){
    this.direction = direction;
  }

  // Increase score if a star was shooted - depending on the radius
  increaseScore (star) {
    return star.radius < 15 ? this.score += 100 : this.score += 50;
  }
}