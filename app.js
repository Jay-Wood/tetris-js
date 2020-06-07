document.addEventListener('DOMContentLoaded', () => {
    const width = 10
    const grid = document.querySelector(".grid")
    let squares = Array.from(document.querySelectorAll(".grid div"))

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

//shift pieces down at gameTimer interval
function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freezePiece()
}

//freeze pieces that hit bottom of grid, start new piece
function freezePiece() {
    if(activePiece.some(index => squares[currentPosition + index + width].classList.contains("bottom"))) {
        console.log("HIT BOTTOM")
        activePiece.forEach(index => squares[currentPosition + index].classList.add("bottom"))
        newRandomNum = Math.floor(Math.random() * allPieces.length)
        randomNum = newRandomNum 
        activePiece = allPieces[randomNum][currentRotation]
        currentPosition = 4
        draw()
    }
    
}


draw();

})