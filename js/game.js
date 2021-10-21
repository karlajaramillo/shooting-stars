class Game {
  constructor(canvas, gameOverCallback, getImgBoom, gainScore) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.stars = [];
    this.particles = []; // after collision
    this.isGameOver = false;
    this.frame = 0;
    this.animationId;
    this.timer = 20;
    this.gameOverCallBack = gameOverCallback;
    this.mouseX = undefined;
    this.mouseY = undefined;
    this.clickedCanvas = false;
    this.pointerX = 0;
    this.speed = .25; // background
    this.bgX = 0;  // background
    this.bgY = 0;  // background
    this.starCurrentX = 0;
    this.starCurrentY = 0;
    this.ifCollision = false;
    this.collisionImg = './images/boom1.png';
    this.color = '#f7e22f';
    this.size = 4;
    this.weightY = 2;
    this.weightX =1 ;
    this.testx = 100;
    this.testy = 100;
    this.imgBoom = getImgBoom;
    this.showImgScore = gainScore;
   }

  startAnimateLoop () {
    // creates the player
    this.player = new Player(this.canvas);
    const animate = () => {
      // creates stars based on every 60 frames
      if (this.frame % 60 === 0) this.stars.push(new Star(this.canvas));
      // handle obstacles behind the player and gameover
      this.checkAllCollisions();
      if(this.ifCollision) this.drawCollision(); // if collision, drawCollision
      // 1- set new positions 
      this.updateCanvas();
      // 2- clear all the canvas between every frame animation
      this.clearCanvas();
      // 3- draw
      this.drawCanvas();
      this.showScore();
      if (this.isGameOver) {
        this.gameOverCallBack();
        window.cancelAnimationFrame(this.animationId);
      } else {
        // call itself to create the animation
        this.frame++; //// for every animation, the frames increments
        this.clickedCanvas = false;
        this.animationId = window.requestAnimationFrame(animate);
      }
    }
    this.animationId = window.requestAnimationFrame(animate)
  }

 //clear canvas before draw
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

 drawBackground () {
    const img = new Image();
    img.src = "./images/background-small.png";
    // img.src = 'https://github.com/karlajaramillo/shooting-stars/blob/main/images/background-small.png';

    const img2 = new Image();
    img2.src = "./images/background-small2.png";
    // img2.src = 'https://github.com/karlajaramillo/shooting-stars/blob/main/images/background-small2.png';

    //console.log(`x: ${this.bgX}, y:${this.bgY}, speed: ${this.speed}`);
    //console.log(`imgWidth: ${img.width}, canvasWidth:${this.canvas.width}`);
    this.ctx.shadowBlur = 0;
    this.ctx.drawImage(img, this.bgX, 0, this.canvas.width, this.canvas.height);
    if (this.speed > 0) {
      this.ctx.drawImage(img2, this.bgX  - this.canvas.width + this.speed, 0, this.canvas.width, this.canvas.height);
    }

    // const img = new Image();
    // img.src = './images/background.png';

    // this.ctx.drawImage(img, this.bgX, 0, this.canvas.width, this.canvas.height);
  }

  drawCollision () {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.testx, this.testy, this.size, 0, Math.PI * 2);
    this.ctx.fill();
   }

  updateCollision () {
    // this.starCurrentX += this.weightX;
    // this.starCurrentY += this.weightY;
    this.testx += this.weightX;
    this.testy += this.weightY;
  }

  updateBackground() {
    this.bgX += this.speed;
    this.bgX %= this.canvas.width;
  }

// update/set positions
  updateCanvas() {
    this.updateBackground();
    //if(this.ifCollision) this.updateCollision(); // if collision, drawCollision

    this.stars.forEach((star) => {
      star.update();
    });
    if(this.ifCollision) {
      this.particles.forEach(particle => {
        particle.update();
      });
    }
    this.player.update();
  }

   // draw
   drawCanvas() {
    this.drawBackground();
    //if(this.ifCollision) this.drawCollision(); // if collision, drawCollision
    this.stars.forEach((star) => { 
      star.draw();
    });
    if(this.ifCollision)  {
      this.particles.forEach(particle => {
        particle.draw();
      });
    }
    this.player.draw();
  } 

  // handle collisions
  
  checkAllCollisions () {
    // check player is inside the canvas
    this.player.checkScreen();

    this.stars.forEach((star, index) => {
      star.handleScreenCollision(this.stars, index);
    });
    // remove particles after a number of counts --> counter -> 60
    this.particles.forEach((particle, index) => {
      particle.handleParticles(this.particles, index)
    });
    
    // check if the canvas was clicked/touched
    if(this.clickedCanvas) { 
      this.stars.forEach((star, index) => {
        if(star.checkIfClickedStar(this.stars, index, this.mouseX, this.mouseY)) {
          this.starCurrentX = star.x;
          this.starCurrentY = star.y;
          this.ifCollision = true;

          // draw particles
          //console.log(star.x, star.y, star.color)
           for (let i = 0; i < 8; i ++) {
          //   // create 8 directions
            this.particles.push(new Particle(this.canvas, star.x, star.y, star.color))
          }
          //this.imgBoom(this.starCurrentX, this.starCurrentY);
          //console.log(this.starCurrentX, this.starCurrentY);
          this.showImgScore();
          this.player.increaseScore(star);
          this.stars.splice(index, 1);

          return true; // to see from outside if the collision occurs
        }
      });
    }
   }

   showScore () {
     const scoreContainer = document.querySelector('.score');
     scoreContainer.textContent = this.player.score;
   }

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

  bindClickAndTouch() {
    this.canvas.addEventListener('click', (event) => { 
      this.handleClickAndTouch(event);
    });
    this.canvas.addEventListener('touchstart', (event) => {
      this.handleClickAndTouch(event);
    });
  }
  
  // detect when screenClicked
  handleClickAndTouch(event) {
    if (event.type === 'click') {
      // check if the click is outside the canvas, return
      if(!(event.clientX > 0 && event.clientX < this.canvas.width
        && event.clientY > 0 && event.clientY < this.canvas.height)) return;
      // inside the canvas
      this.mouseX = event.clientX; // set x position
      this.mouseY = event.clientY; // set y position
      this.clickedCanvas = true;
    }

    if (event.type === 'touchstart') {
      // in touch events, the x and y are inside event.touches[0] property
      this.eMobile = event.touches[0]; // event.touches[0].clientX;  event.touches[0].clientY; 
      // check if the click is outside the canvas, return
      if(!(this.eMobile.clientX > 0 && this.eMobile.clientX < this.canvas.width
        && this.eMobile.clientY > 0 && this.eMobile.clientY < this.canvas.height)) return;
      // inside the canvas
      this.mouseX = this.eMobile.clientX; // set x position
      this.mouseY = this.eMobile.clientY; // set y position
      this.clickedCanvas = true;
    }
  }

  pointerMove () {
    addEventListener('mousemove', (e) => {
      this.pointerX = e.clientX;
      //console.log(`x: ${this.pointerX}`);
      this.player.pointerX = this.pointerX;
      //console.log(`x: ${this.player.pointerX}`);
    })
  }

  // pointerTouchMove () {
  //   addEventListener('touchmove', (e) => {

  //     // this.pointerTouchesX = e.touches[0].clientX;
  //     // console.log = this.pointerTouchesX
  //     // console.log(`x: ${this.pointerX}`);
  //     // this.player.pointerX = this.pointerX;
  //     // console.log(`x: ${this.player.pointerX}`);
  //   })
  // }






}