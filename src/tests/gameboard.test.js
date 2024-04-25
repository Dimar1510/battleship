import Gameboard from "../gameboard";
import Ship from "../ship";


let board
let testBoard = []
for (let i = 0; i < 10; i++) {
    testBoard[i] = []
    for (let j = 0; j < 10; j++) {
        testBoard[i][j] = null
    }
}

beforeEach(() => {
    board = new Gameboard()
})

test('places ship', () => {
    const smallShip = new Ship(3)
    board.placeShip(smallShip, 6, 4, true)
    testBoard[6][4] = smallShip
    testBoard[7][4] = smallShip
    testBoard[8][4] = smallShip
    expect(testBoard).toEqual(board.board)
});

test('unable to place ship near other ship', () => {
    const smallShip = new Ship(3)
    board.placeShip(smallShip, 6, 4, true)
    expect(board.placeShip(smallShip, 6, 5, false))
})

test('unable to place ship outside the board', () => {
    const largeShip = new Ship(5)
    expect(board.placeShip(largeShip, 9, 9, false)).toBeFalsy
})

test('ship is hit', () => {
    const largeShip = new Ship(5)
    board.placeShip(largeShip, 5, 4, false)
    board.receiveAttack(5, 5)
    board.receiveAttack(5, 6)
    expect(largeShip.hits.length).toBe(2)
})

test('ship is sunk', () => {
    const largeShip = new Ship(5)
    board.placeShip(largeShip, 5, 4, false)
    board.receiveAttack(5, 5)
    board.receiveAttack(5, 6)
    board.receiveAttack(5, 7)
    board.receiveAttack(5, 8)
    board.receiveAttack(5, 4)
    expect(largeShip.hits.sunk).toBeTruthy
})

test('game is over', () => {
    const largeShip = new Ship(5)
   
    board.placeShip(largeShip, 5, 4, false)
    board.receiveAttack(1, 1)
    board.receiveAttack(5, 5)
    board.receiveAttack(5, 6)
    board.receiveAttack(5, 7)
    board.receiveAttack(5, 8)
    board.receiveAttack(5, 4)
    
    expect(board.isGameOver()).toBe(true)
})

test('places ships randomly', () => {
    board.placeShipsRandomly()
    let nullLength = 0
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++){
            if (!board.board[i][j]) nullLength++
        }
    }
    expect(nullLength).toBe(83);
})


