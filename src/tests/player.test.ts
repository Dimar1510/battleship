import Player from "../player";
import Gameboard from "../gameboard";
import Ship from "../ship";

let board: Gameboard;
let player: Player;

beforeEach(() => {
  board = new Gameboard();
  player = new Player("One");
});

test("player can hit a ship", () => {
  const newShip = new Ship(4);
  board.placeShip(newShip, 5, 4, false);
  player.attack(5, 4, board);
  expect(newShip.hits.length).toBe(1);
});

test("player can miss", () => {
  const newShip = new Ship(4);
  board.placeShip(newShip, 5, 4, false);
  player.attack(1, 1, board);
  expect(newShip.hits.length).toBe(0);
});

test("player cannot hit same empty place twice", () => {
  const newShip = new Ship(4);
  board.placeShip(newShip, 5, 4, false);
  player.attack(1, 1, board);
  expect(player.attack(1, 1, board)).toBe(false);
});

test("player cannot hit same empty place twice", () => {
  const newShip = new Ship(4);
  board.placeShip(newShip, 5, 4, false);
  player.attack(5, 3, board);
  expect(player.attack(5, 3, board)).toBe(false);
});
