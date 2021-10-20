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
    this.collisionImg = '../images/boom1.png';
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
      // creates stars based on every 80 frames
      if (this.frame % 80 === 0) this.stars.push(new Star(this.canvas));
      // handle obstacles behind the player and gameover
      this.checkAllCollisions();
      if(this.ifCollision) this.drawCollision(); // if collision, drawCollision
      // 1- set new positions of player, road, obstacles
      this.updateCanvas();
      // 2- clear all the canvas between every frame animation
      this.clearCanvas();
      // 3- draw
      this.drawCanvas();
      this.showScore();
      //this.checkAllCollisions();
      //   check if --> this.checkAllCollisions() <--- here!!!
      //if(this.checkAllCollisions()) return; // prevent request call for the next animation frame, and it will stop. if handle collision is true -> return
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
  }

 drawBackground () {
    const img = new Image();
    img.src = '../images/background-small.png';

    const img2 = new Image();
    img2.src = '../images/background-small2.png';

    //console.log(`x: ${this.bgX}, y:${this.bgY}, speed: ${this.speed}`);
    //console.log(`imgWidth: ${img.width}, canvasWidth:${this.canvas.width}`);
    this.ctx.shadowBlur = 0;
    this.ctx.drawImage(img, this.bgX, 0, this.canvas.width, this.canvas.height);
    if (this.speed > 0) {
      this.ctx.drawImage(img2, this.bgX  - this.canvas.width + this.speed, 0, this.canvas.width, this.canvas.height);
    }

    // const img = new Image();
    // img.src = '../images/background.png';

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

    this.particles.forEach((particle, index) => {
      particle.handleParticles(this.particles, index)
    });
    
    if(this.clickedCanvas) {
      this.stars.forEach((star, index) => {
        if(star.checkIfClickedStar(this.stars, index, this.mouseX, this.mouseY)) {
          this.starCurrentX = star.x;
          this.starCurrentY = star.y;
          this.ifCollision = true;

          // draw particles
          console.log(star.x, star.y, star.color)
           for (let i = 0; i < 8; i ++) {
          //   // create 8 directions
            this.particles.push(new Particle(this.canvas, star.x, star.y, star.color))
          }
          //this.imgBoom(this.starCurrentX, this.starCurrentY);
          console.log(this.starCurrentX, this.starCurrentY);
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

  // detect when screenClicked
  screenClicked () {
    this.canvas.addEventListener('click', (e) => {
    //check if inside canvas

    if(!(e.clientX > 0 && e.clientX < this.canvas.width
      && e.clientY > 0 && e.clientY < this.canvas.height)) return;
    this.clickedCanvas = true;
    // console.log(`click in canvas: ${this.clickedCanvas}`);
    //console.log(e.clientX)
    //console.log(e.clientY)
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    // console.log(`mouseX: ${this.mouseX}, mouseY${this.mouseY}`)    
    });
  } 

  mobileClicked () {
    this.canvas.addEventListener('touchstart', (e) => {
    //check if inside canvas
    this.eMobile = e.touches[0];

    if(!(eMobile.clientX > 0 && eMobile.clientX < this.canvas.width
      && eMobile.clientY > 0 && eMobile.clientY < this.canvas.height)) return;
    this.clickedCanvas = true;
    // console.log(`click in canvas: ${this.clickedCanvas}`);
    //console.log(eMobile.clientX)
    //console.log(eMobile.clientY)
    this.mouseX = eMobile.clientX;
    this.mouseY = eMobile.clientY;
    //console.log(`mouseX: ${this.mouseX}, mouseY${this.mouseY}`)    
    });
  } 

  pointerMove () {
    addEventListener('mousemove', (e) => {
      this.pointerX = e.clientX;
      //console.log(`x: ${this.pointerX}`);
      this.player.pointerX = this.pointerX;
      //console.log(`x: ${this.player.pointerX}`);
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