import Player from "./player.js";

const playerDiv = document.getElementById('player-board');
const opponentDiv = document.getElementById('opponent-board');

const player = new Player();
const opponent = new Player();

const playerBoardSetup = async function() {
  return new Promise((resolve) => {
    const playerBoard = document.createElement('div');

    let axis = true;
    const axisBtn = document.querySelector('#rotate-axis');
    axisBtn.addEventListener('click', () => {
      if (axis === true) axis = false;
      else axis = true;
    });

    let playerShipsDown = 0;

    for (let i = 0; i < player.board.board.length; i++) {
      if (i % 10 == 0) {
        const nextLine = document.createElement('div');
        playerBoard.appendChild(nextLine);
      }
      const cell = document.createElement('button');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.textContent = i;

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
        }
        playerShipsDown++;
        if (playerShipsDown === 5) {
          resolve();
          player.ships.forEach(ship => {
            console.log(ship.name);
            console.log(ship.position);
          });
        }
      });
      // TODO: add hover effect to show ship placement
      playerBoard.appendChild(cell);
    };
    playerDiv.appendChild(playerBoard);
    
  });
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

    let placed = false;
    do {
      const position = Math.floor(Math.random() * 100);
      placed = opponent.board.placeShip(opponent.ships[i], position, axis);
    } while (placed == false);
  };

  opponent.ships.forEach(ship => {
    opponent.board.occupiedSpaces.push(...ship.position);
  });

  (function testBoard() {
    let testSpaces = [];
    opponent.board.occupiedSpaces.forEach(space => {
      if (testSpaces.includes(space)) {
        console.log('duplicate');
      } else {
        testSpaces.push(space);
      }
    });
    console.log('no duplicates');  
  })();

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
    cell.textContent = i;
    cell.classList.add('cell');
    cell.dataset.index = i;

    cell.addEventListener('click', () => {
      if (opponent.board.hitCell(i)) {
        cell.classList.add('hit');
      } else {
        cell.classList.add('miss');
      }

      // opponents turn
      let randomCell;

      do {
        randomCell = Math.floor(Math.random() * 100);
      } while (player.board.board[randomCell].beenHit);

      if (player.board.hitCell(randomCell)) {
        playerDiv.querySelector(`.cell[data-index='${randomCell}']`).classList.add('hit');
      } else {
        playerDiv.querySelector(`.cell[data-index='${randomCell}']`).classList.add('miss');
      };
      
      // TODO: check if game is over

    });
    opponentBoard.appendChild(cell);
  }

  opponentDiv.appendChild(opponentBoard);
}

const setupGame = async function() {
  await playerBoardSetup();
  opponentBoardSetup();
};

setupGame();
