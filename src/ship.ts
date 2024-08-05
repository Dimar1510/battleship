export default class Ship {
  length: number;
  hits: string[];
  vertical: boolean;
  row: number | null;
  column: number | null;
  name: string;

  constructor(length: number, name = "") {
    this.length = length;
    this.hits = [];
    this.vertical = false;
    this.row = null;
    this.column = null;
    this.name = name;
  }

  hit(position: string) {
    this.hits.push(position);
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}
