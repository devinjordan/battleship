import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

describe('Gameboard functions', () => {
  let testBoard;
  beforeEach(() => {
    testBoard = new Gameboard;
  });

  it('initializes a gameboard with 100 cells', () => {
    expect(testBoard.board.length).toBe(100);
  });

  it('receives an attack and updates that cell', () => {
    testBoard.hitCell(71);
    expect(testBoard.board[71].beenHit).toBe(true);
  });

  it('does not receive attacks on hit cells', () => {
    testBoard.hitCell(72);
    expect(testBoard.hitCell(72)).toBe(false);
  });

  it('can hold a ship', () => {
    const testCarrier = new Ship('Carrier', 5);
    testBoard.placeShip(testCarrier, 91);
    expect(testBoard.board[91].hasShip.name).toBe('Carrier');
  });

  it('positions a ship on the x-axis', () => {
    const testCarrier = new Ship('Carrier', 5);
    const testSub = Gameboard.ships.submarine;
    testBoard.placeShip(testCarrier, 91);
    testBoard.placeShip(testSub, 7);
    expect(testCarrier.position).toStrictEqual([91, 92, 93, 94, 95]);
    expect(testSub.position).toStrictEqual([7, 8, 9]);
  });

  it('does not misposition a ship', () => {
    const testCarrier = new Ship('Carrier', 5);
    testBoard.placeShip(testCarrier, 91);
    expect(testCarrier.position).not.toContain(96);
    expect(testCarrier.position).not.toContain(90);

  });

  it('can position a ship on the y-axis', () => {
    const testCarrier = new Ship('Carrier', 5);
    testBoard.placeShip(testCarrier, 11, false);
    expect(testCarrier.position).toStrictEqual([11, 21, 31, 41, 51]);
  });

  it('refuses to place ships where boundaries occur', () => {
    const testCarrier = Gameboard.ships.carrier;
    testBoard.placeShip(testCarrier, 9);
    expect(testCarrier.position).not.toBeDefined;
    testBoard.placeShip(testCarrier, 71);
    expect(testCarrier.position).not.toBeDefined;
  });

  it('delivers a hit to a ship when struck', () => {
    const testCarrier = Gameboard.ships.carrier;
    testBoard.placeShip(testCarrier, 3);
    testBoard.hitCell(7);
    expect(testBoard.board[7].beenHit).toBe(true);
    expect(testCarrier.hits).toBe(1);
  });

  it('sinks a ship after enough hits', () => {
    const testDestroyer = Gameboard.ships.destroyer;
    testBoard.placeShip(testDestroyer, 12, false);
    expect(testDestroyer.sunk).toBe(false);
    testBoard.hitCell(12);
    testBoard.hitCell(22);
    testBoard.hitCell(32);
    expect(testDestroyer.sunk).toBe(true);
  });

  it('cannot place ships on top of each other', () => {
    const carrier = Gameboard.ships.carrier;
    const submarine = Gameboard.ships.submarine;
    testBoard.placeShip(carrier, 57, false);
    testBoard.placeShip(submarine, 56);
    expect(carrier.position).toStrictEqual([57, 67, 77, 87, 97]);
    expect(submarine.position).not.toBeDefined;
  });

  it('knows when all ships are sunk', () => {
    const carrier = Gameboard.ships.carrier;
    const battleship = Gameboard.ships.battleship;
    const destroyer = Gameboard.ships.destroyer;
    const submarine = Gameboard.ships.submarine;
    const patrolBoat = Gameboard.ships.patrolBoat;

    testBoard.placeShip(carrier, 47);
    testBoard.placeShip(battleship, 57);
    testBoard.placeShip(destroyer, 1, false);
    testBoard.placeShip(submarine, 2, false);
    testBoard.placeShip(patrolBoat, 97);

    const ships = [carrier, battleship, destroyer, submarine, patrolBoat];
    expect(testBoard.allShipsSunk(ships)).toBe(false);

    carrier.sunk = true;
    battleship.sunk = true;
    destroyer.sunk = true;
    submarine.sunk = true;
    patrolBoat.sunk = true;

    expect(testBoard.allShipsSunk(ships)).toBe(true);
  });

});
