import Ship from "./ship.js";

describe('hits and sinks', () => {
  const ships = {
    carrier: new Ship('Carrier', 5),
    battleship: new Ship('Battleship', 4),
    destroyer: new Ship('Destroyer', 3),
    submarine: new Ship('Submarine', 3),
    patrolBoat: new Ship('Patrol Boat', 2),
  }
   
  it("sinks when hitcount == size", () => {
    for (let key in ships) {
      let ship = ships[key];
      for (let i = 0; i < ship.size; i++) {
        ship.hit();
      }
      expect(ship.isSunk()).toBe(true);
    }
  });
  
  it('does not take hits when sunk', () => {
    for (let key in ships) {
      let ship = ships[key];
      ship.hit();
      expect(ship.hits).toBe(ship.size);
      expect(ship.isSunk()).toBe(true);
    }
  });  
});

it('is not sunk when hits < size', () => {
  const testSub = new Ship('Submarine', 3);
  testSub.hit();
  expect(testSub.isSunk()).toBe(false);
});