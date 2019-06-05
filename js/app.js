// set up a 10 x 10 grid with an index and player sprite position
const width = 20
const squares = []
let playerIndex = Math.floor(width * width - width/2)
let alienIndex = 0
const bulletSpeed = 250
let score = 0
let alienBombIndex = 0

class Players {
  constructor(playerIndex, squares) {
    this.playerIndex = playerIndex
    this.squares = squares
    this.isLive = true
    this.numberOfLives = 3
  }
}
const player = new Players(playerIndex, squares)
console.log(player)


// Initialise game
function init() {

  // hook on parent grid
  const grid = document.querySelector('.grid')

  // loop to add squares for w * w
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    // square.innerHTML = i
    squares.push(square)
    grid.append(square)
  }

  squares[playerIndex].classList.add('player')


// instatiating aliens!
  const aliens = [
    new Alien(0, squares),
    new Alien(2, squares),
    new Alien(4, squares)
  ]

// instantiating player
  const player = new Players(playerIndex, squares)

  console.log(player)
  console.log(aliens)

  // moves player (if allowed from valid keydown event) -
  //move this to player class, along with all other player parts when done
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
    let bullet = playerIndex - width
    squares[bullet].classList.add('bullet')

    const shootInterval = setInterval( () => {
      squares[bullet].classList.remove('bullet')
      bullet -= width

      aliens.forEach((alien) => {
        alien.alienHit(bullet)
      })

      squares[bullet].classList.add('bullet')
      if (bullet < width) { // why cant i clear if null here?
        clearInterval(shootInterval)
        squares[bullet].classList.remove('bullet')
      }
    }, bulletSpeed)
  }

  window.addEventListener('keydown', handleKeyDown)
}

window.addEventListener('DOMContentLoaded', init)


// if alienHit score++
// if alienHit remove bullet
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
    this.bombingAlien()
  }

  get alienDead() {
    return !this.isLive
  }

  init() {
    this.squares[this.alienIndex].classList.add('alien')
    this.timerId = setInterval(this.moveAlien.bind(this), 250)
  }

  moveAlien() {
    if (!this.isLive) return // end if not live

    if (alienIndex > width * width) {
      this.squares[this.alienIndex].classList.remove('alien')
    }

    this.squares[this.alienIndex].classList.remove('alien')
    if (this.moveCount < 14) {
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

  dropBomb(alienBombIndex) {
    if (!this.isLive) return

    this.squares[alienBombIndex].classList.add('bomb')
    const movementInterval = setInterval(() => {
      this.squares[alienBombIndex].classList.remove('bomb')
      alienBombIndex += width


      this.playerHit(alienBombIndex)

      if (!this.isLive || this.squares[alienBombIndex] == null) {
        clearInterval(movementInterval)
      } else {
        this.squares[alienBombIndex].classList.add('bomb')

      }
    }, 250)
  }

  playerHit(alienBombIndex) {
    if (alienBombIndex === playerIndex) {
      console.log(`player hit ${player}`)
      player.numberOfLives--
      player.isLive = false
      console.log(player)
      if (player.numberOfLives === 0) {
        this.squares[player.playerIndex].classList.remove('player')
      }
      return true
    }
  }

  bombingAlien() {
    const bombInterval = setInterval( () => {
      this.dropBomb(this.alienIndex)
      if (!this.isLive) {
        clearInterval(bombInterval)
      }
    }, Math.ceil(Math.random() * 5000) + 500)
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
