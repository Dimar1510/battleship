import Ship from "./ship";
import Gameboard from "./gameboard";
import Player from "./player";
import render from "./dom";

const playGame = function() {

    let player, 
        computer, 
        playerBoard, 
        computerBoard,
        gameOver,
        placementPhase
    const ships = []
    let carrier, 
        battleship, 
        destroyer,
        submarine,
        patrolBoat

    function initialize() {
        player = new Player('player')
        computer = new Player('CPU')
        playerBoard = new Gameboard()
        computerBoard = new Gameboard()
        gameOver = false
        placementPhase = true
        
        // ships array
        carrier = new Ship(5, 'Carrier')
        battleship = new Ship(4, 'Battleship')
        destroyer = new Ship(3, 'Destroyer')
        submarine = new Ship(3, 'Submarine')
        patrolBoat = new Ship(2, 'Patrol boat')
        ships.length = 0
        ships.push(carrier, battleship, destroyer, submarine, patrolBoat)
        render.shipsSelection(ships)
        render.buttons('placing')
        render.gameboard(playerBoard, true)
        computerBoard.placeShipsRandomly()
    }
    initialize()

    
    
    
    function startGame() {
        placementPhase = false
        render.gameboard(computerBoard, false)
        render.buttons('game')
    }

    function resetGame() {
        initialize()
        render.gameboard(computerBoard, false, true)
    }

    function resetBoard() {
        playerBoard.clear()
        ships.length = 0
        ships.push(carrier, battleship, destroyer, submarine, patrolBoat)
        console.log(ships)
        render.buttons('placing')
        render.gameboard(playerBoard, true)
        render.shipsSelection(ships)
    }

    function placeRandom() {
        playerBoard.clear()
        ships.length = 0
        playerBoard.placeShipsRandomly()
        render.buttons('ready')
        render.gameboard(playerBoard, true)
        render.shipsSelection(ships)
    }

    function placeShips(row, column, index) {
        if (ships.length === 0 || !playerBoard.placeShip(ships[index], row, column, false)) return
        ships.shift()
        render.gameboard(playerBoard, true)
        if (ships.length === 0) {
            render.buttons('ready')
        }
        render.shipsSelection(ships)
    }

    function rotateShip(ship) {
        if (!placementPhase) return
        playerBoard.rotateShip(ship)
        render.gameboard(playerBoard, true)
        
    }

    function takeTurn(row, column) {
        if (gameOver || placementPhase) return
        player.attack(row, column, computerBoard)
        render.gameboard(computerBoard, false)
        console.log(player.name, 'attacks:', row, column)
        computer.attackCPU(playerBoard)
        render.gameboard(playerBoard, true)
        console.log(computer.name, 'attacks:', computer.lastMove.row, computer.lastMove.column)
        
        if (computerBoard.isGameOver()) {
            gameOver = true
            render.gameOver(player.name)
        }
        if (playerBoard.isGameOver()) {
            gameOver = true
            render.gameOver(computer.name)
        }
    }

    
    return { takeTurn, placeShips, startGame, resetBoard, placeRandom, resetGame, rotateShip }
}()

export default playGame