const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d'); // access to canvas
canvas.width = innerWidth;
canvas.height = innerHeight;
console.log(ctx);
let namePlayer = "";


window.onload = () => { 
  onPageLoad();
  
  let inputName = document.querySelector(".name");
  console.log(inputName);
  inputName.addEventListener("change", () => {
    namePlayer = inputName.value;
    namePlayer = `${namePlayer.slice(0,1).toUpperCase()}${namePlayer.slice(1)}`;
  });

  document.querySelector(".start-game").onclick = () => {
    renderAt(".container","");
    buildGameScreen(namePlayer);
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
          Credits:
          <a href="https://www.freepik.com/vectors/background">Background vector created by brgfx - www.freepik.com</a>
        </div>
      </footer>
    </div>`
  
	renderAt(".container",homeTemplate);
  

}


function gameOver() {
  const gameDone = `
  <div class="game-over">
    <h3 class="final-score">Score <span></span></h3>
    <button class="restart">Restart</button>
  </div>`;

  const getScore = document.querySelector('.score').textContent;
  const mainDOM = document.querySelector('.container');
  mainDOM.insertAdjacentHTML('afterbegin', gameDone);
  document.querySelector('.final-score span').textContent = getScore;
  const restartButton = document.querySelector('.restart'); 

  restartButton.onclick = () => {
    // find parent of the modal and remove
    restartButton.closest('.game-over').remove();
    buildGameScreen(namePlayer);
  }
}

function buildGameScreen(name) {
  // get the canvas
  const leaderboard = document.querySelector('.leader-board');
  leaderboard.style.display = 'flex';
  const canvas = document.querySelector('#canvas');
  canvas.style.display = 'block';
  console.log(`canvas: ${canvas}`)
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * .8;
  console.log(`width: ${canvas.width}`)
  console.log(`height: ${canvas.height}`)

  const game = new Game(canvas, gameOver);
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