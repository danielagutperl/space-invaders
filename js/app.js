// set up a 10 x 10 grid with an index and player sprite position
const width = 10
const squares = []
let playerIndex = Math.floor(width * width - 3)
let alienIndex = 0
const bulletSpeed = 250







// moves player (if allowed from valid keydown event)
function movePlayer() {
  squares.forEach(square => square.classList.remove('player'))
  squares[playerIndex].classList.add('player')
}

function handleKeyDown(e) {
  let playerShouldMove = true
  switch(e.keyCode) {
    case 39:
      if (playerIndex % width < width - 1) {
        playerIndex++
      }
      break
    case 37:
      if (playerIndex % width > 0) {
        playerIndex--
      }
      break
    case 32: 
      shoot(playerIndex)
    break
      
    default:
      playerShouldMove = false
  }
  if (playerShouldMove) movePlayer()
}

function shoot(playerIndex) {
    let bullet = playerIndex - width;
    squares[bullet].classList.add('bullet')
    const shootInterval = setInterval( () => {
        squares[bullet].classList.remove('bullet')
        bullet -= width
        squares[bullet].classList.add('bullet')
        if (bullet < 0) {
            clearInterval(shootInterval)
        }
    }, bulletSpeed)

}

// Initialise game
function init() {

  // hook on parent grid
  const grid = document.querySelector('.grid')

  // loop to add squares for w * w
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    square.innerHTML = i
    squares.push(square)
    grid.append(square)
  }

  squares[playerIndex].classList.add('player')
  squares[alienIndex].classList.add('alien')

  setInterval(moveAlien, 250);
//   squares[shootIndex].classList.add('shoot')
  window.addEventListener('keydown', handleKeyDown)
}


window.addEventListener('DOMContentLoaded', init) 



// add alien row
// add shooting line - case key up add line up
// collision function - if line in same square as alien, bust alien into asterrisk
// if busted add to score


// // shooting 
// function shoot() {
//     let shootIndex = 87
//     squares.forEach(square => square.classList.remove('shoot'))
//     squares[shootIndex].classList.add('shoot')
// }

// function shootKey(isShooting) {
    // if (isShooting === true) {
    //       playerIndex -= width
    //     }

// const score = document.querySelector('.score')

// let shootIndex = 0;
//     if (shootIndex === alienIndex) {
//         let score = 0
//         score =+ 1
//         score.innerHTML = score
// alien movement
// let movingRight = true
// console.log(window);
// setInterval(console.log('hello'), 1000)
// 

function moveAlien() {
    let moving = 1
    squares[alienIndex].classList.remove('alien')  

    if (alienIndex < 9) {
        alienIndex = alienIndex + moving
    } else if (alienIndex === 9) {
        alienIndex += width
    } else if (alienIndex <= 19 && alienIndex > 10) {
        moving = -1
        alienIndex = alienIndex + moving
    } else if (alienIndex === 10) {
        alienIndex += width 
    } else if (alienIndex < 29 && alienIndex >= 20) {
        moving = +1
        alienIndex = alienIndex + moving
    } else if (alienIndex === 29) {
        alienIndex += width
    } else if (alienIndex <= 39 && alienIndex > 30) {
        moving = -1
        alienIndex = alienIndex + moving
    } else if (alienIndex === 30) {
        alienIndex += width 
    } else if (alienIndex < 49 && alienIndex >= 40) {
        moving = +1
        alienIndex = alienIndex + moving
    }

    squares[alienIndex].classList.add('alien')  
}