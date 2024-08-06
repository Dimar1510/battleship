import playGame from "./game";
import Gameboard from "./gameboard";
import Player from "./player";
import Ship from "./ship";
import "./styles/board.scss";
import "./styles/ships.scss";
import { getElement } from "./utils";

const render = (() => {
  const shipField = getElement<HTMLElement>(".ships-select");

  function gameboard(
    gameboard: Gameboard,
    player: boolean,
    gameGoing?: boolean
  ) {
    const boardField = player
      ? getElement<HTMLElement>(".board-player")
      : getElement<HTMLElement>(".board-computer");
    boardField.innerHTML = "";
    if (gameGoing) {
      shipField.style.display = "none";
      if (!player) boardField.style.display = "grid";
    } else {
      shipField.style.display = "flex";
      if (!player) boardField.style.display = "none";
    }

    const space = document.createElement("div");
    boardField.append(space);
    for (let i = 0; i < gameboard.size; i++) {
      const columns = document.createElement("div");
      columns.classList.add("columns");
      columns.textContent = String.fromCharCode(65 + i);
      boardField.append(columns);
    }

    let index = 0;
    for (let i = 0; i < gameboard.size; i++) {
      for (let j = 0; j < gameboard.size; j++) {
        if (index % gameboard.size === 0) {
          const rows = document.createElement("div");
          rows.classList.add("rows");
          rows.textContent = Math.ceil((index + 1) / 10).toString();
          boardField.append(rows);
        }
        boardField.append(createCell(gameboard, player, i, j, gameGoing));
        index++;
      }
    }
  }

  function createCell(
    gameboard: Gameboard,
    player: boolean,
    row: number,
    column: number,
    gameGoing: boolean
  ) {
    const cell = document.createElement("div");
    const coord = gameboard.board[row][column];
    cell.classList.add("cell");
    cell.dataset.row = row.toString();
    cell.dataset.column = column.toString();
    if (coord) {
      if (typeof coord === "string") cell.classList.add("miss");
      // it is a ship
      else {
        if (player) cell.classList.add("ship");
        if (coord.hits.includes(`${row}, ${column}`)) cell.classList.add("hit");
        if (coord.isSunk()) cell.classList.add("sunk");

        if (player && !gameGoing) {
          if (coord.row === row && coord.column === column) {
            cell.classList.add("draggable");
            const drag = (e: DragEvent) => {
              const target = e.target as HTMLElement;
              const newRow = parseInt(target.dataset.row || "");
              const newColumn = parseInt(target.dataset.column || "");
              playGame.moveship(newRow, newColumn, coord);
            };
            cell.draggable = true;
            cell.onclick = () => playGame.rotateShip(coord);
            cell.ondragstart = () => {
              document
                .querySelector(".board-player")
                .addEventListener("drop", drag);
            };
            cell.ondragend = () => {
              document
                .querySelector(".board-player")
                .removeEventListener("drop", drag);
            };
          } else cell.style.pointerEvents = "none";
        }
      }
    } else {
      // empty cell
      cell.ondragstart = function (e) {
        e.preventDefault();
        return false;
      };
    }

    if (player && !gameGoing) {
      if (!coord) {
        cell.ondragenter = (e) => {
          e.preventDefault();
          cell.style.backgroundColor = "grey";
        };
        cell.ondragleave = (e) => {
          e.preventDefault();
          cell.style.background = "none";
        };
        cell.ondragover = (e) => {
          e.preventDefault();
        };
      }
      cell.ondrop = (e) => {
        e.preventDefault();
        cell.style.background = "none";
        const index = e.dataTransfer.getData("id");
        if (index) {
          const target = e.target as HTMLElement;
          const newRow = parseInt(target.dataset.row || "");
          const newColumn = parseInt(target.dataset.column || "");
          playGame.placeShips(newRow, newColumn, parseInt(index));
        }
        e.dataTransfer.setData("id", null);
      };
    }

    if (!player && gameGoing)
      cell.onclick = () => playGame.takeTurn(row, column);

    return cell;
  }

  function shipsSelection(ships: Ship[]) {
    shipField.innerHTML = "";
    for (let i = 0; i < ships.length; i++) {
      const shipItem = document.createElement("div");
      const shipBody = document.createElement("div");
      const shipName = document.createElement("div");
      shipItem.classList.add("ship-item");
      shipBody.classList.add("ship-body");
      shipName.classList.add("ship-name");
      shipBody.draggable = true;
      for (let j = 0; j < ships[i].length; j++) {
        const shipCell = document.createElement("div");
        shipCell.classList.add("ship");
        shipCell.classList.add("cell");
        shipBody.append(shipCell);
      }
      shipName.textContent = ships[i].name;
      shipItem.append(shipName, shipBody);
      shipField.append(shipItem);

      shipBody.ondragstart = (e) => {
        e.dataTransfer.setData("id", i.toString());
        e.dataTransfer.setData("length", ships[i].length.toString());
      };
    }
  }

  function buttons(mode: "placing" | "ready" | "game") {
    const confirm = getElement<HTMLButtonElement>("#button-start");
    const reset = getElement<HTMLButtonElement>("#button-reset");
    const random = getElement<HTMLButtonElement>("#button-random");

    confirm.disabled = true;
    reset.disabled = true;
    random.disabled = true;

    confirm.style.display = "inline";
    random.style.display = "inline";
    reset.textContent = "Reset";

    if (mode === "placing" || mode === "ready") {
      reset.disabled = false;
      reset.onclick = () => playGame.resetBoard();
      random.disabled = false;
      random.onclick = () => playGame.placeRandom();
    }
    if (mode === "ready") {
      confirm.disabled = false;
      confirm.onclick = () => playGame.startGame();
    }
    if (mode === "game") {
      confirm.style.display = "none";
      random.style.display = "none";
      reset.textContent = "New game";
      reset.disabled = false;
      reset.onclick = () => playGame.resetGame();
    }
  }

  function message(message: string) {
    const messageField = getElement<HTMLElement>(".message");
    messageField.innerText = message;
    messageField.classList.remove("victory");
    messageField.classList.remove("defeat");
    if (message === "VICTORY!") {
      messageField.classList.add("victory");
    }
    if (message === "DEFEAT") {
      messageField.classList.add("defeat");
    }
  }

  function enableBoard(arg: "all" | "none") {
    const board = getElement<HTMLElement>(".board-computer");
    board.style.pointerEvents = arg;
  }

  return { gameboard, message, shipsSelection, buttons, enableBoard };
})();

export default render;
