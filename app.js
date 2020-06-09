document.addEventListener('DOMContentLoaded', () => {
    const width = 10
    const grid = document.querySelector(".grid")
    let squares = Array.from(document.querySelectorAll(".grid div"))
    let nextRandom = 0
    const scoreDisplay = document.getElementById("score")
    const startButton = document.getElementById("start-button")
    const turnDisplay = document.getElementById("turn")
    let timerId 
    let score = 0
    const colors = [ 'red', 'blue', 'green', 'lightblue', 'orange', 'purple']
    let turn = 0

//Shapes for pieces as they rotate
    const jPiece = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [0, width, width+1, width+2]
    ]
    const tPiece = [
        [0, 1, 2, width+1], 
        [1, width, width+1, width*2+1],
        [1, width, width+1, width+2],  
        [1, width+1, width+2, width*2+1] 
    ]
    const lPiece = [
        [0, 1, width+1, width*2+1],
        [2, width, width+1, width+2],
        [1, width+1, width*2+1, width*2+2],
        [width, width*2, width+1, width+2]
    ]
    const zPiece = [
        [0, 1, width+1, width+2],
        [1, width, width+1, width*2],
        [0, 1, width+1, width+2],
        [1, width, width+1, width*2]
    ]
    const oPiece = [
        [0,1,width, width+1],
        [0,1,width, width+1],
        [0,1,width, width+1],
        [0,1,width, width+1]
    ]
    const iPiece = [
        [1,width+1,width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1,width+1,width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

const allPieces = [jPiece, tPiece, lPiece, zPiece, oPiece, iPiece]

//set starting position and rotation for pieces
let currentPosition = 4;
let currentRotation = 0;
//randomly select piece 
let randomNum = Math.floor(Math.random() * allPieces.length)
let activePiece = allPieces[randomNum][currentRotation]

//draw piece 
function draw() {
    activePiece.forEach(index =>{
        squares[currentPosition + index].classList.add("piece")
        squares[currentPosition + index].style.backgroundColor = colors[randomNum]
    })
}

//undraw piece
function undraw() {
    activePiece.forEach(index => {
        squares[currentPosition + index].classList.remove("piece")
        squares[currentPosition + index].style.backgroundColor = ""
    })
}

//key controls for piece movement
function controlPiece(e) {
    if(e.keyCode === 37) {
        moveLeft()
    } else if(e.keyCode === 39) {
        moveRight()
    } else if(e.keyCode === 38) {
        rotatePiece()
    } else if(e.keyCode === 40) {
        moveDown()
    } 
}

document.addEventListener('keyup', controlPiece)

//shift pieces down at gameTimer interval
function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freezePiece()
}

//freeze pieces that hit bottom of grid, start new piece
function freezePiece() {
    if(activePiece.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
        activePiece.forEach(index => squares[currentPosition + index].classList.add("taken"))
        randomNum = nextRandom 
        nextRandom = Math.floor(Math.random() * allPieces.length)
        activePiece = allPieces[randomNum][currentRotation]
        currentPosition = 4
        draw()
        displayNextPiece()
        addTurn()
        addScore()
        endGame()
        console.log(turn)
    }
}

//move left, unless already at far left
function moveLeft() {
    undraw()
    const isAtLeftEdge = activePiece.some(index => (currentPosition + index) % width === 0)
    if(!isAtLeftEdge) {
        currentPosition -=1
    }
    if(activePiece.some(index => squares[currentPosition + index].classList.contains("taken"))) {
        currentPosition +=1
    }
    draw()
}

//move right, unless already at far right
function moveRight() {
    undraw()
    //returns true if any of the activePiece's squares are in position 9, i.e. the farthest right 
    const isAtRightEdge = activePiece.some(index => (currentPosition + index) % width === width-1)
    if(!isAtRightEdge) {
        currentPosition +=1
    }
    if(activePiece.some(index => squares[currentPosition + index].classList.contains("taken"))) {
        currentPosition -=1
    }
    draw()
}

//rotate piece
function rotatePiece() {
    undraw()
    currentRotation++
    if(currentRotation === activePiece.length) {
        currentRotation = 0
    } 
    activePiece = allPieces[randomNum][currentRotation]
    checkRotation()
    draw()
}

//handle edge cases for rotation
function isAtRight() {
    return activePiece.some(index => (currentPosition + index + 1) % width === 0)
}

function isAtLeft() {
    if(activePiece.some(index => (currentPosition + index) % width === 0)) {
        return true;
    }
}

function checkRotation(pos) {
    pos = pos || currentPosition
    if((pos+1) % width < 4) {
        if(isAtRight()) {
            currentPosition += 1
            checkRotation(pos)
        }
    } 
    else if(pos % width > 5) {
        if(isAtLeft()) {
            currentPosition -= 1
            checkRotation(pos)
        }
    }
}


//display next piece in mini-grid
const miniGrid = document.querySelectorAll(".mini-grid div")
const miniGridWidth = 4
const miniGridIndex = 0

//picking 1st rotation of each piece to display in mini-grid
const nextPiecesUp = [
    [1, miniGridWidth+1, miniGridWidth*2+1, 2], 
    [0, 1, 2, miniGridWidth+1], //tPiece
    [0, 1, miniGridWidth+1, miniGridWidth*2+1],
    [0, 1, miniGridWidth+1, miniGridWidth+2],
    [0, 1, miniGridWidth , miniGridWidth+1],
    [1,miniGridWidth+1,miniGridWidth*2+1, miniGridWidth*3+1]
]

//display next piece in mini-grid
function displayNextPiece() {
    //undraw previous piece
    miniGrid.forEach(square => {
        square.classList.remove("piece")
        square.style.backgroundColor = ""
    })

    nextPiecesUp[nextRandom].forEach(index => {
        miniGrid[miniGridIndex + index].classList.add("piece")
        miniGrid[miniGridIndex + index].style.backgroundColor = colors[nextRandom]
    })
}

//button functionality
startButton.addEventListener("click", () => {
    if(timerId) {
        clearInterval(timerId)
        timerId = null
    } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()*allPieces.length)
        displayNextPiece()
    }
    if(turn == 0) {
        turn++
        turnDisplay.innerHTML = turn
    }
})

//add score
function addScore() {
    for (i=0; i < 199; i += width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if(row.every(index => squares[index].classList.contains("taken"))) {
            score+=10;
            scoreDisplay.innerHTML = score;
            row.forEach(index => {
                squares[index].classList.remove("taken")
                squares[index].classList.remove("piece")
                squares[index].style.backgroundColor = ""
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(sq => grid.appendChild(sq))
        }
    }
}

function addTurn() {
    turn++
    turnDisplay.innerHTML = turn
}

//end game function
function endGame() {
    if(activePiece.some(index => squares[currentPosition + index].classList.contains("taken"))) {
        scoreDisplay.innerHTML = "Game Over"
        clearInterval(timerId)
    }
}

})