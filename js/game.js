class Game {
  constructor(canvas, gameOverCallback) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    //this.player;
    this.stars = [];
    this.isGameOver = false;
    this.frame = 0;
    //this.angle = 0; // to move the stars
    this.score = 0;
    this.animationId;
    this.timer = 20;
    this.gameOverCallBack = gameOverCallback;
    this.mouseX = undefined;
    this.mouseY = undefined;
    this.clickedCanvas = false;
  }

  // background available before the animate()
  // background into canvas
  
  startAnimateLoop () {
    // creates the player
    // this.player = new this.player(this.canvas);
    const animate = () => {

      // creates stars based on every 70 frames
      if (this.frame % 80 === 0) this.stars.push(new Star(this.canvas));
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
      if (this.isGameOver) {
        this.gameOverCallBack();
        window.cancelAnimationFrame(this.animationId);
      } else {
        // call itself to create the animation
        this.frame++; //// for every animation, the frames increments
        //this.clickedCanvas = false;
        window.requestAnimationFrame(animate);
      }
    }
     window.requestAnimationFrame(animate)
  }

 //clear canvas before draw
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // for each frame set color
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
      star.handleScreenCollision(this.stars, index);
    })
    if(this.clickedCanvas) {
      this.stars.forEach((star, index) => {
        if(star.checkIfClickedStar(this.stars, index, this.mouseX, this.mouseY)) {
          console.log('points now!!!! collision')
          // this.player.increaseScore();
          this.stars.splice(index, 1);
        }
      });
          // increase score
          // showScore
    }

   }


  // showScore () {
  //   //  this.ctx.fillStyle = 'red';
  //   //  this.ctx.font = '90px Wallpoet';
  //   //  this.ctx.fillText(score, 450, 70);
  // }

  // Count down function - 60 seconds
  runCountDown () { 
    const countdownInterval = setInterval(()=> {
    // run this DOM manipulation to decrement the countdown for the user
    document.querySelector('.timer').innerHTML = --this.timer;
    console.log(this.timer)
    if (this.timer <= 0) {
      clearInterval(countdownInterval);
      this.isGameOver = true;
      return;
    }
  },1000)
}

mouseClicked () {
  this.canvas.addEventListener('click', (e) => {
    //check if inside canvas

    if(!(e.clientX > 0 && e.clientX < this.canvas.width
      && e.clientY > 0 && e.clientY < this.canvas.height)) return;
    this.clickedCanvas = true;
    // console.log(`click in canvas: ${this.clickedCanvas}`);
     console.log(e.clientX)
     console.log(e.clientY)
     this.mouseX = e.clientX;
     this.mouseY = e.clientY;
    // console.log(`mouseX: ${this.mouseX}, mouseY${this.mouseY}`)    
  })
}  

}