import playGame from "./game";

const render = function() {
    const shipField = document.querySelector('.ships-select')
    
    function gameboard(gameboard, player, newgame) {
        const boardField = player ?
            document.querySelector('.board-player') :
            document.querySelector('.board-computer')
        boardField.innerHTML = ''
        if (newgame) {
            shipField.style.display = 'flex'
            boardField.style.display = 'none' 
            return
        } 
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                boardField.append(createCell(gameboard, player, i, j))   
            }
        }
        if (!player) {
            shipField.style.display = 'none'
            boardField.style.display = 'grid'
        }

    }

    function createCell(gameboard, player, row, column) {
        const cell = document.createElement('div')    
        const coord = gameboard.board[row][column]
        cell.classList.add('cell')
        cell.dataset.row = row
        cell.dataset.column = column
        if (coord) {
            if (coord === 'miss') cell.classList.add('miss')
            // it is a ship
            else {
                if (player) cell.classList.add('ship')
                if (coord.hits.includes(`${row}, ${column}`)) cell.classList.add('hit')
                if (coord.isSunk()) cell.classList.add('sunk')
                if (player) {
                    cell.draggable = true
                    cell.onclick = () => playGame.rotateShip(coord)
                    cell.ondragstart = () => {
                        playGame.deleteShip(coord)    
                    }
                    cell.ondrag = () => {
                        document.querySelector("html").ondrop = (e) => {
                            const newRow = parseInt(e.target.dataset.row)
                            const newColumn = parseInt(e.target.dataset.column)
                            
                            if (!playGame.moveship(newRow, newColumn, coord)) {
                                playGame.moveship(row, column, coord)
                            } 
                        }
                    }

                } else {
                    cell.onclick = () => playGame.takeTurn(row, column)
                }
            }
        } else {
            // empty cell
            cell.ondragstart = function() {
                return false;
            };
        }

        if (player) {
            if (!coord) {
                cell.ondragenter = (e) => {
                    e.preventDefault()
                    cell.style.backgroundColor = 'blue'
                }
                cell.ondragleave = (e) => {
                    e.preventDefault()
                    cell.style.backgroundColor = 'gray'   
                }
                cell.ondragover = (e) => {
                    e.preventDefault()
                }
            }
            cell.ondrop = (e) => {
                e.preventDefault()
                cell.style.backgroundColor = 'gray'   
            }
        }   
        return cell     
    }

    function shipsSelection(ships) {
        shipField.innerHTML = ''
        for (let i = 0; i < ships.length; i++) {
            const shipItem = document.createElement('div')
            const shipBody = document.createElement('div')
            const shipName = document.createElement('div')
            shipItem.classList.add('ship-item')
            shipBody.classList.add('ship-body')
            shipName.classList.add('ship-name')
            shipBody.draggable = true
            for (let j = 0; j < ships[i].length; j++) {
                const shipCell = document.createElement('div')
                shipCell.classList.add('ship')
                shipCell.classList.add('cell')
                shipBody.append(shipCell)
            }
            shipName.textContent = ships[i].name
            shipItem.append(shipName, shipBody)
            shipField.append(shipItem)
            // shipBody.ondragstart = (e) => {
            //     e.dataTransfer.setData("id", i); 
            // }
            shipBody.ondrag = () => {
                document.querySelector("html").ondrop = (e) => {
                    const row = parseInt(e.target.dataset.row)
                    const column = parseInt(e.target.dataset.column)
                    playGame.placeShips(row, column, i)
                    
                }
            }

        }
    }

    function buttons(mode) {
        const confirm = document.getElementById('button-start')
        const reset = document.getElementById('button-reset')
        const random = document.getElementById('button-random')
       
        confirm.disabled = true
        reset.disabled = true
        random.disabled = true

        confirm.style.display = 'inline'
        random.style.display = 'inline'
        reset.textContent = 'Reset'
        
        if (mode === 'placing' || mode === 'ready') {
            reset.disabled = false
            reset.onclick = () => playGame.resetBoard()
            random.disabled = false
            random.onclick = () => playGame.placeRandom()
        }
        if (mode === 'ready') {
            confirm.disabled = false
            confirm.onclick = () => playGame.startGame()
        }
        if (mode === 'game') {
            confirm.style.display = 'none'
            random.style.display = 'none'
            reset.textContent = 'New game'
            reset.disabled = false
            reset.onclick = () => playGame.resetGame()
        }

    }

 
    function message(message) {
        const messageField = document.querySelector('.message')
        messageField.textContent = message
    }

    return { gameboard, message, shipsSelection, buttons }
}();

export default render