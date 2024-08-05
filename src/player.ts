import Gameboard from "./gameboard";
import Ship from "./ship";

type TDirection = "up" | "down" | "left" | "right";

export default class Player {
  name: string;
  lastHit: {
    row: number;
    column: number;
    ship: Ship;
  };
  lastMove: {
    row: number;
    column: number;
    miss: boolean;
  };
  hits: {
    row: number;
    column: number;
    ship: Ship;
  }[];
  directions: TDirection[];

  constructor(name: string) {
    this.name = name;
    this.lastHit = {
      row: null,
      column: null,
      ship: null,
    };
    this.lastMove = {
      row: null,
      column: null,
      miss: false,
    };
    this.hits = [];
    this.directions = ["up", "down", "left", "right"];
  }

  isHit(row: number, column: number, gameboard: Gameboard) {
    const cell = gameboard.board[row][column];
    if (typeof cell === "string" || !cell) {
      return false;
    }
    if (cell.hits.includes(`${row}, ${column}`)) return true;
    return false;
  }

  attack(row: number, column: number, gameboard: Gameboard) {
    console.log("attack");
    if (!gameboard.receiveAttack(row, column)) {
      console.log("recieve attack false");
      return false;
    }

    const cell = gameboard.board[row][column];
    if (this.isHit(row, column, gameboard)) {
      if (typeof cell === "object") this.lastHit = { row, column, ship: cell };
      this.lastMove = { row, column, miss: false };
      this.hits.push(this.lastHit);
    } else this.lastMove = { row, column, miss: true };
    return true;
  }

  attackCPU(gameboard: Gameboard) {
    if (gameboard.isGameOver()) return false;

    if (this.lastHit.ship) {
      // if we just sunk a ship, attack at random place
      if (this.lastHit.ship.isSunk()) {
        this.hits = [];
        this.directions = ["up", "down", "left", "right"];
        this.randomAttack(gameboard);
        return true;
      }
      if (this.hits.length === 1) {
        // 1 of 4 directions

        if (this.directions.length === 0) {
          this.randomAttack(gameboard);
          this.hits = [];
          this.directions = ["up", "down", "left", "right"];
          return true;
        }
        let currentDirection =
          this.directions[Math.floor(Math.random() * this.directions.length)];

        if (
          !this.attackLine(
            this.lastHit.row,
            this.lastHit.column,
            currentDirection,
            gameboard
          )
        ) {
          this.directions.splice(this.directions.indexOf(currentDirection), 1);
          this.attackCPU(gameboard);
        }
        this.directions = ["up", "down", "left", "right"];
        return true;
      } else {
        if (this.hits[0].row === this.hits[this.hits.length - 1].row) {
          // ship is horizontal
          for (let i = 0; i < this.hits.length; i++) {
            if (
              this.attack(this.hits[i].row, this.hits[i].column - 1, gameboard)
            )
              return true;
            if (
              this.attack(this.hits[i].row, this.hits[i].column + 1, gameboard)
            )
              return true;
          }
        } else if (
          this.hits[0].column === this.hits[this.hits.length - 1].column
        ) {
          // ship is vertical
          for (let i = 0; i < this.hits.length; i++) {
            if (
              this.attack(this.hits[i].row - 1, this.hits[i].column, gameboard)
            )
              return true;
            if (
              this.attack(this.hits[i].row + 1, this.hits[i].column, gameboard)
            )
              return true;
          }
        }
      }
    } else {
      this.randomAttack(gameboard);
      return true;
    }
  }

  attackLine(
    row: number,
    column: number,
    direction: TDirection,
    gameboard: Gameboard
  ) {
    if (direction === "up") {
      return this.attack(row - 1, column, gameboard);
    }
    if (direction === "down") {
      return this.attack(row + 1, column, gameboard);
    }
    if (direction === "left") {
      return this.attack(row, column - 1, gameboard);
    }
    if (direction === "right") {
      return this.attack(row, column + 1, gameboard);
    }
  }

  randomAttack(gameboard: Gameboard) {
    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);

    while (!this.attack(row, column, gameboard) && !gameboard.isGameOver()) {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
    }

    return true;
  }
}
