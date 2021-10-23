# shooting-stars

Web Development Ironhack project - based on JS, HTML, CSS

# Project's name

[Click here to see deployed game](http://github.com)

## Description

Shooting stars is a game where the user has to catch shooting starts that appear at random from one side of the screen and move to the other.
There is a chronometer, so the game ends when the time finishes.
After that, a score is shown in the screen. The score is based on the speed of the star that was clicked.

## MVP

### Before start

—> The user can type their name before starting the game.
—> The user can start the game with the start button.

### During the game

—> During the game, shooting stars appear in the screen randomly from one side of the screen.
—> The user has to click on the stars to increase their score.
—> The user can check their score updated.
—> The user can check the time left.

### When the game finishes

—> The user can see a board with the final score.
—> The user have a button to start the game again.

## Backlog

-> Add images to the stars, instead of circles.
—> Add music during the game.
-> Add effects when the user catches a star.
-> Let the user choose the place or background where the user start the game.
—> The user will move horizontally, so if the click moves right, I will move too.
-> Increasing difficulty and add features.
-> Add enemies to the game when a determined lives.

## Data structure

# main.mjs

- onPageLoad () {}
- onPageGame () {}
- gameOver () {}
- gainScore () {}
- buildGameScreen () {}
- renderAt () {}

# game.mjs

- Game () {}
- startAnimateLoop () {}
- clearCanvas () {}
- drawBackground () {}
- updateBackground() {}
- updateCanvas () {}
- drawCanvas () {}
- checkAllCollisions () {}
- showScore () {}
- runCountDown () {}
- bindClickAndTouch () {}
- handleClickAndTouch () {}
- pointerMove () {}

# stars.mjs

- Star () {
  this.x; //random
  this.y; //random
  this.size;
  this.radius; //random
  this.color;
  this.angle;
  this.speed; //random
  this.curve;
  }
- draw () {}
- move () {}
- shoot () {}
- handleScreenCollision () {}
- checkIfClickedStar () {}

# player.mjs

- Player () {
  this.width;
  this.height;
  this.x;
  this.y;
  this.direction;
  this.score;
  }

- draw () {}
- update () {}
- checkScreen () {}
- setDirection () {}
- increaseScore () {}

## States y States Transitions

Definition of the different states and their transition (transition functions)

- buildGameScreen () {}
- gameOver () {}
- gainScore () {}

## Task

- main - onPageLoad () {}
- main - onPageGame () {}
- main - gameOver () {}
- main - gainScore () {}
- main - buildGameScreen () {}
- main - renderAt () {}
- game - startAnimateLoop () {}
- game - clearCanvas () {}
- game - drawBackground () {}
- game - updateBackground() {}
- game - updateCanvas () {}
- game - drawCanvas () {}
- game - checkAllCollisions () {}
- game - showScore () {}
- game - runCountDown () {}
- game - bindClickAndTouch () {}
- game - handleClickAndTouch () {}
- game - pointerMove () {}
- star - draw () {}
- star - move () {}
- star - shoot () {}
- star - handleScreenCollision () {}
- star - checkIfClickedStar () {}
- player - draw () {}
- player - update () {}
- player - checkScreen () {}
- player - setDirection () {}
- player - increaseScore () {}

## Links

- [Trello Link](https://trello.com/b/qJvWaLhd/shooting-stars)
- [Slides Link](http://slides.com)
- [Github repository Link](https://github.com/karlajaramillo/shooting-stars)
- [Deployment Link](http://github.com)
