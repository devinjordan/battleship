import Player from "./player.js";

const playerDiv = document.getElementById('player-board');
const opponentDiv = document.getElementById('opponent-board');

const player = new Player();
const opponent = new Player();

const playerBoard = document.createElement('div');

let playerShipsDown = 0;

console.log(player.board.length);

for (let i = 0; i < player.board.length; i++) {
  const cell = document.createElement('button');
  cell.style.backgroundColor = 'black';
  cell.addEventListener('click', () => {
    if (playerShipsDown > 4) return;
    player.board.placeShip(player.ships[playerShipsDown], i);
    playerShipsDown++;
  });
  playerBoard.appendChild(cell);
};

playerDiv.appendChild(playerBoard);
