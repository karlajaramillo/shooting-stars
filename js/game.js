class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    //this.player;
    this.stars = [];
    this.isGameOver = false;
    this.frame = 0;
    //this.angle = 0; // to move the stars
    this.score = 0;
    //this.animationId = 0;
  }

  // background available before the animate()
  // background into canvas
  
  startAnimateLoop () {
    // creates the player
    // this.player = new this.player(this.canvas);
     const animate = () => {

    // creates stars based on every 70 frames
     if (this.frame % 70 === 0) this.stars.push(new Star(this.canvas));
     
    
    //  handleBackground();
    // handle obstacles behind the player and gameover
    this.checkAllCollisions();
    // if(this.checkAllCollisions()) return; // prevent request call for the next animation frame, and it will stop. if handle collision is true -> return
    // 1- set new positions of player, road, obstacles
    this.updateCanvas();
    // 2- clear all the canvas between every frame animation
    this.clearCanvas();
    // 3- draw
    this.drawCanvas();
    //  this.showScore();
    //  
    if (!this.isGameOver) {
        // call itself to create the animation
      window.requestAnimationFrame(animate);
    }
    //     angle+= 1;
      this.frame++; //// for every animation, the frames increments
    }
     window.requestAnimationFrame(animate)
  }

 //clear canvas before draw
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

// update/set positions
  updateCanvas() {
    this.stars.forEach((star) => {
      star.update();
    });
    //this.player.update();
  }

   // draw
   drawCanvas() {
    this.stars.forEach((star) => { 
      star.draw();
    });
    //this.player.draw();
  } 

  // handle collisions
  
  checkAllCollisions () {
    // check player is inside the canvas
    //this.player.checkScreen();

    this.stars.forEach((star, index) => {
      star.checkScreenCollision(this.stars, index);
    })

    // when it has a click on the canvas
    // check position of the click --> x,y
    // loop for each star to find if has the same position of the click
    // increase score
    // showScore
   }


  // showScore () {
  //   //  this.ctx.fillStyle = 'red';
  //   //  this.ctx.font = '90px Wallpoet';
  //   //  this.ctx.fillText(score, 450, 70);
  // }

  gameOverCallback(callback) {
    //this.onGameOver = callback;
  }

}