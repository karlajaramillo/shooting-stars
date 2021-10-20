const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d'); // access to canvas
canvas.width = innerWidth;
canvas.height = innerHeight;
let namePlayer = "";

const startSound = new Audio('../audio/audio-game.mp3');
const gameOverSound = new Audio('../audio/game-over.wav');
const scoreSound = new Audio('../audio/score.wav');

window.onload = () => { 
  onPageLoad();
  
  let inputName = document.querySelector(".name");
  inputName.addEventListener("change", () => {
    namePlayer = inputName.value;
    namePlayer = `${namePlayer.slice(0,1).toUpperCase()}${namePlayer.slice(1)}`;
  });

  document.querySelector(".start-game").onclick = () => {
    renderAt(".container","");
    buildGameScreen(namePlayer);
    startSound.play();
  }
}

function onPageLoad () {
  const homeTemplate = `    
    <div class="wrapper-container">
      <h1> Shooting stars Game</h1>
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
        </div>
      </footer>
    </div>`
  
	renderAt(".container",homeTemplate);
}

function getImgBoom (x, y) {
  //alert(`${x}, ${y}`)
  //console.log('boom ' + x + ' ' + y)

  const boom = new Image();
  boom.src =  '../images/boom1.png';
  //console.log(boom.src)
  //console.log('boom ' + x + ' ' + y)
    //alert(ctx)
    ctx.drawImage(boom, x, y, 80, 80);    
}


function gameOver() {
  const gameDone = `
  <div class="game-over">
    <div><img src="../images/trophy.png" alt=""></div>
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

function gainScore() {
  const el = document.querySelector('.wrapper-gain-score img');
    el.style.display = 'block';
    scoreSound.play();
}

function buildGameScreen(name) {
  // get the canvas
  const el = document.querySelector('.wrapper-gain-score img');
  el.style.display = 'none';
  const leaderboard = document.querySelector('.leader-board');
  leaderboard.style.display = 'flex';
  const canvas = document.querySelector('#canvas');
  canvas.style.display = 'block';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * .8;

  const game = new Game(canvas, gameOver, getImgBoom, gainScore);

  //const game = new Game(canvas, gameOver); // without image
  // set the player name
  name === '' ? document.querySelector(".player").textContent = 'You!'
              : document.querySelector(".player").textContent = name;
  game.startAnimateLoop();
  game.runCountDown ();
  game.screenClicked();
  game.pointerMove();
}


// Utility method to render pages
function renderAt(element, html) {
	const node = document.querySelector(element);
	node.innerHTML = html
}