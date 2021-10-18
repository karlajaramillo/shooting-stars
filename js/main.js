const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d'); // access to canvas
canvas.width = innerWidth;
canvas.height = innerHeight;
console.log(ctx);




window.onload = () => { 
  onPageLoad();
  // let nameInput = document.querySelector(".name").value;
  // let name = `${nameInput.slice(0,1).toUpperCase()}${nameInput.slice(1)}`;
  // console.log(name);

  document.querySelector(".start-game").onclick = () => {
    renderAt(".container","");
    buildGameScreen();
  }
}

function onPageLoad () {
  const homeTemplate = `    
    <div class="wrapper-container">
      <h1>Welcome to 
      <br>Shooting stars Game</h1>
      <section class="section-start">
        <h2>Start your game with two simple questions</h2>
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
  alert('game over');
}

function buildGameScreen() {
  // get the canvas
  const leaderboard = document.querySelector('.leader-board');
  leaderboard.style.display = 'flex';
  const canvas = document.querySelector('#canvas');
  //canvas.style.display = 'block';
  console.log(`canvas: ${canvas}`)
  canvas.width = innerWidth;
  canvas.height = innerHeight * .8;
  console.log(`width: ${canvas.width}`)
  console.log(`height: ${canvas.height}`)

  const game = new Game(canvas, gameOver);
  //document.querySelector(".player").textContent = name;
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

