"use strict";

import Player from "./player.mjs";
import Star from "./star.mjs";
import Particle from "./particle.mjs";

class Game {
  constructor(canvas, gameOverCallback, gainScore) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.stars = [];
    this.particles = []; // after collision
    this.isGameOver = false;
    this.frame = 0;
    this.animationId; // stop animation loop
    this.timer = 20;
    this.gameOverCallBack = gameOverCallback;
    this.mouseX = undefined;
    this.mouseY = undefined;
    this.clickedCanvas = false;
    this.pointerX = 0; // position of the player
    this.speed = .25; // background
    this.bgX = 0;  // background
    this.bgY = 0;  // background
    this.starCurrentX = 0; // test
    this.starCurrentY = 0; // test
    this.ifCollision = false;
    this.size = 4;
    this.weightY = 2; // add weight to particles
    this.weightX = 1 ; // add weight to particles
    this.testx = 100;
    this.testy = 100;
    this.showImgScore = gainScore; // function
   }

  startAnimateLoop () {
    // creates the player
    this.player = new Player(this.canvas);
    const animate = () => {
      // when the screen is "resize", set new canvas.width and canvas.height to player
      this.player.y = this.canvas.height - 100;
      
      // creates stars every 60 frames
      if (this.frame % 60 === 0) this.stars.push(new Star(this.canvas));
      // handle obstacles behind the player and gameover
      this.checkAllCollisions();
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
        this.frame++; // for every animation, the frames increments to control drawing stars
        this.clickedCanvas = false;
        this.animationId = window.requestAnimationFrame(animate);
      }
    }
    this.animationId = window.requestAnimationFrame(animate)
  }

 // Clear canvas before draw
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Draw - background
 drawBackground () {
    const img = new Image();
    img.src = "./images/background-small.png";

    const img2 = new Image();
    img2.src = "./images/background-small2.png";
    this.ctx.shadowBlur = 0;
    this.ctx.drawImage(img, this.bgX, 0, this.canvas.width, this.canvas.height);
    if (this.speed > 0) {
      this.ctx.drawImage(img2, this.bgX  - this.canvas.width + this.speed, 0, this.canvas.width, this.canvas.height);
    }
  }

  // Update - background
  updateBackground() {
    this.bgX += this.speed;
    this.bgX %= this.canvas.width;
  }

  // Update / set positions
  updateCanvas() {
    // Update - background
    this.updateBackground();
    // Update - stars
    this.stars.forEach((star) => {
      star.update();
    });
    // Update - particles if there is a shooting star
    if(this.ifCollision) {
      this.particles.forEach(particle => {
        particle.update();
      });
    }
    // Update - player
    this.player.update();
  }

   // Draw canvas
   drawCanvas() {
    // Draw - background
    this.drawBackground();
    // Draw - stars
    this.stars.forEach((star) => { 
      star.draw();
    });
    // Draw - particles if there is a shooting star
    if(this.ifCollision)  {
      this.particles.forEach(particle => {
        particle.draw();
      });
    }
    // Update - player
    this.player.draw();
  } 

  // Handle collisions - click / touchstart with the stars
  checkAllCollisions () {
    // Check if player is inside the canvas
    this.player.checkScreen();
    // Check if stars are outside canvas - remove them 
    this.stars.forEach((star, index) => {
      star.handleScreenCollision(this.stars, index);
    });
    // Remove particles after a number of counts to prevent drawing for all canvas
    // Remove after counter --> 100
    this.particles.forEach((particle, index) => {
      particle.handleParticles(this.particles, index)
    });
    
    // Check if the canvas was clicked / touched
    if(this.clickedCanvas) { 
      // Check if a star was shooted
      this.stars.forEach((star, index) => {
        if(star.checkIfClickedStar(this.stars, index, this.mouseX, this.mouseY)) {
          this.starCurrentX = star.x;
          this.starCurrentY = star.y;
          this.ifCollision = true;

          // For each collision, draw 8 particles in different directions 
           for (let i = 0; i < 8; i ++) {
            // create 8 directions
            this.particles.push(new Particle(this.canvas, star.x, star.y, star.color));
          }

          this.showImgScore(); // coin and audio in leaderboard
          this.player.increaseScore(star); // increase score
          this.stars.splice(index, 1); // remove the star shooted

          return true; // to see from outside if the collision occurs
        }
      });
    }
   }
   // Show score - leaderboard
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
    },1000);
  }

  // Listen for click / touschstart events
  bindClickAndTouch() {
    this.canvas.addEventListener('click', (event) => { 
      this.handleClickAndTouch(event);
    });
    this.canvas.addEventListener('touchstart', (event) => {
      this.handleClickAndTouch(event);
    }, {passive: true});
  }
  
  // Check if a star was shooted, set this.clickedCanvas to true
  handleClickAndTouch(event) {
    if (event.type === 'click') {
      // Check if the click is outside the canvas, return
      if(!(event.clientX > 0 && event.clientX < this.canvas.width
        && event.clientY > 0 && event.clientY < this.canvas.height)) return;
      // Inside the canvas
      this.mouseX = event.clientX; // set x position
      this.mouseY = event.clientY; // set y position
      this.clickedCanvas = true;
    }

    if (event.type === 'touchstart') {
      // In touch events, the x and y are inside event.touches[0] property
      this.eMobile = event.touches[0]; // event.touches[0].clientX;  event.touches[0].clientY; 
      // Check if the click is outside the canvas, return
      if(!(this.eMobile.clientX > 0 && this.eMobile.clientX < this.canvas.width
        && this.eMobile.clientY > 0 && this.eMobile.clientY < this.canvas.height)) return;
      // Inside the canvas
      this.mouseX = this.eMobile.clientX; // set x position
      this.mouseY = this.eMobile.clientY; // set y position
      this.clickedCanvas = true;
    }
  }

  // Move player with mousemove position
  pointerMove () {
    addEventListener('mousemove', (event) => {
      this.pointerX = event.clientX;
      this.player.pointerX = this.pointerX;
    })
  }
}

export default Game;