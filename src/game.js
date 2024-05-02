import Ship from "./ship";
import Gameboard from "./gameboard";
import Player from "./player";
import render from "./dom";

const playGame = function() {

    let player, 
        computer, 
        playerBoard, 
        computerBoard,
        gameOver
    let placementPhase = true
    const ships = []
    let carrier, 
        battleship, 
        destroyer,
        submarine,
        patrolBoat
    let computerMoving = false
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
        render.message("Drag a ship to the board \n Then click the ship to rotate it")
    }
    initialize()

    
    
    
    function startGame() {
        placementPhase = false
        render.gameboard(playerBoard, true, true)
        render.gameboard(computerBoard, false, true)
        render.buttons('game')
        render.message("Make a move")
    }

    function resetGame() {
        initialize()
        render.gameboard(computerBoard, false)
    }

    function resetBoard() {
        playerBoard.clear()
        ships.length = 0
        ships.push(carrier, battleship, destroyer, submarine, patrolBoat)
       
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

    function deleteShip(ship) {
        if (!placementPhase) return false
        playerBoard.deleteShip(ship)
    }

    function moveship(row, column, ship) {
        if (!placementPhase) return false
        if (!playerBoard.placementPossible(ship, row, column, ship.vertical)) {
            return false
        } 
        playerBoard.deleteShip(ship)
        playerBoard.placeShip(ship, row, column, ship.vertical)
        render.gameboard(playerBoard, true)
        
        return true
        
      
        
    }

    function placeShips(row, column, index) {
        if (ships.length === 0 || !playerBoard.placementPossible(ships[index], row, column, false)) return
     
        playerBoard.placeShip(ships[index], row, column, false)
        ships.splice(index, 1)
        render.gameboard(playerBoard, true)
        if (ships.length === 0) {
            render.buttons('ready')
        }
        render.shipsSelection(ships)
        
    }

    function rotateShip(ship) {
        if (!placementPhase) return
        if (!playerBoard.rotateShip(ship)) {
            render.gameboard(playerBoard, true)
            return  
        }
        render.gameboard(playerBoard, true)
      
        
        
    }

    async function takeTurn(row, column) {
        if (gameOver || placementPhase) return
        if (!player.attack(row, column, computerBoard)) return 
        render.enableBoard('none')
        render.gameboard(computerBoard, false, true)
        render.message("Computer makes a move...")
        await timeOut()
        computer.attackCPU(playerBoard)
        render.gameboard(playerBoard, true, true) 
        render.message("Your move") 
        render.enableBoard('all')
        console.log(`${computer.name} attacks: ${String.fromCharCode(65 + computer.lastMove.column)}${computer.lastMove.row + 1}`)
        
        if (computerBoard.isGameOver()) {
            gameOver = true
            render.message("VICTORY!")
        }
        if (playerBoard.isGameOver()) {
            gameOver = true
            render.message("DEFEAT")
        }
       
    }

    function timeOut() {   
        return new Promise((resolve) => setTimeout(resolve, 750))
      }

    
    return { takeTurn, placeShips, startGame, resetBoard, placeRandom, resetGame, rotateShip, deleteShip, moveship}
}()

export default playGame