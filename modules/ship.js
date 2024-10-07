export default class Ship {
  constructor(name, size, position, hits = 0, sunk = false) {
    this.name = name;
    this.size = size;
    this.position = position;
    this.hits = hits;
    this.sunk = sunk;
  }

  hit() {
    if (this.sunk) {
      return;
    }
    this.hits++;
    console.log(`${this.name} has been hit! Total hits: ${this.hits}`);
    this.isSunk();
  }

  isSunk() {
    if (this.hits == this.size) {
      this.sunk = true;
      console.log(`${this.name} has been sunk!`);
    }
    return this.sunk;
  }
}
