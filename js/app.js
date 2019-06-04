// set up a 10 x 10 grid with an index and player sprite position
const width = 10
const squares = []
let playerIndex = Math.floor(width * width - 3)
let alienIndex = 0
const bulletSpeed = 250
let score = 0

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

  const aliens = [
    new Alien(0, squares),
    new Alien(2, squares),
    new Alien(4, squares)
  ]
  console.log(aliens)

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

      aliens.forEach((alien) => {
        alien.alienHit(bullet)
      })

      squares[bullet].classList.add('bullet')
      if (bullet < width) {
        clearInterval(shootInterval)
        squares[bullet].classList.remove('bullet')
      }
    }, bulletSpeed)
  }

  // setInterval(moveAlien, 1000)
  //   squares[shootIndex].classList.add('shoot')
  window.addEventListener('keydown', handleKeyDown)
}


window.addEventListener('DOMContentLoaded', init)


// collision function - if line in same square as alien, bust alien into asterrisk
// if alienHit score++
// bullets from

class Alien {
  constructor(alienIndex, squares) {
    this.alienIndex = alienIndex
    this.squares = squares
    this.moveCount = 0
    this.movingRight = true
    this.timerId = null
    this.isLive = true
    this.init()
  }

  get alienDead() {
    return !this.isLive
  }

  init() {
    this.squares[this.alienIndex].classList.add('alien')
    this.timerId = setInterval(this.moveAlien.bind(this), 1000)
  }

  moveAlien() {
    if (!this.isLive) return // end if not live

    this.squares[this.alienIndex].classList.remove('alien')
    if (this.moveCount < 5) {
      if (this.movingRight) {
        this.alienIndex++
      } else {
        this.alienIndex--
      }
      this.moveCount++
    } else {
      this.alienIndex += width
      this.moveCount = 0
      this.movingRight =!this.movingRight
    }
    this.squares[this.alienIndex].classList.add('alien')
  }

  alienHit(bulletIndex) {
    if (bulletIndex === this.alienIndex) {
      this.isLive = false
      this.squares[this.alienIndex].classList.remove('alien')
      return true
    }

    return false
  }
}


//
// const rowsCount = 1
// function moveAlien() {
//   let moving = 1
//   squares[alienIndex].classList.remove('alien')
//
//   if (alienIndex < 9) {
//     alienIndex = alienIndex + moving
//   } else if (alienIndex === 9) {
//     alienIndex += width
//   } else if (alienIndex <= 19 && alienIndex > 10) {
//     moving = -1
//     alienIndex = alienIndex + moving
//   } else if (alienIndex === 10) {
//     alienIndex += width
//   } else if (alienIndex < 29 && alienIndex >= 20) {
//     moving = +1
//     alienIndex = alienIndex + moving
//   } else if (alienIndex === 29) {
//     alienIndex += width
//   } else if (alienIndex <= 39 && alienIndex > 30) {
//     moving = -1
//     alienIndex = alienIndex + moving
//   } else if (alienIndex === 30) {
//     alienIndex += width
//   } else if (alienIndex < 49 && alienIndex >= 40) {
//     moving = +1
//     alienIndex = alienIndex + moving
//   }
//
//   squares[alienIndex].classList.add('alien')
// }
