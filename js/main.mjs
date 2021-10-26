"use-strict";

import Game from "./game.mjs";


let namePlayer = "";

// Audio elements - using Howl API for JS
const startSound = new Audio("./audio/audio-game.mp3");
const gameOverSound = new Howl({src: ["./audio/game-over.mp3"]});
const scoreSound = new Howl({src: ["./audio/score.mp3"]});

window.onload = () => { 
  onPageLoad();
  let inputName = document.querySelector(".name");
  inputName.addEventListener("change", () => {
    namePlayer = inputName.value;
    namePlayer = `${namePlayer.slice(0,1).toUpperCase()}${namePlayer.slice(1)}`;
  });

  document.querySelector(".start-game").addEventListener('click', () => {
    renderAt(".container","");
    buildGameScreen(namePlayer);
    startSound.play();
  });
  document.addEventListener('keyup', (event) => {
    if(event.code === 'Enter') {
      renderAt(".container","");
      buildGameScreen(namePlayer);
      startSound.play();
    }
  });

}

function listenToResize () {
  window.addEventListener('resize', () => {
    // Set new width and height based on the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * .8;
  })
}

// Render Home page
function onPageLoad () {
  const homeTemplate = `    
    <div class="wrapper-home">
      <h1> Shooting Stars</h1>
      <p class="entry-msg">Click on the passing stars to catch them!</p>
      <section class="section-start">
        <div>
         <input type="text" class="name"placeholder="What's your name?">
        </div>
      <div class="start-button">
        <button class="start-game onclick""> Start</button>
      </div>
      </section>
      <footer>
        <div>
        Credits: <a href="https://www.freepik.com/vectors/background">Background vector created by brgfx - www.freepik.com</a>
        <br>
        <a href="https://mixkit.co/">Sound effects created by mixkit.co</a>
        <br>
        <a href="https://www.cufonfonts.com/font/mandalore">Fonts created by Cufonfonts.com</a> 
        </div>
      </footer>
    </div>`
	renderAt(".container",homeTemplate);
}

// Render Game page
function onPageGame () {
  const gameTemplate = `  
    <div class="wrapper-game">  
      <canvas id="canvas"></canvas>
      <div class="leader-board">
        <div>
          <h2 class="player-title">Player</h2>
          <h3 class="player"></h3>
        </div>
        <div>
          <div class="wrapper-gain-score">
            <h2 class="score-title">Score</h2>
            <div><img src="./images/coin.png" alt=""></div>
          </div>
          <h3 class="score">0</h3>
        </div>
        <div>
          <h2 class="time-title">Time</h2>
          <h3 class="timer">60</h3>
        </div>
      </div>
    </div>`;
  renderAt(".container", gameTemplate);
} 

// Render game over modal
function gameOver() {
   const gameDone = `
    <div class="game-over">
      <div><img src="./images/trophy.png" alt="tropy"></div>
      <h3 class="final-score">Score <span></span></h3>
      <button class="restart">Restart</button>
    </div>`;

  const getScore = document.querySelector('.score').textContent;
  const mainDOM = document.querySelector('.container');
  mainDOM.insertAdjacentHTML('afterbegin', gameDone);
  document.querySelector('.final-score span').textContent = getScore;
  const restartButton = document.querySelector('.restart'); 
  gameOverSound.play();
  startSound.pause();

  restartButton.onclick = () => {
    // find parent of the modal and remove
    restartButton.closest('.game-over').remove();
    buildGameScreen(namePlayer);
    startSound.play();
  }
}

// Add a coin and sound when user scores
function gainScore() {
  const el = document.querySelector('.wrapper-gain-score img');
    el.style.display = 'block';
    scoreSound.play();
}

function buildGameScreen(name) {
  onPageGame ();
  listenToResize(); // listen for resizing screen
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d'); // access to canvas

  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * .8;

  // Create an instance of the game
  const game = new Game(canvas, gameOver, gainScore);

  // Set the player name
  name === '' ? document.querySelector(".player").textContent = 'You!'
              : document.querySelector(".player").textContent = name;
  game.startAnimateLoop();
  game.runCountDown ();
  game.bindClickAndTouch();
  game.pointerMove();
}

// Utility method to render pages
function renderAt(element, html) {
	const node = document.querySelector(element);
	node.innerHTML = html
}