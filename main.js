/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/board.scss":
/*!*******************************!*\
  !*** ./src/styles/board.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship/./src/styles/board.scss?");

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship/./src/styles/index.scss?");

/***/ }),

/***/ "./src/styles/ships.scss":
/*!*******************************!*\
  !*** ./src/styles/ships.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship/./src/styles/ships.scss?");

/***/ }),

/***/ "./src/gameboard.ts":
/*!**************************!*\
  !*** ./src/gameboard.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.ts\");\n\nvar SIZE = 10;\nvar Gameboard = /** @class */ (function () {\n    function Gameboard() {\n        this.board = [];\n        for (var i = 0; i < SIZE; i++) {\n            this.board[i] = [];\n            for (var j = 0; j < SIZE; j++) {\n                this.board[i][j] = null;\n            }\n        }\n        this.size = SIZE;\n    }\n    Gameboard.prototype.clear = function () {\n        this.board = [];\n        for (var i = 0; i < SIZE; i++) {\n            this.board[i] = [];\n            for (var j = 0; j < SIZE; j++) {\n                this.board[i][j] = null;\n            }\n        }\n    };\n    Gameboard.prototype.placeShip = function (ship, row, column, vertical) {\n        if (!this.placementPossible(ship, row, column, vertical)) {\n            return false;\n        }\n        if (vertical) {\n            for (var i = 0; i < ship.length; i++) {\n                this.board[row + i][column] = ship;\n            }\n            ship.vertical = true;\n        }\n        else {\n            for (var i = 0; i < ship.length; i++) {\n                this.board[row][column + i] = ship;\n            }\n            ship.vertical = false;\n        }\n        ship.row = row;\n        ship.column = column;\n        return true;\n    };\n    Gameboard.prototype.deleteShip = function (ship) {\n        if (ship.vertical) {\n            for (var i = 0; i < ship.length; i++) {\n                this.board[ship.row + i][ship.column] = null;\n            }\n        }\n        else {\n            for (var i = 0; i < ship.length; i++) {\n                this.board[ship.row][ship.column + i] = null;\n            }\n        }\n    };\n    Gameboard.prototype.rotateShip = function (ship) {\n        if (ship.vertical) {\n            for (var i = 0; i < ship.length; i++) {\n                this.board[ship.row + i][ship.column] = null;\n            }\n            if (!this.placementPossible(ship, ship.row, ship.column, false)) {\n                for (var i = 0; i < ship.length; i++) {\n                    this.board[ship.row + i][ship.column] = ship;\n                }\n                return false;\n            }\n            this.placeShip(ship, ship.row, ship.column, false);\n        }\n        else {\n            for (var i = 0; i < ship.length; i++) {\n                this.board[ship.row][ship.column + i] = null;\n            }\n            if (!this.placementPossible(ship, ship.row, ship.column, true)) {\n                for (var i = 0; i < ship.length; i++) {\n                    this.board[ship.row][ship.column + i] = ship;\n                }\n                return false;\n            }\n            this.placeShip(ship, ship.row, ship.column, true);\n        }\n        return true;\n    };\n    Gameboard.prototype.receiveAttack = function (row, column) {\n        if (row < 0 || row > SIZE - 1 || column < 0 || column > SIZE - 1) {\n            return false;\n        }\n        var cell = this.board[row][column];\n        if (!cell)\n            this.board[row][column] = \"miss\";\n        else if (cell === \"miss\") {\n            return false;\n        }\n        else {\n            if (typeof cell === \"object\") {\n                if (cell.hits.includes(\"\".concat(row, \", \").concat(column)))\n                    return false;\n                else\n                    cell.hit(\"\".concat(row, \", \").concat(column));\n                // if ship is sunk, fill all neighbors with misses\n                if (cell.isSunk()) {\n                    if (cell.vertical) {\n                        var start = 0;\n                        var end = cell.length;\n                        if (cell.row !== 0) {\n                            start = -1;\n                            this.board[cell.row - 1][cell.column] = \"miss\";\n                        }\n                        if (cell.row + cell.length !== SIZE) {\n                            end = cell.length + 1;\n                            this.board[cell.row + cell.length][cell.column] = \"miss\";\n                        }\n                        for (var i = start; i < end; i++) {\n                            if (cell.column !== 0)\n                                this.board[cell.row + i][cell.column - 1] = \"miss\";\n                            if (cell.column !== SIZE - 1)\n                                this.board[cell.row + i][cell.column + 1] = \"miss\";\n                        }\n                    }\n                    else {\n                        var start = 0;\n                        var end = cell.length;\n                        if (cell.column !== 0) {\n                            start = -1;\n                            this.board[cell.row][cell.column - 1] = \"miss\";\n                        }\n                        if (cell.column + cell.length !== SIZE) {\n                            end = cell.length + 1;\n                            this.board[cell.row][cell.column + cell.length] = \"miss\";\n                        }\n                        for (var i = start; i < end; i++) {\n                            if (cell.row !== 0)\n                                this.board[cell.row - 1][cell.column + i] = \"miss\";\n                            if (cell.row !== SIZE - 1)\n                                this.board[cell.row + 1][cell.column + i] = \"miss\";\n                        }\n                    }\n                }\n            }\n        }\n        return true;\n    };\n    Gameboard.prototype.placementPossible = function (ship, row, column, vertical) {\n        if (row < 0 || row > SIZE - 1 || column < 0 || column > SIZE - 1) {\n            return false;\n        }\n        if (vertical) {\n            if (row + ship.length > SIZE)\n                return false;\n            for (var i = 0; i < ship.length; i++) {\n                if (this.board[row + i][column] && this.board[row + i][column] !== ship)\n                    return false;\n            }\n            var start = -1;\n            var end = ship.length + 1;\n            if (row === 0)\n                start = 0;\n            else if (row + ship.length === SIZE)\n                end = ship.length;\n            for (var i = start; i < end; i++) {\n                if (column === 0) {\n                    if ((this.board[row + i][column + 1] &&\n                        this.board[row + i][column + 1] !== ship) ||\n                        (this.board[row + i][column] &&\n                            this.board[row + i][column] !== ship))\n                        return false;\n                }\n                else if (column === SIZE - 1) {\n                    if ((this.board[row + i][column - 1] &&\n                        this.board[row + i][column - 1] !== ship) ||\n                        (this.board[row + i][column] &&\n                            this.board[row + i][column] !== ship))\n                        return false;\n                }\n                else {\n                    if ((this.board[row + i][column + 1] &&\n                        this.board[row + i][column + 1] !== ship) ||\n                        (this.board[row + i][column - 1] &&\n                            this.board[row + i][column - 1] !== ship) ||\n                        (this.board[row + i][column] &&\n                            this.board[row + i][column] !== ship))\n                        return false;\n                }\n            }\n        }\n        else {\n            if (column + ship.length > SIZE)\n                return false;\n            for (var i = 0; i < ship.length; i++) {\n                if (this.board[row][column + i] && this.board[row][column + i] !== ship)\n                    return false;\n            }\n            var start = -1;\n            var end = ship.length + 1;\n            if (column === 0)\n                start = 0;\n            else if (column + ship.length === SIZE)\n                end = ship.length;\n            for (var i = start; i < end; i++) {\n                if (row === 0) {\n                    if ((this.board[row + 1][column + i] &&\n                        this.board[row + 1][column + i] !== ship) ||\n                        (this.board[row][column + i] &&\n                            this.board[row][column + i] !== ship))\n                        return false;\n                }\n                else if (row === SIZE - 1) {\n                    if ((this.board[row - 1][column + i] &&\n                        this.board[row - 1][column + i] !== ship) ||\n                        (this.board[row][column + i] &&\n                            this.board[row][column + i] !== ship))\n                        return false;\n                }\n                else {\n                    if ((this.board[row + 1][column + i] &&\n                        this.board[row + 1][column + i] !== ship) ||\n                        (this.board[row - 1][column + i] &&\n                            this.board[row - 1][column + i] !== ship) ||\n                        (this.board[row][column + i] &&\n                            this.board[row][column + i] !== ship))\n                        return false;\n                }\n            }\n        }\n        return true;\n    };\n    Gameboard.prototype.isGameOver = function () {\n        for (var i = 0; i < SIZE; i++) {\n            for (var j = 0; j < SIZE; j++) {\n                var cell = this.board[i][j];\n                if (cell && typeof cell === \"object\" && !cell.isSunk()) {\n                    return false;\n                }\n            }\n        }\n        return true;\n    };\n    Gameboard.prototype.placeShipsRandomly = function () {\n        var ships = [];\n        var carrier = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5);\n        var battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4);\n        var destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3);\n        var submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3);\n        var patrolBoat = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2);\n        ships.push(carrier, battleship, destroyer, submarine, patrolBoat);\n        var succesfulPlacements = 0;\n        while (succesfulPlacements < 5) {\n            var row = Math.floor(Math.random() * 10);\n            var column = Math.floor(Math.random() * 10);\n            var isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;\n            if (this.placeShip(ships[succesfulPlacements], row, column, isVertical))\n                succesfulPlacements++;\n        }\n        return ships;\n    };\n    return Gameboard;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.ts?");

/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Player = /** @class */ (function () {\n    function Player(name) {\n        this.name = name;\n        this.lastHit = {\n            row: null,\n            column: null,\n            ship: null,\n        };\n        this.lastMove = {\n            row: null,\n            column: null,\n            miss: false,\n        };\n        this.hits = [];\n        this.directions = [\"up\", \"down\", \"left\", \"right\"];\n    }\n    Player.prototype.isHit = function (row, column, gameboard) {\n        var cell = gameboard.board[row][column];\n        if (typeof cell === \"string\" || !cell) {\n            return false;\n        }\n        if (cell.hits.includes(\"\".concat(row, \", \").concat(column)))\n            return true;\n        return false;\n    };\n    Player.prototype.attack = function (row, column, gameboard) {\n        console.log(\"attack\");\n        if (!gameboard.receiveAttack(row, column)) {\n            console.log(\"recieve attack false\");\n            return false;\n        }\n        var cell = gameboard.board[row][column];\n        if (this.isHit(row, column, gameboard)) {\n            if (typeof cell === \"object\")\n                this.lastHit = { row: row, column: column, ship: cell };\n            this.lastMove = { row: row, column: column, miss: false };\n            this.hits.push(this.lastHit);\n        }\n        else\n            this.lastMove = { row: row, column: column, miss: true };\n        return true;\n    };\n    Player.prototype.attackCPU = function (gameboard) {\n        if (gameboard.isGameOver())\n            return false;\n        if (this.lastHit.ship) {\n            // if we just sunk a ship, attack at random place\n            if (this.lastHit.ship.isSunk()) {\n                this.hits = [];\n                this.directions = [\"up\", \"down\", \"left\", \"right\"];\n                this.randomAttack(gameboard);\n                return true;\n            }\n            if (this.hits.length === 1) {\n                // 1 of 4 directions\n                if (this.directions.length === 0) {\n                    this.randomAttack(gameboard);\n                    this.hits = [];\n                    this.directions = [\"up\", \"down\", \"left\", \"right\"];\n                    return true;\n                }\n                var currentDirection = this.directions[Math.floor(Math.random() * this.directions.length)];\n                if (!this.attackLine(this.lastHit.row, this.lastHit.column, currentDirection, gameboard)) {\n                    this.directions.splice(this.directions.indexOf(currentDirection), 1);\n                    this.attackCPU(gameboard);\n                }\n                this.directions = [\"up\", \"down\", \"left\", \"right\"];\n                return true;\n            }\n            else {\n                if (this.hits[0].row === this.hits[this.hits.length - 1].row) {\n                    // ship is horizontal\n                    for (var i = 0; i < this.hits.length; i++) {\n                        if (this.attack(this.hits[i].row, this.hits[i].column - 1, gameboard))\n                            return true;\n                        if (this.attack(this.hits[i].row, this.hits[i].column + 1, gameboard))\n                            return true;\n                    }\n                }\n                else if (this.hits[0].column === this.hits[this.hits.length - 1].column) {\n                    // ship is vertical\n                    for (var i = 0; i < this.hits.length; i++) {\n                        if (this.attack(this.hits[i].row - 1, this.hits[i].column, gameboard))\n                            return true;\n                        if (this.attack(this.hits[i].row + 1, this.hits[i].column, gameboard))\n                            return true;\n                    }\n                }\n            }\n        }\n        else {\n            this.randomAttack(gameboard);\n            return true;\n        }\n    };\n    Player.prototype.attackLine = function (row, column, direction, gameboard) {\n        if (direction === \"up\") {\n            return this.attack(row - 1, column, gameboard);\n        }\n        if (direction === \"down\") {\n            return this.attack(row + 1, column, gameboard);\n        }\n        if (direction === \"left\") {\n            return this.attack(row, column - 1, gameboard);\n        }\n        if (direction === \"right\") {\n            return this.attack(row, column + 1, gameboard);\n        }\n    };\n    Player.prototype.randomAttack = function (gameboard) {\n        var row = Math.floor(Math.random() * 10);\n        var column = Math.floor(Math.random() * 10);\n        while (!this.attack(row, column, gameboard) && !gameboard.isGameOver()) {\n            row = Math.floor(Math.random() * 10);\n            column = Math.floor(Math.random() * 10);\n        }\n        return true;\n    };\n    return Player;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/player.ts?");

/***/ }),

/***/ "./src/ship.ts":
/*!*********************!*\
  !*** ./src/ship.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Ship = /** @class */ (function () {\n    function Ship(length, name) {\n        if (name === void 0) { name = \"\"; }\n        this.length = length;\n        this.hits = [];\n        this.vertical = false;\n        this.row = null;\n        this.column = null;\n        this.name = name;\n    }\n    Ship.prototype.hit = function (position) {\n        this.hits.push(position);\n    };\n    Ship.prototype.isSunk = function () {\n        return this.hits.length === this.length;\n    };\n    return Ship;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/ship.ts?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _styles_board_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/board.scss */ \"./src/styles/board.scss\");\n/* harmony import */ var _styles_ships_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/ships.scss */ \"./src/styles/ships.scss\");\n\n\n\nconst render = (function () {\n  const shipField = document.querySelector(\".ships-select\");\n\n  function gameboard(gameboard, player, gameGoing) {\n    const boardField = player\n      ? document.querySelector(\".board-player\")\n      : document.querySelector(\".board-computer\");\n    boardField.innerHTML = \"\";\n    if (gameGoing) {\n      shipField.style.display = \"none\";\n      if (!player) boardField.style.display = \"grid\";\n    } else {\n      shipField.style.display = \"flex\";\n      if (!player) boardField.style.display = \"none\";\n    }\n\n    const space = document.createElement(\"div\");\n    boardField.append(space);\n    for (let i = 0; i < gameboard.size; i++) {\n      const columns = document.createElement(\"div\");\n      columns.classList.add(\"columns\");\n      columns.textContent = String.fromCharCode(65 + i);\n      boardField.append(columns);\n    }\n\n    let index = 0;\n    for (let i = 0; i < gameboard.size; i++) {\n      for (let j = 0; j < gameboard.size; j++) {\n        if (index % gameboard.size === 0) {\n          const rows = document.createElement(\"div\");\n          rows.classList.add(\"rows\");\n          rows.textContent = Math.ceil((index + 1) / 10);\n          boardField.append(rows);\n        }\n        boardField.append(createCell(gameboard, player, i, j, gameGoing));\n        index++;\n      }\n    }\n  }\n\n  function createCell(gameboard, player, row, column, gameGoing) {\n    const cell = document.createElement(\"div\");\n    const coord = gameboard.board[row][column];\n    cell.classList.add(\"cell\");\n    cell.dataset.row = row;\n    cell.dataset.column = column;\n    if (coord) {\n      if (coord === \"miss\") cell.classList.add(\"miss\");\n      // it is a ship\n      else {\n        if (player) cell.classList.add(\"ship\");\n        if (coord.hits.includes(`${row}, ${column}`)) cell.classList.add(\"hit\");\n        if (coord.isSunk()) cell.classList.add(\"sunk\");\n\n        if (player && !gameGoing) {\n          if (coord.row === row && coord.column === column) {\n            cell.classList.add(\"draggable\");\n            function drag(e) {\n              const newRow = parseInt(e.target.dataset.row);\n              const newColumn = parseInt(e.target.dataset.column);\n              _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].moveship(newRow, newColumn, coord);\n            }\n            cell.draggable = true;\n            cell.onclick = () => _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].rotateShip(coord);\n            cell.ondragstart = () => {\n              document\n                .querySelector(\".board-player\")\n                .addEventListener(\"drop\", drag);\n            };\n            cell.ondragend = () => {\n              document\n                .querySelector(\".board-player\")\n                .removeEventListener(\"drop\", drag);\n            };\n          } else cell.style.pointerEvents = \"none\";\n        }\n      }\n    } else {\n      // empty cell\n      cell.ondragstart = function () {\n        e.preventDefault();\n        return false;\n      };\n    }\n\n    if (player && !gameGoing) {\n      if (!coord) {\n        cell.ondragenter = (e) => {\n          e.preventDefault();\n          cell.style.backgroundColor = \"grey\";\n        };\n        cell.ondragleave = (e) => {\n          e.preventDefault();\n          cell.style.background = \"none\";\n        };\n        cell.ondragover = (e) => {\n          e.preventDefault();\n        };\n      }\n      cell.ondrop = (e) => {\n        e.preventDefault();\n        cell.style.background = \"none\";\n        const index = e.dataTransfer.getData(\"id\");\n        if (index)\n          _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].placeShips(\n            parseInt(e.target.dataset.row),\n            parseInt(e.target.dataset.column),\n            index\n          );\n        e.dataTransfer.setData(\"id\", null);\n      };\n    }\n\n    if (!player && gameGoing)\n      cell.onclick = () => _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].takeTurn(row, column);\n\n    return cell;\n  }\n\n  function shipsSelection(ships) {\n    shipField.innerHTML = \"\";\n    for (let i = 0; i < ships.length; i++) {\n      const shipItem = document.createElement(\"div\");\n      const shipBody = document.createElement(\"div\");\n      const shipName = document.createElement(\"div\");\n      shipItem.classList.add(\"ship-item\");\n      shipBody.classList.add(\"ship-body\");\n      shipName.classList.add(\"ship-name\");\n      shipBody.draggable = true;\n      for (let j = 0; j < ships[i].length; j++) {\n        const shipCell = document.createElement(\"div\");\n        shipCell.classList.add(\"ship\");\n        shipCell.classList.add(\"cell\");\n        shipBody.append(shipCell);\n      }\n      shipName.textContent = ships[i].name;\n      shipItem.append(shipName, shipBody);\n      shipField.append(shipItem);\n\n      shipBody.ondragstart = (e) => {\n        e.dataTransfer.setData(\"id\", i);\n        e.dataTransfer.setData(\"length\", ships[i].length);\n      };\n    }\n  }\n\n  function buttons(mode) {\n    const confirm = document.getElementById(\"button-start\");\n    const reset = document.getElementById(\"button-reset\");\n    const random = document.getElementById(\"button-random\");\n\n    confirm.disabled = true;\n    reset.disabled = true;\n    random.disabled = true;\n\n    confirm.style.display = \"inline\";\n    random.style.display = \"inline\";\n    reset.textContent = \"Reset\";\n\n    if (mode === \"placing\" || mode === \"ready\") {\n      reset.disabled = false;\n      reset.onclick = () => _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].resetBoard();\n      random.disabled = false;\n      random.onclick = () => _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].placeRandom();\n    }\n    if (mode === \"ready\") {\n      confirm.disabled = false;\n      confirm.onclick = () => _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].startGame();\n    }\n    if (mode === \"game\") {\n      confirm.style.display = \"none\";\n      random.style.display = \"none\";\n      reset.textContent = \"New game\";\n      reset.disabled = false;\n      reset.onclick = () => _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].resetGame();\n    }\n  }\n\n  function message(message) {\n    const messageField = document.querySelector(\".message\");\n    messageField.innerText = message;\n    messageField.classList.remove(\"victory\");\n    messageField.classList.remove(\"defeat\");\n    if (message === \"VICTORY!\") {\n      messageField.classList.add(\"victory\");\n    }\n    if (message === \"DEFEAT\") {\n      messageField.classList.add(\"defeat\");\n    }\n  }\n\n  function enableBoard(arg) {\n    const board = document.querySelector(\".board-computer\");\n    board.style.pointerEvents = arg;\n  }\n\n  return { gameboard, message, shipsSelection, buttons, enableBoard };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);\n\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.ts\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.ts\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./src/player.ts\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\n\n\nconst playGame = (function () {\n  let player, computer, playerBoard, computerBoard, gameOver;\n  let placementPhase = true;\n  const ships = [];\n  let carrier, battleship, destroyer, submarine, patrolBoat;\n  let computerMoving = false;\n  function initialize() {\n    player = new _player__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"player\");\n    computer = new _player__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"CPU\");\n    playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    computerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    gameOver = false;\n    placementPhase = true;\n\n    // ships array\n    carrier = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, \"Carrier\");\n    battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4, \"Battleship\");\n    destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3, \"Destroyer\");\n    submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3, \"Submarine\");\n    patrolBoat = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2, \"Patrol boat\");\n    ships.length = 0;\n    ships.push(carrier, battleship, destroyer, submarine, patrolBoat);\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].shipsSelection(ships);\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].buttons(\"placing\");\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true);\n    computerBoard.placeShipsRandomly();\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].message(\n      \"Drag a ship to the board \\n Then click the ship to rotate it\"\n    );\n  }\n  initialize();\n\n  function startGame() {\n    placementPhase = false;\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true, true);\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(computerBoard, false, true);\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].buttons(\"game\");\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].message(\"Make a move\");\n  }\n\n  function resetGame() {\n    initialize();\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(computerBoard, false);\n  }\n\n  function resetBoard() {\n    playerBoard.clear();\n    ships.length = 0;\n    ships.push(carrier, battleship, destroyer, submarine, patrolBoat);\n\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].buttons(\"placing\");\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true);\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].shipsSelection(ships);\n  }\n\n  function placeRandom() {\n    playerBoard.clear();\n    ships.length = 0;\n    playerBoard.placeShipsRandomly();\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].buttons(\"ready\");\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true);\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].shipsSelection(ships);\n  }\n\n  function deleteShip(ship) {\n    if (!placementPhase) return false;\n    playerBoard.deleteShip(ship);\n  }\n\n  function moveship(row, column, ship) {\n    if (!placementPhase) return false;\n    if (!playerBoard.placementPossible(ship, row, column, ship.vertical)) {\n      return false;\n    }\n    playerBoard.deleteShip(ship);\n    playerBoard.placeShip(ship, row, column, ship.vertical);\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true);\n\n    return true;\n  }\n\n  function placeShips(row, column, index) {\n    if (\n      ships.length === 0 ||\n      !playerBoard.placementPossible(ships[index], row, column, false)\n    )\n      return;\n\n    playerBoard.placeShip(ships[index], row, column, false);\n    ships.splice(index, 1);\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true);\n    if (ships.length === 0) {\n      _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].buttons(\"ready\");\n    }\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].shipsSelection(ships);\n  }\n\n  function rotateShip(ship) {\n    if (!placementPhase) return;\n    if (!playerBoard.rotateShip(ship)) {\n      _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true);\n      return;\n    }\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true);\n  }\n\n  async function takeTurn(row, column) {\n    if (gameOver || placementPhase) return;\n    if (!player.attack(row, column, computerBoard)) return;\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoard(\"none\");\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(computerBoard, false, true);\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].message(\"Computer makes a move...\");\n    await timeOut();\n    computer.attackCPU(playerBoard);\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true, true);\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].message(\"Your move\");\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoard(\"all\");\n    console.log(\n      `${computer.name} attacks: ${String.fromCharCode(\n        65 + computer.lastMove.column\n      )}${computer.lastMove.row + 1}`\n    );\n\n    if (computerBoard.isGameOver()) {\n      gameOver = true;\n      _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].message(\"VICTORY!\");\n    }\n    if (playerBoard.isGameOver()) {\n      gameOver = true;\n      _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].message(\"DEFEAT\");\n    }\n  }\n\n  function timeOut() {\n    return new Promise((resolve) => setTimeout(resolve, 750));\n  }\n\n  return {\n    takeTurn,\n    placeShips,\n    startGame,\n    resetBoard,\n    placeRandom,\n    resetGame,\n    rotateShip,\n    deleteShip,\n    moveship,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playGame);\n\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/index.scss */ \"./src/styles/index.scss\");\n\n\n_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;