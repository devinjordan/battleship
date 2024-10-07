import Player from "./player.js";

const playerDiv = document.getElementById('player-board');
const opponentDiv = document.getElementById('opponent-board');

const player = new Player();
const opponent = new Player();

const playerBoardSetup = function() {
  const playerBoard = document.createElement('div');

  let axis = true;
  const axisBtn = document.querySelector('#rotate-axis');
  axisBtn.addEventListener('click', () => {
    if (axis === true) axis = false;
    else axis = true;
  });
  playerDiv.appendChild(axisBtn);

  let playerShipsDown = 0;

  for (let i = 0; i < player.board.board.length; i++) {
    if (i % 10 == 0) {
      const nextLine = document.createElement('div');
      playerBoard.appendChild(nextLine);
    }
    const cell = document.createElement('button');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', function handleClick() {
      if (playerShipsDown >= 5) {
        const newBoard = playerBoard.cloneNode(true);
        playerBoard.parentNode.replaceChild(newBoard, playerBoard);
        return;
      };
      if (player.board.placeShip(player.ships[playerShipsDown], i, axis) == false) return;
      for (let i = 0; i < player.ships[playerShipsDown].position.length; i++) {
        const shipCell = playerDiv.querySelector(`.cell[data-index='${player.ships[playerShipsDown].position[i]}']`);
        shipCell.classList.add('ship');
        shipCell.disabled = true;
        player.board.occupiedSpaces.push(player.ships[playerShipsDown].position[i]);
      }
      playerShipsDown++;
    });

    // TODO: add hover effect to show ship placement

    playerBoard.appendChild(cell);
  };
  playerDiv.appendChild(playerBoard);
};

const opponentBoardSetup = function() {
  const opponentBoard = document.createElement('div');
  
  let axis = true;

  for (let i = 0; i < opponent.ships.length; i++) {
    if (Math.random() > 0.5) {
      axis = false;
    } else {
      axis = true;
    }
    do {
      opponent.board.placeShip(opponent.ships[i], Math.floor(Math.random() * 100), axis);
    } while (opponent.ships[i].position == null);
    for (let j = 0; j < opponent.ships[i].position.length; j++) {
      opponent.board.occupiedSpaces.push(opponent.ships[i].position[j]);
    };
    // ensure ship is not being placed on top of another
    // for (let j = 0; j < opponent.ships[i].position.length; j++) {
    //   if (occupiedSpaces.includes(opponent.ships[i].position[j])) {
    //     opponent.ships[i].position = [];
    //     i--;
    //   }
    // }
  };

  console.log(opponent.board.occupiedSpaces);
  opponent.ships.forEach(ship => {
    console.log(ship.name);
    console.log(ship.position);
  });


  for (let i = 0; i < opponent.board.board.length; i++) {
    if (i % 10 == 0) {
      const nextLine = document.createElement('div');
      opponentBoard.appendChild(nextLine);
    };

    const cell = document.createElement('button');
    cell.classList.add('cell');
    cell.dataset.index = i;

    cell.addEventListener('click', () => {
      if (opponent.board.board[i].beenHit) {
        console.log('you already shot here');
        return;
      }
      if (opponent.board.board[i].hasShip) {
        console.log('hit');
        cell.classList.add('hit');
        opponent.board.board[i].hasShip.hit();
        if (opponent.board.board[i].hasShip.isSunk()) {
          console.log(`You sank your opponent's ${opponent.board.board[i].hasShip.name}!`);
        }
      } else {
        console.log('miss');
        cell.classList.add('miss');
      }
      opponent.board.board[i].beenHit = true;

      // opponent's turn
      let randomCell;
      do {
        randomCell = Math.floor(Math.random() * 100);
      } while (player.board.board[randomCell].beenHit);
      console.log(randomCell);
      if (player.board.board[randomCell].hasShip) {
        console.log('opponent hit');
        const cell = document.querySelector(`.cell[data-index='${randomCell}']`);
        cell.classList.add('hit');
        player.board.board[randomCell].hasShip.hit();
        if (player.board.board[randomCell].hasShip.isSunk()) {
          console.log(`Your ${player.board.board[randomCell].hasShip.name} has been sunk!`);
        }
      } else {
        console.log('opponent miss');
        const cell = document.querySelector(`.cell[data-index='${randomCell}']`);
        cell.classList.add('miss');
      }
    })
    opponentBoard.appendChild(cell);
  }

  opponentDiv.appendChild(opponentBoard);
}

playerBoardSetup();
opponentBoardSetup();