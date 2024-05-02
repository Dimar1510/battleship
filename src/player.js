export default class Player {
    constructor(name) {
        this.name = name
        this.lastHit = {
            row: null,
            column: null,
            ship: null
        }
        this.lastMove = {
            row: null,
            column: null,
            miss: null
        }
        this.hits = []
        this.directions = ['up', 'down', 'left', 'right']
    }

    isHit(row, column, gameboard) {
        if (gameboard.board[row][column] === 'miss' || !gameboard.board[row][column]) return false
        if (gameboard.board[row][column].hits.includes(`${row}, ${column}`)) return true
        return false
    }

    attack(row, column, gameboard) {
        if (!gameboard.receiveAttack(row, column)) return false
        else {
            if (this.isHit(row, column, gameboard)) {
                this.lastHit = {row, column, ship: gameboard.board[row][column]}  
                this.lastMove = {row, column, miss: false}
                this.hits.push(this.lastHit)
            } else this.lastMove = {row, column, miss: true}
            return true
        }
    }

    attackCPU(gameboard) {
        if(gameboard.isGameOver()) return false

        if (this.lastHit.ship) {
            // if we just sunk a ship, attack at random place
            if (this.lastHit.ship.isSunk()) {
                this.hits = []
                this.directions = ['up', 'down', 'left', 'right']
                this.randomAttack(gameboard)
                return true
            }
            if (this.hits.length === 1) {
                // 1 of 4 directions
                
                if (this.directions.length === 0) {
                    this.randomAttack(gameboard)
                    this.hits = []
                    this.directions = ['up', 'down', 'left', 'right']
                    return true
                }
                let currentDirection = this.directions[Math.floor(Math.random()*this.directions.length)]
            

                if (!this.attackLine(this.lastHit.row, this.lastHit.column, currentDirection, gameboard)) {
                    this.directions.splice(this.directions.indexOf(currentDirection), 1)
                    this.attackCPU(gameboard)
                } 
                this.directions = ['up', 'down', 'left', 'right']
                return true
            } else {
                
                if (this.hits[0].row === this.hits[this.hits.length - 1].row) {
                    // ship is horizontal
                    for (let i = 0; i < this.hits.length; i ++) {
                        if (this.attack(this.hits[i].row, this.hits[i].column - 1, gameboard)) return true
                        if (this.attack(this.hits[i].row, this.hits[i].column + 1, gameboard)) return true
                    }
                } else if (this.hits[0].column === this.hits[this.hits.length - 1].column) {
                    // ship is vertical
                    for (let i = 0; i < this.hits.length; i ++) {
                        if (this.attack(this.hits[i].row - 1, this.hits[i].column, gameboard)) return true
                        if (this.attack(this.hits[i].row + 1, this.hits[i].column, gameboard)) return true
                    }
                }
            }
        } else {
            this.randomAttack(gameboard)
            return true
        }
    }


    attackLine(row, column, direction, gameboard) {
        if (direction === 'up') {
            return this.attack(row - 1, column, gameboard)
        }
        if (direction === 'down') {
            return this.attack(row + 1, column, gameboard)
        }
        if (direction === 'left') {
            return this.attack(row, column - 1, gameboard)
        }
        if (direction === 'right') {
            return this.attack(row , column + 1, gameboard)
        }
    }

    randomAttack(gameboard) {

        let row = Math.floor(Math.random()*10)
        let column = Math.floor(Math.random()*10)

        while (!this.attack(row, column, gameboard) && !gameboard.isGameOver()) {
            row = Math.floor(Math.random()*10)
            column = Math.floor(Math.random()*10) 
        }

        return true
        
    }
}