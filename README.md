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
—> The user can read the instructions of the game before start.
—> The user can start the game with the start button. 

### During the game
—> During the game, shooting stars appear in the screen randomly from one side of the screen.
—> The user has to click on the stars to increase their score.
—> The user can check their score updated.
—> The user can check the time left.

### When the game finishes
—> The user can see a board with the final score.
—> The user have a button to start the game again.
-> Increasing difficulty and add features.

## Backlog
-> Add images to the stars, instead of circles.
—> Add music during the game.
-> Add effects when the user catches a star.
-> Let the user choose the place or background where the user start the game.
—> The user will move horizontally, so if the click moves right, I will move too.
-> Add enemies to the game when a determined lives.

## Data structure
# main.js
- buildSplashScreen () {}
- buildGameScreen () {}
- buildGameOverScreen () {}

# game.js
- Game () {}
- starLoop () {}
- checkCatchStar () {}
- clearCanvas () {}
- updateCanvas () {}
- drawCanvas () {}
- GameOver () {}
- Score () {}

# stars.js 
- Star () {
    this.x; //random
    this.y;
    this.direction;
    this.size //random
    this.speed; //random
}
- draw () {}
- move () {}
- shoot () {}
- checkScreenCollision () {}

# player.js 
- Player () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- checkCollisionScreen () {}

## States y States Transitions
Definition of the different states and their transition (transition functions)
- splashScreen
- gameScreen
- gameOverScreen

## Task
- main - buildDom
- main - buildSplashScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- game - startLoop
- game - buildCanvas
- game - updateCanvas
- game - drawCanvas
- star - draw
- star - move
- game - addStars
- player - draw // based on the movement of the click
- player - move 
- game - checkCatchStar
- game - score
- game - GameOver
- game - addEventListener


## Links
- [Trello Link](https://trello.com/b/qJvWaLhd/shooting-stars)
- [Slides Link](http://slides.com)
- [Github repository Link](https://github.com/karlajaramillo/shooting-stars)
- [Deployment Link](http://github.com)
