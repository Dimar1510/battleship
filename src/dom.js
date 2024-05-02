import playGame from "./game";

const render = function() {
    const shipField = document.querySelector('.ships-select')
    
    function gameboard(gameboard, player, gameGoing) {
        const boardField = player ?
            document.querySelector('.board-player') :
            document.querySelector('.board-computer')
        boardField.innerHTML = ''
        if (gameGoing) {
            shipField.style.display = 'none'
            if (!player) boardField.style.display = 'grid' 
           
        } else {
            shipField.style.display = 'flex'
            if (!player) boardField.style.display = 'none'
         
        }
        
        const space =document.createElement('div')
        boardField.append(space)
        for (let i = 0; i < gameboard.size; i++) {
            const columns =document.createElement('div')
            columns.classList.add('columns')
            columns.textContent = String.fromCharCode(65+i)
            boardField.append(columns)
        }
        
        let index = 0
        for (let i = 0; i < gameboard.size; i++) {
            for (let j = 0; j < gameboard.size; j++) {
                if (index % gameboard.size === 0) {
                    const rows = document.createElement('div')
                    rows.classList.add('rows')
                    rows.textContent = Math.ceil((index + 1) / 10)
                    boardField.append(rows)
                }
                boardField.append(createCell(gameboard, player, i, j, gameGoing)) 
                index ++  
            }
        }
    }

    function createCell(gameboard, player, row, column, gameGoing) {
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

                if (player && !gameGoing) {
                    if (coord.row === row && coord.column === column) {
                        cell.classList.add('draggable')
                            function drag(e) {
                            const newRow = parseInt(e.target.dataset.row)
                            const newColumn = parseInt(e.target.dataset.column)
                            playGame.moveship(newRow, newColumn, coord)
                        }
                        cell.draggable = true
                        cell.onclick = () => playGame.rotateShip(coord)
                        cell.ondragstart = () => {
                            document.querySelector(".board-player").addEventListener('drop', drag) 
                        }
                        cell.ondragend = () => {
                            document.querySelector(".board-player").removeEventListener('drop', drag)
                        }    
                    } else cell.style.pointerEvents = 'none'
                } 
            }
        } else {
            // empty cell
            cell.ondragstart = function() {
                e.preventDefault()
                return false;
            };
        }

        if (player && !gameGoing) {
            if (!coord) {
                cell.ondragenter = (e) => {
                    e.preventDefault()
                    cell.style.backgroundColor = 'grey'
                }
                cell.ondragleave = (e) => {
                    e.preventDefault()
                    cell.style.background = 'none'   
                }
                cell.ondragover = (e) => {
                    e.preventDefault()
                }
            }
            cell.ondrop = (e) => {
                e.preventDefault()
                cell.style.background = 'none' 
                const index = e.dataTransfer.getData("id")
                if (index) playGame.placeShips(parseInt(e.target.dataset.row), parseInt(e.target.dataset.column), index) 
                e.dataTransfer.setData('id', null)
            }
        }
        
        if (!player && gameGoing) cell.onclick = () => playGame.takeTurn(row, column)
          
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
            
            shipBody.ondragstart = (e) => {
                
                e.dataTransfer.setData('id', i)
                e.dataTransfer.setData('length', ships[i].length)

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
        messageField.innerText = message
    }

    function enableBoard(arg) {
        const board = document.querySelector('.board-computer')
        board.style.pointerEvents = arg
    }

    return { gameboard, message, shipsSelection, buttons, enableBoard }
}();

export default render