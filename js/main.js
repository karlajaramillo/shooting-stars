const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d'); // access to canvas
canvas.width = 700;
canvas.height = 500;
console.log(ctx);

const startBtn = document.querySelector('.start-game').addEventListener('click', () => {
    renderAt(".container","");
}
    

);

// render pages
function renderAt(element, html) {
	const node = document.querySelector(element);
	node.innerHTML = html
}