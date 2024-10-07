// // gameController.test.js
// import { opponentBoardSetup } from './gameController';
// import Player from './player';

// test('opponentBoardSetup should not have duplicates in occupiedSpaces', () => {
//   const opponent = new Player();
//   opponentBoardSetup(opponent);

//   const occupiedSpaces = opponent.board.occupiedSpaces;
//   const uniqueSpaces = new Set(occupiedSpaces);

//   expect(uniqueSpaces.size).toBe(occupiedSpaces.length);
// });