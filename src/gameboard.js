import Ship from "./ship"

const SIZE = 10

export default class Gameboard {
    
    constructor() {
        this.board = []
        for (let i = 0; i < SIZE; i++) {
            this.board[i] = []
            for (let j = 0; j < SIZE; j++) {
                this.board[i][j] = null
            }
        }
    }

    clear() {
        this.board = []
        for (let i = 0; i < SIZE; i++) {
            this.board[i] = []
            for (let j = 0; j < SIZE; j++) {
                this.board[i][j] = null
            }
        }
    }

    placeShip(ship, row, column, vertical) {
        if (!this.placementPossible(ship, row, column, vertical)) {
            return false
        }
        if (vertical) {
            for (let i = 0; i < ship.length; i++) {
                this.board[row + i][column] = ship
            }
            ship.vertical = true
        } else {
            for (let i = 0; i < ship.length; i++) {
                this.board[row][column + i] = ship
            }
            ship.vertical = false
        }
        
        ship.row = row
        ship.column = column   
        return true
    }

    deleteShip(ship) {
        if (ship.vertical) {
            for (let i = 0; i < ship.length; i++) {
                this.board[ship.row + i][ship.column] = null
            }
            
        }
        else {
            for (let i = 0; i < ship.length; i++) {
                this.board[ship.row][ship.column + i] = null
            }
        }
       
    }

    rotateShip(ship) {
        if (ship.vertical) {
            for (let i = 0; i < ship.length; i++) {
                this.board[ship.row + i][ship.column] = null
            }
            if (!this.placementPossible(ship, ship.row, ship.column, false)) {
                for (let i = 0; i < ship.length; i++) {
                    this.board[ship.row + i][ship.column] = ship
                }
                
                return false
            }

            this.placeShip(ship, ship.row, ship.column, false)
        }
        else {
            for (let i = 0; i < ship.length; i++) {
                this.board[ship.row][ship.column + i] = null
            }
            if (!this.placementPossible(ship, ship.row, ship.column, true)) {
                for (let i = 0; i < ship.length; i++) {
                    this.board[ship.row][ship.column + i] = ship
                }
                return false
            }

            this.placeShip(ship, ship.row, ship.column, true)
        }
      
        return true
    }

    receiveAttack(row, column) {
        if (row < 0 || row > SIZE - 1 || column < 0 || column > SIZE - 1) {
            return false
        }
        const cell = this.board[row][column]
        
        if (!cell) this.board[row][column] = 'miss'
        else if (cell === 'miss') {
            return false
        } else {
            if (cell.hits.includes(`${row}, ${column}`)) return false
            else cell.hit(`${row}, ${column}`)

            // if ship is sunk, fill all neighbors with misses
            if (cell.isSunk()) {
                if (cell.vertical) {
                    let start = 0
                    let end = cell.length
                    if (cell.row !== 0) {
                        start = -1
                        this.board[cell.row - 1][cell.column] = 'miss'  
                    }
                    if (cell.row + cell.length !== SIZE) {
                        end = cell.length + 1
                        this.board[cell.row + cell.length][cell.column] = 'miss' 
                    }
                    for (let i = start; i < end; i++) {
                        if (cell.column !== 0) this.board[cell.row + i][cell.column - 1] = 'miss'
                        if (cell.column !== SIZE - 1) this.board[cell.row + i][cell.column + 1] = 'miss'
                    }
                } else {
                    let start = 0
                    let end = cell.length
                    if (cell.column !== 0) {
                        start = -1
                        this.board[cell.row][cell.column - 1] = 'miss'  
                    }
                    if (cell.column + cell.length !== SIZE) {
                        end = cell.length + 1
                        this.board[cell.row][cell.column + cell.length] = 'miss' 
                    }
                    for (let i = start; i < end; i++) {
                        if (cell.row !== 0) this.board[cell.row - 1][cell.column + i] = 'miss'
                        if (cell.row !== SIZE - 1) this.board[cell.row + 1][cell.column + i] = 'miss'
                    }
                }
            }
        } 
        return true
    }

    placementPossible(ship, row, column, vertical) {
        if (row < 0 || row > SIZE - 1 || column < 0 || column > SIZE - 1) {
            return false
        }

        if (vertical) {
            if (row + ship.length > SIZE ) return false 
            for (let i = 0; i < ship.length; i++) {
                if (this.board[row + i][column]) return false
            }

            let start = -1
            let end = ship.length + 1
            if (row === 0) start = 0
            else if (row + ship.length === SIZE) end = ship.length

            for ( let i = start; i < end; i++) {
                if (column === 0) {
                    if (this.board[row + i][column + 1] || this.board[row + i][column]) return false    
                } else if (column === SIZE - 1) {
                    if (this.board[row + i][column - 1] || this.board[row + i][column]) return false  
                } else {
                    if (this.board[row + i][column + 1] || this.board[row + i][column - 1] || this.board[row + i][column]) return false  
                }
                
            }
            
        } else {
            if (column + ship.length > SIZE) return false
            for (let i = 0; i < ship.length; i++) {
                if (this.board[row][column + i]) return false
            }

            let start = -1
            let end = ship.length + 1
            if (column === 0) start = 0
            else if (column + ship.length === SIZE) end = ship.length

            for ( let i = start; i < end; i++) {
                if (row === 0) {
                    if (this.board[row + 1][column + i] || this.board[row][column + i]) return false    
                } else if (row === SIZE - 1) {
                    if (this.board[row - 1][column + i] || this.board[row][column + i]) return false  
                } else {
                    if (this.board[row + 1][column + i] || this.board[row - 1][column + i] || this.board[row][column + i]) return false  
                }
                
            }
        }
 
        return true      
    }

    isGameOver() {
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                if ((this.board[i][j]) && this.board[i][j] !== 'miss') {
                    if (!this.board[i][j].isSunk()) return false
                }
            }
        }
        return true
    }

    placeShipsRandomly() {  
        const ships = []
        const carrier = new Ship(5)
        const battleship = new Ship(4)
        const destroyer = new Ship(3)
        const submarine = new Ship(3)
        const patrolBoat = new Ship(2)
        ships.push(carrier, battleship, destroyer, submarine, patrolBoat)
    
        let succesfulPlacements = 0
    
        while (succesfulPlacements < 5) {
          const row = Math.floor(Math.random() * 10)
          const column = Math.floor(Math.random() * 10)
          const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false
    
          if (this.placeShip(ships[succesfulPlacements], row, column, isVertical))
            succesfulPlacements++
        }
        return ships
      }
    

}