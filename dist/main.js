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

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst render = function() {\n    const shipField = document.querySelector('.ships-select')\n    \n    function gameboard(gameboard, player, gameGoing) {\n        const boardField = player ?\n            document.querySelector('.board-player') :\n            document.querySelector('.board-computer')\n        boardField.innerHTML = ''\n        if (gameGoing) {\n            shipField.style.display = 'none'\n            if (!player) boardField.style.display = 'grid' \n           \n        } else {\n            shipField.style.display = 'flex'\n            if (!player) boardField.style.display = 'none'\n         \n        }\n        for (let i = 0; i < 10; i++) {\n            for (let j = 0; j < 10; j++) {\n                boardField.append(createCell(gameboard, player, i, j, gameGoing))   \n            }\n        }\n    }\n\n    function createCell(gameboard, player, row, column, gameGoing) {\n        const cell = document.createElement('div')  \n        const coord = gameboard.board[row][column]\n        cell.classList.add('cell')\n        cell.dataset.row = row\n        cell.dataset.column = column\n        if (coord) {\n            if (coord === 'miss') cell.classList.add('miss')\n            // it is a ship\n            else {\n                if (player) cell.classList.add('ship')\n                if (coord.hits.includes(`${row}, ${column}`)) cell.classList.add('hit')\n                if (coord.isSunk()) cell.classList.add('sunk')\n\n                if (player && !gameGoing) {\n                    if (coord.row === row && coord.column === column) {\n                        cell.classList.add('draggable')\n                            function drag(e) {\n                            const newRow = parseInt(e.target.dataset.row)\n                            const newColumn = parseInt(e.target.dataset.column)\n                            _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].moveship(newRow, newColumn, coord)\n                        }\n                        cell.draggable = true\n                        cell.onclick = () => _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].rotateShip(coord)\n                        cell.ondragstart = () => {\n                            document.querySelector(\".board-player\").addEventListener('drop', drag) \n                        }\n                        cell.ondragend = () => {\n                            document.querySelector(\".board-player\").removeEventListener('drop', drag)\n                        }    \n                    } else cell.style.pointerEvents = 'none'\n                } \n            }\n        } else {\n            // empty cell\n            cell.ondragstart = function() {\n                e.preventDefault()\n                return false;\n            };\n        }\n\n        if (player && !gameGoing) {\n            if (!coord) {\n                cell.ondragenter = (e) => {\n                    e.preventDefault()\n                    cell.style.backgroundColor = 'grey'\n                }\n                cell.ondragleave = (e) => {\n                    e.preventDefault()\n                    cell.style.background = 'none'   \n                }\n                cell.ondragover = (e) => {\n                    e.preventDefault()\n                }\n            }\n            cell.ondrop = (e) => {\n                e.preventDefault()\n                cell.style.background = 'none' \n                const index = e.dataTransfer.getData(\"id\")\n                if (index) _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].placeShips(parseInt(e.target.dataset.row), parseInt(e.target.dataset.column), index) \n                e.dataTransfer.setData('id', null)\n            }\n        }\n        \n        if (!player && gameGoing) cell.onclick = () => _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].takeTurn(row, column)\n          \n        return cell     \n    }\n\n    function shipsSelection(ships) {\n        shipField.innerHTML = ''\n        for (let i = 0; i < ships.length; i++) {\n            const shipItem = document.createElement('div')\n            const shipBody = document.createElement('div')\n            const shipName = document.createElement('div')\n            shipItem.classList.add('ship-item')\n            shipBody.classList.add('ship-body')\n            shipName.classList.add('ship-name')\n            shipBody.draggable = true\n            for (let j = 0; j < ships[i].length; j++) {\n                const shipCell = document.createElement('div')\n                shipCell.classList.add('ship')\n                shipCell.classList.add('cell')\n                shipBody.append(shipCell)\n            }\n            shipName.textContent = ships[i].name\n            shipItem.append(shipName, shipBody)\n            shipField.append(shipItem)\n            \n            shipBody.ondragstart = (e) => {\n                \n                e.dataTransfer.setData('id', i)\n                e.dataTransfer.setData('length', ships[i].length)\n\n            }\n\n        }\n        \n    }\n\n    function buttons(mode) {\n        const confirm = document.getElementById('button-start')\n        const reset = document.getElementById('button-reset')\n        const random = document.getElementById('button-random')\n       \n        confirm.disabled = true\n        reset.disabled = true\n        random.disabled = true\n\n        confirm.style.display = 'inline'\n        random.style.display = 'inline'\n        reset.textContent = 'Reset'\n        \n        if (mode === 'placing' || mode === 'ready') {\n            reset.disabled = false\n            reset.onclick = () => _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].resetBoard()\n            random.disabled = false\n            random.onclick = () => _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].placeRandom()\n        }\n        if (mode === 'ready') {\n            confirm.disabled = false\n            confirm.onclick = () => _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].startGame()\n        }\n        if (mode === 'game') {\n            confirm.style.display = 'none'\n            random.style.display = 'none'\n            reset.textContent = 'New game'\n            reset.disabled = false\n            reset.onclick = () => _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].resetGame()\n        }\n\n    }\n\n \n    function message(message) {\n        const messageField = document.querySelector('.message')\n        messageField.innerText = message\n    }\n\n    function enableBoard(arg) {\n        const board = document.querySelector('.board-computer')\n        board.style.pointerEvents = arg\n    }\n\n    return { gameboard, message, shipsSelection, buttons, enableBoard }\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\n\n\nconst playGame = function() {\n\n    let player, \n        computer, \n        playerBoard, \n        computerBoard,\n        gameOver\n    let placementPhase = true\n    const ships = []\n    let carrier, \n        battleship, \n        destroyer,\n        submarine,\n        patrolBoat\n    let computerMoving = false\n    function initialize() {\n        player = new _player__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('player')\n        computer = new _player__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('CPU')\n        playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\n        computerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\n        gameOver = false\n        placementPhase = true\n        \n        // ships array\n        carrier = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, 'Carrier')\n        battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4, 'Battleship')\n        destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3, 'Destroyer')\n        submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3, 'Submarine')\n        patrolBoat = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2, 'Patrol boat')\n        ships.length = 0\n        ships.push(carrier, battleship, destroyer, submarine, patrolBoat)\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].shipsSelection(ships)\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].buttons('placing')\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true)\n        computerBoard.placeShipsRandomly()\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].message(\"Drag a ship to the board \\n Then click the ship to rotate it\")\n    }\n    initialize()\n\n    \n    \n    \n    function startGame() {\n        placementPhase = false\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true, true)\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(computerBoard, false, true)\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].buttons('game')\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].message(\"Make a move\")\n    }\n\n    function resetGame() {\n        initialize()\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(computerBoard, false)\n    }\n\n    function resetBoard() {\n        playerBoard.clear()\n        ships.length = 0\n        ships.push(carrier, battleship, destroyer, submarine, patrolBoat)\n       \n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].buttons('placing')\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true)\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].shipsSelection(ships)\n    }\n\n    function placeRandom() {\n        playerBoard.clear()\n        ships.length = 0\n        playerBoard.placeShipsRandomly()\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].buttons('ready')\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true)\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].shipsSelection(ships)\n    }\n\n    function deleteShip(ship) {\n        if (!placementPhase) return false\n        playerBoard.deleteShip(ship)\n    }\n\n    function moveship(row, column, ship) {\n        if (!placementPhase) return false\n        if (!playerBoard.placementPossible(ship, row, column, ship.vertical)) {\n            return false\n        } \n        playerBoard.deleteShip(ship)\n        playerBoard.placeShip(ship, row, column, ship.vertical)\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true)\n        console.log('move ship')\n        return true\n        \n      \n        \n    }\n\n    function placeShips(row, column, index) {\n        if (ships.length === 0 || !playerBoard.placementPossible(ships[index], row, column, false)) return\n        console.log(ships[index])\n        playerBoard.placeShip(ships[index], row, column, false)\n        ships.splice(index, 1)\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true)\n        if (ships.length === 0) {\n            _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].buttons('ready')\n        }\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].shipsSelection(ships)\n        console.log('placeship')\n    }\n\n    function rotateShip(ship) {\n        if (!placementPhase) return\n        if (!playerBoard.rotateShip(ship)) {\n            _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true)\n            return  \n        }\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true)\n      \n        \n        \n    }\n\n    async function takeTurn(row, column) {\n        if (gameOver || placementPhase) return\n        if (!player.attack(row, column, computerBoard)) return \n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoard('none')\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(computerBoard, false, true)\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].message(\"Computer makes a move...\")\n        await timeOut()\n        computer.attackCPU(playerBoard)\n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].gameboard(playerBoard, true, true) \n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].message(\"Your move\") \n        _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoard('all')\n        console.log(computer.name, 'attacks:', computer.lastMove.row, computer.lastMove.column)\n        \n        if (computerBoard.isGameOver()) {\n            gameOver = true\n            _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].message(\"VICTORY!\")\n        }\n        if (playerBoard.isGameOver()) {\n            gameOver = true\n            _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].message(\"DEFEAT\")\n        }\n       \n    }\n\n    function timeOut() {   \n        return new Promise((resolve) => setTimeout(resolve, 750))\n      }\n\n    \n    return { takeTurn, placeShips, startGame, resetBoard, placeRandom, resetGame, rotateShip, deleteShip, moveship}\n}()\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playGame);\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nconst SIZE = 10\n\nclass Gameboard {\n    \n    constructor() {\n        this.board = []\n        for (let i = 0; i < SIZE; i++) {\n            this.board[i] = []\n            for (let j = 0; j < SIZE; j++) {\n                this.board[i][j] = null\n            }\n        }\n    }\n\n    clear() {\n        this.board = []\n        for (let i = 0; i < SIZE; i++) {\n            this.board[i] = []\n            for (let j = 0; j < SIZE; j++) {\n                this.board[i][j] = null\n            }\n        }\n    }\n\n    placeShip(ship, row, column, vertical) {\n        if (!this.placementPossible(ship, row, column, vertical)) {\n            return false\n        }\n        if (vertical) {\n            for (let i = 0; i < ship.length; i++) {\n                this.board[row + i][column] = ship\n            }\n            ship.vertical = true\n        } else {\n            for (let i = 0; i < ship.length; i++) {\n                this.board[row][column + i] = ship\n            }\n            ship.vertical = false\n        }\n        \n        ship.row = row\n        ship.column = column   \n        return true\n    }\n\n    deleteShip(ship) {\n        if (ship.vertical) {\n            for (let i = 0; i < ship.length; i++) {\n                this.board[ship.row + i][ship.column] = null\n            }\n            \n        }\n        else {\n            for (let i = 0; i < ship.length; i++) {\n                this.board[ship.row][ship.column + i] = null\n            }\n        }\n       \n    }\n\n    rotateShip(ship) {\n        if (ship.vertical) {\n            for (let i = 0; i < ship.length; i++) {\n                this.board[ship.row + i][ship.column] = null\n            }\n            if (!this.placementPossible(ship, ship.row, ship.column, false)) {\n                for (let i = 0; i < ship.length; i++) {\n                    this.board[ship.row + i][ship.column] = ship\n                }\n                \n                return false\n            }\n\n            this.placeShip(ship, ship.row, ship.column, false)\n        }\n        else {\n            for (let i = 0; i < ship.length; i++) {\n                this.board[ship.row][ship.column + i] = null\n            }\n            if (!this.placementPossible(ship, ship.row, ship.column, true)) {\n                for (let i = 0; i < ship.length; i++) {\n                    this.board[ship.row][ship.column + i] = ship\n                }\n                return false\n            }\n\n            this.placeShip(ship, ship.row, ship.column, true)\n        }\n      \n        return true\n    }\n\n    receiveAttack(row, column) {\n        if (row < 0 || row > SIZE - 1 || column < 0 || column > SIZE - 1) {\n            return false\n        }\n        const cell = this.board[row][column]\n        \n        if (!cell) this.board[row][column] = 'miss'\n        else if (cell === 'miss') {\n            return false\n        } else {\n            if (cell.hits.includes(`${row}, ${column}`)) return false\n            else cell.hit(`${row}, ${column}`)\n\n            // if ship is sunk, fill all neighbors with misses\n            if (cell.isSunk()) {\n                if (cell.vertical) {\n                    let start = 0\n                    let end = cell.length\n                    if (cell.row !== 0) {\n                        start = -1\n                        this.board[cell.row - 1][cell.column] = 'miss'  \n                    }\n                    if (cell.row + cell.length !== SIZE) {\n                        end = cell.length + 1\n                        this.board[cell.row + cell.length][cell.column] = 'miss' \n                    }\n                    for (let i = start; i < end; i++) {\n                        if (cell.column !== 0) this.board[cell.row + i][cell.column - 1] = 'miss'\n                        if (cell.column !== SIZE - 1) this.board[cell.row + i][cell.column + 1] = 'miss'\n                    }\n                } else {\n                    let start = 0\n                    let end = cell.length\n                    if (cell.column !== 0) {\n                        start = -1\n                        this.board[cell.row][cell.column - 1] = 'miss'  \n                    }\n                    if (cell.column + cell.length !== SIZE) {\n                        end = cell.length + 1\n                        this.board[cell.row][cell.column + cell.length] = 'miss' \n                    }\n                    for (let i = start; i < end; i++) {\n                        if (cell.row !== 0) this.board[cell.row - 1][cell.column + i] = 'miss'\n                        if (cell.row !== SIZE - 1) this.board[cell.row + 1][cell.column + i] = 'miss'\n                    }\n                }\n            }\n        } \n        return true\n    }\n\n\n    placementPossible(ship, row, column, vertical) {\n        if (row < 0 || row > SIZE - 1 || column < 0 || column > SIZE - 1) {\n            return false\n        }\n\n        if (vertical) {\n            if (row + ship.length > SIZE ) return false \n            for (let i = 0; i < ship.length; i++) {\n                if (this.board[row + i][column] && this.board[row + i][column] !== ship) return false\n            }\n\n            let start = -1\n            let end = ship.length + 1\n            if (row === 0) start = 0\n            else if (row + ship.length === SIZE) end = ship.length\n\n            for ( let i = start; i < end; i++) {\n                if (column === 0) {\n                    if ((this.board[row + i][column + 1] && this.board[row + i][column + 1] !== ship) || \n                        (this.board[row + i][column] && this.board[row + i][column] !== ship)) return false    \n                } else if (column === SIZE - 1) {\n                    if ((this.board[row + i][column - 1] && this.board[row + i][column - 1] !== ship ) || \n                        (this.board[row + i][column] && this.board[row + i][column] !== ship)) return false  \n                } else {\n                    if ((this.board[row + i][column + 1] && this.board[row + i][column + 1] !== ship)|| \n                        (this.board[row + i][column - 1] && this.board[row + i][column - 1] !== ship) || \n                        (this.board[row + i][column] && this.board[row + i][column] !== ship)) return false  \n                }\n                \n            }\n            \n        } else {\n            if (column + ship.length > SIZE) return false\n            for (let i = 0; i < ship.length; i++) {\n                if (this.board[row][column + i] && this.board[row][column + i] !== ship) return false\n            }\n\n            let start = -1\n            let end = ship.length + 1\n            if (column === 0) start = 0\n            else if (column + ship.length === SIZE) end = ship.length\n\n            for ( let i = start; i < end; i++) {\n                if (row === 0) {\n                    if ((this.board[row + 1][column + i] && this.board[row + 1][column + i] !== ship)||\n                        (this.board[row][column + i] && this.board[row][column + i] !== ship)) return false    \n                } else if (row === SIZE - 1) {\n                    if ((this.board[row - 1][column + i] && this.board[row - 1][column + i] !== ship )||\n                        (this.board[row][column + i] && this.board[row][column + i] !== ship)) return false  \n                } else {\n                    if ((this.board[row + 1][column + i] && this.board[row + 1][column + i] !== ship)||\n                        (this.board[row - 1][column + i] && this.board[row - 1][column + i] !== ship)|| \n                        (this.board[row][column + i] && this.board[row][column + i] !== ship)) return false  \n                }\n                \n            }\n        }\n        return true      \n    }\n\n    isGameOver() {\n        for (let i = 0; i < SIZE; i++) {\n            for (let j = 0; j < SIZE; j++) {\n                if ((this.board[i][j]) && this.board[i][j] !== 'miss') {\n                    if (!this.board[i][j].isSunk()) return false\n                }\n            }\n        }\n        return true\n    }\n\n    placeShipsRandomly() {  \n        const ships = []\n        const carrier = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5)\n        const battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4)\n        const destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3)\n        const submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3)\n        const patrolBoat = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2)\n        ships.push(carrier, battleship, destroyer, submarine, patrolBoat)\n    \n        let succesfulPlacements = 0\n    \n        while (succesfulPlacements < 5) {\n          const row = Math.floor(Math.random() * 10)\n          const column = Math.floor(Math.random() * 10)\n          const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false\n    \n          if (this.placeShip(ships[succesfulPlacements], row, column, isVertical))\n            succesfulPlacements++\n        }\n        return ships\n      }\n    \n\n}\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

eval("/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\n_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\nclass Player {\n    constructor(name) {\n        this.name = name\n        this.lastHit = {\n            row: null,\n            column: null,\n            ship: null\n        }\n        this.lastMove = {\n            row: null,\n            column: null,\n            miss: null\n        }\n        this.hits = []\n        this.directions = ['up', 'down', 'left', 'right']\n    }\n\n    isHit(row, column, gameboard) {\n        if (gameboard.board[row][column] === 'miss' || !gameboard.board[row][column]) return false\n        if (gameboard.board[row][column].hits.includes(`${row}, ${column}`)) return true\n        return false\n    }\n\n    attack(row, column, gameboard) {\n        if (!gameboard.receiveAttack(row, column)) return false\n        else {\n            if (this.isHit(row, column, gameboard)) {\n                this.lastHit = {row, column, ship: gameboard.board[row][column]}  \n                this.lastMove = {row, column, miss: false}\n                this.hits.push(this.lastHit)\n            } else this.lastMove = {row, column, miss: true}\n            return true\n        }\n    }\n\n    attackCPU(gameboard) {\n        if(gameboard.isGameOver()) return false\n        if (this.lastHit.ship) {\n            // if we just sunk a ship, attack at random place\n            if (this.lastHit.ship.isSunk()) {\n                this.hits = []\n                this.randomAttack(gameboard)\n                return true\n            }\n            if (this.hits.length === 1) {\n                // 1 of 4 directions\n                if (this.directions.length === 0) {\n                    this.randomAttack(gameboard)\n                    this.directions = ['up', 'down', 'left', 'right']\n                    return true\n                }\n                let currentDirection = this.directions[Math.floor(Math.random())*this.directions.length]\n                this.directions.splice(this.directions.indexOf(currentDirection), 1)\n                if (!this.attackLine(this.lastHit.row, this.lastHit.column, currentDirection, gameboard)) {\n                    this.attackCPU(gameboard)\n                } \n                this.directions = ['up', 'down', 'left', 'right']\n                return true\n            } else {\n                \n                if (this.hits[0].row === this.hits[this.hits.length - 1].row) {\n                    // ship is horizontal\n                    for (let i = 0; i < this.hits.length; i ++) {\n                        if (this.attack(this.hits[i].row, this.hits[i].column - 1, gameboard)) return true\n                        if (this.attack(this.hits[i].row, this.hits[i].column + 1, gameboard)) return true\n                    }\n                } else if (this.hits[0].column === this.hits[this.hits.length - 1].column) {\n                    // ship is vertical\n                    for (let i = 0; i < this.hits.length; i ++) {\n                        if (this.attack(this.hits[i].row - 1, this.hits[i].column, gameboard)) return true\n                        if (this.attack(this.hits[i].row + 1, this.hits[i].column, gameboard)) return true\n                    }\n                }\n            }\n        } else {\n            this.randomAttack(gameboard)\n            return true\n        }\n    }\n\n\n    attackLine(row, column, direction, gameboard) {\n        if (direction === 'up') {\n            return this.attack(row - 1, column, gameboard)\n        }\n        if (direction === 'down') {\n            return this.attack(row + 1, column, gameboard)\n        }\n        if (direction === 'left') {\n            return this.attack(row, column - 1, gameboard)\n        }\n        if (direction === 'rigth') {\n            return this.attack(row , column + 1, gameboard)\n        }\n    }\n\n    randomAttack(gameboard) {\n\n        let row = Math.floor(Math.random()*10)\n        let column = Math.floor(Math.random()*10)\n\n        while (!this.attack(row, column, gameboard) && !gameboard.isGameOver()) {\n            row = Math.floor(Math.random()*10)\n            column = Math.floor(Math.random()*10) \n        }\n\n        return true\n        \n    }\n}\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n    constructor(length, name = '') {\n        this.length = length\n        this.hits = []\n        this.vertical = false\n        this.row = null\n        this.column = null\n        this.name = name\n    }\n\n    hit(position) {\n        // if (this.hits.includes(position) || position < 0 || position >= this.length)\n        // return\n        this.hits.push(position)\n    }\n\n    isSunk() {\n        return this.hits.length === this.length\n    }\n}\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;