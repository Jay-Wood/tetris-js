document.addEventListener('DOMContentLoaded', () => {
    const width = 10
    const grid = document.querySelector(".grid")
    let squares = Array.from(document.querySelectorAll(".grid div"))
    let nextRandom = 0
    const ScoreDisplay = document.getElementById("#score")
    const StartButton = document.getElementById("#start-button")

//Shapes for pieces as they rotate
    const jPiece = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [0, width, width+1, width+2]
    ]
    const tPiece = [
        [0, 1, 2, width+1, width*2+1],
        [2, width, width+1, width+2, width*2+2],
        [1, width+1, width*2, width*2+1, width*2+2],
        [0, width, width*2, width+1, width+2]
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
let randomNum = Math.floor(Math.random()*allPieces.length)
let activePiece = allPieces[randomNum][currentRotation]


//draw piece 
function draw() {
    activePiece.forEach(index =>{
        squares[currentPosition + index].classList.add("piece")
    })
}

//undraw piece
function undraw() {
    activePiece.forEach(index => {
        squares[currentPosition + index].classList.remove("piece")
    })
}

//set timing for pieces to move down grid
let gameTimer = setInterval(moveDown, 200)

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
    console.log("ROTATE")
    if(currentRotation === activePiece.length) {
        currentRotation = 0
    } 
    activePiece = allPieces[randomNum][currentRotation]
    draw()
}

//display next piece in mini-grid
const miniGrid = document.querySelectorAll(".mini-grid div")
const miniGridWidth = 4
let miniGridIndex = 0


//picking 1st rotation of each piece to display in mini-grid
const nextPiecesUp = [
    [1, miniGridWidth+1, miniGridWidth*2+1, 2], 
    [0, 1, 2, miniGridWidth+1, miniGridWidth*2+1], //tPiece
    [0, 1, miniGridWidth+1, miniGridWidth*2+1],
    [0, 1, miniGridWidth+1, miniGridWidth+2],
    [0, 1, miniGridWidth , miniGridWidth+1],
    [1,miniGridWidth+1,miniGridWidth*2+1, miniGridWidth*3+1]
]

//display next piece in mini-grid
function displayNextPiece() {
    console.log("DisplayNextPiece is working")
    //undraw previous piece
    miniGrid.forEach(square => {
        square.classList.remove("piece")
    })

    nextPiecesUp[nextRandom].forEach(index => {
        miniGrid[miniGridIndex + index].classList.add("piece")
    })
}

// draw();

})