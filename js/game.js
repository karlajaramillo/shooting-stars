class Game {
  constructor(canvas, gameOverCallback) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.stars = [];
    this.isGameOver = false;
    this.frame = 0;
    this.animationId;
    this.timer = 20;
    this.gameOverCallBack = gameOverCallback;
    this.mouseX = undefined;
    this.mouseY = undefined;
    this.clickedCanvas = false;
    this.pointerX = 0;
  }

  // background available before the animate()
  // background into canvas
  
  startAnimateLoop () {
    // creates the player
    this.player = new Player(this.canvas);
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
      this.showScore();
      //  
      if (this.isGameOver) {
        this.gameOverCallBack();
        window.cancelAnimationFrame(this.animationId);
        // modal to show score and start button --> showModalScore ();
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
    this.player.update();
  }

   // draw
   drawCanvas() {
    this.stars.forEach((star) => { 
      star.draw();
    });
    this.player.draw();
  } 

  // handle collisions
  
  checkAllCollisions () {
    // check player is inside the canvas
    this.player.checkScreen();

    this.stars.forEach((star, index) => {
      star.handleScreenCollision(this.stars, index);
    })
    if(this.clickedCanvas) {
      this.stars.forEach((star, index) => {
        if(star.checkIfClickedStar(this.stars, index, this.mouseX, this.mouseY)) {
          console.log('points now!!!! collision')
          this.player.increaseScore(star);
          this.stars.splice(index, 1);
        }
      });
        //this.showScore();
    }
   }

   showScore () {
     const scoreContainer = document.querySelector('.score');
     scoreContainer.textContent = this.player.score;
   }

   // after cancel animation
  // showModalScore () {
  //   // show score
  //   // show start button
  // }

  // Count down function - 60 seconds
  runCountDown () { 
    const countdownInterval = setInterval(()=> {
      // run this DOM manipulation to decrement the countdown for the user
      document.querySelector('.timer').textContent = --this.timer;
      if (this.timer <= 0) {
      clearInterval(countdownInterval);
      this.isGameOver = true;
      return;
      }
    },1000)
  }

  // detect when screenClicked
  screenClicked () {
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
    });
  } 

  mobileClicked () {
    this.canvas.addEventListener('touchstart', (e) => {
    //check if inside canvas
    console.log('hello touch')
    this.eMobile = e.touches[0];

    if(!(eMobile.clientX > 0 && eMobile.clientX < this.canvas.width
      && eMobile.clientY > 0 && eMobile.clientY < this.canvas.height)) return;
    this.clickedCanvas = true;
    // console.log(`click in canvas: ${this.clickedCanvas}`);
    console.log(eMobile.clientX)
    console.log(eMobile.clientY)
    this.mouseX = eMobile.clientX;
    this.mouseY = eMobile.clientY;
    console.log(`mouseX: ${this.mouseX}, mouseY${this.mouseY}`)    
    });
  } 

  pointerMove () {
    
    addEventListener('mousemove', (e) => {
      console.log(typeof e)
      this.pointerX = e.clientX;
      console.log(`x: ${this.pointerX}`);
      this.player.pointerX = this.pointerX;
      console.log(`x: ${this.player.pointerX}`);
    })
  }

  pointerTouchMove () {
    addEventListener('touchmove', (e) => {

      // this.pointerTouchesX = e.touches[0].clientX;
      // console.log = this.pointerTouchesX
      // console.log(`x: ${this.pointerX}`);
      // this.player.pointerX = this.pointerX;
      // console.log(`x: ${this.player.pointerX}`);
    })
  }

}