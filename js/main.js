const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d'); // access to canvas
canvas.width = innerWidth;
canvas.height = innerHeight;
console.log(ctx);


window.onload = () => { 
  onPageLoad();
  let namePlayer = "";
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
        <button class="start-game onclick""> Start My Game</button>
      </div>
      </section>
      <footer>
        <div>
          Credits:
          <a href="">Picture designed by .....</a>
          <a href="">Picture designed by .....</a>
          <a href="">Picture designed by .....</a>
          <a href="">Picture designed by .....</a>
        </div>
      </footer>
    </div>`
  
	renderAt(".container",homeTemplate);
  

}


function gameOver() {
  // const gameDone = `
  // <div class="game-over">
  //   <h1 class="final-score">Score:<span>XX</span></h1>
  //   <button class="restart">Restart</button>
  // </div>`;

  // const getScore = document.querySelector('.score').textContent;
  // const mainDOM = document.querySelector('.container');
  // mainDOM.insertAdjacentHTML('afterbegin', gameDone);
  // const setScore = document.querySelector('.final-score').textContent = getScore;
  // const restartButton = document.querySelector('.restart');
  // restartButton.addEventListener('click', buildGameScreen);
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
  alert(name)
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