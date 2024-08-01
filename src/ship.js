export default class Ship {
  constructor(length, name = "") {
    this.length = length;
    this.hits = [];
    this.vertical = false;
    this.row = null;
    this.column = null;
    this.name = name;
  }

  hit(position) {
    this.hits.push(position);
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}
