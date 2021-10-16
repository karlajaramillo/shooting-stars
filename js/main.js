const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d'); // access to canvas
canvas.width = innerWidth;
canvas.height = innerHeight;
console.log(ctx);

// We need our javascript to wait until the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
	onPageLoad();
  onPageGame();
	
});

function onPageLoad () {
  const homeTemplate = `    
    <div class="wrapper-container">
      <h1>Welcome to 
      <br>Shooting stars Game</h1>
      <section class="section-start">
        <h2>Start your game with two simple questions</h2>
        <div>
         <input type="text" placeholder="What's your name?">
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

function onPageGame() {
  document.querySelector('.start-game').addEventListener('click', () => {
    renderAt(".container","");
  });
}


// Method to render pages
function renderAt(element, html) {
	const node = document.querySelector(element);
	node.innerHTML = html
}