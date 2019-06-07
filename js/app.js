// set up a 10 x 10 grid with an index and player sprite position
const width = 20
const squares = []
let playerIndex = Math.floor(width * width - width/2)
let alienIndex = 0
const bulletSpeed = 250
let score = 0
let alienBombIndex = 0
let player = null
let aliens = null

class Players {
  constructor(playerIndex, squares) {
    this.playerIndex = playerIndex
    this.squares = squares
    this.isLive = true
    this.numberOfLives = 3

    this.handleKeyDown = this.handleKeyDown.bind(this)
    window.addEventListener('keydown', this.handleKeyDown)
  }

  resetPlayer() {
    this.isLive = false
    this.squares[this.playerIndex].classList.remove('player')
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  shoot() {
    let bullet = this.playerIndex - width
    this.squares[bullet].classList.add('bullet')

    const shootInterval = setInterval( () => {
      this.squares[bullet].classList.remove('bullet')
      bullet -= width

      aliens.forEach((alien) => {
        alien.alienHit(bullet)
      })

      this.squares[bullet].classList.add('bullet')
      if (bullet < width) { // why cant i clear if null here?
        clearInterval(shootInterval)
        this.squares[bullet].classList.remove('bullet')
      }
    }, bulletSpeed)
  }

  handleKeyDown(e) {
    let playerShouldMove = true
    switch(e.keyCode) {
      case 39:
        if (this.playerIndex % width < width - 1) {
          this.playerIndex++
        }
        break
      case 37:
        if (this.playerIndex % width > 0) {
          this.playerIndex--
        }
        break
      case 32:
        this.shoot()
        break

      default:
        playerShouldMove = false
    }
    if (playerShouldMove) this.movePlayer()
  }

  // moves player (if allowed from valid keydown event) -

  movePlayer() {
    this.squares.forEach(square => square.classList.remove('player'))
    this.squares[this.playerIndex].classList.add('player')
  }
}

// Initialise game
function init() {

  // hook on parent grid
  const grid = document.querySelector('.grid')
  document.querySelector('.user-score').innerHTML = 0

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
  aliens = [
    new Alien(0, squares),
    new Alien(2, squares),
    new Alien(4, squares),

    new Alien(6, squares),
    new Alien(8, squares),
    new Alien(10, squares),

    new Alien(20, squares),
    new Alien(22, squares),
    new Alien(24, squares),

    new Alien(26, squares),
    new Alien(28, squares),
    new Alien(30, squares),

    new Alien(40, squares),
    new Alien(42, squares),
    new Alien(44, squares),

    new Alien(46, squares),
    new Alien(48, squares),
    new Alien(50, squares)
  ]

  // instantiating player
  player = new Players(playerIndex, squares)

  console.log(player)
  console.log(aliens)

}

function resetGame() {

  if (player) {
    player.resetPlayer()
  }
  if (aliens) {
    aliens.forEach(a => {
      a.resetAlien()
    })
  }

  init()
}

window.addEventListener('DOMContentLoaded', init)

const reset = document.querySelector('#reset-button')
reset.addEventListener('click', resetGame)


// if alienHit score++
// if alienHit remove bullet
// bullets from


class Alien {
  constructor(alienIndex, squares) {
    this.alienIndex = alienIndex
    this.squares = squares
    this.moveCount = 0
    this.movingRight = true
    this.isLive = true

    this.init()
    this.bombingAlien()
  }

  get alienDead() {
    return !this.isLive
  }

  resetAlien() {
    this.isLive = false
    if (this.timerId) clearInterval(this.timerId);
    this.squares[this.alienIndex].classList.remove('alien')
  }

  init() {
    this.squares[this.alienIndex].classList.add('alien')
    this.timerId = setInterval(this.moveAlien.bind(this), 250)
  }

  moveAlien() {
    if (!this.isLive) {
      clearInterval(this.timerId)
      return // end if not live
    }

    if (alienIndex > width * width) {
      this.squares[this.alienIndex].classList.remove('alien')
    }

    this.squares[this.alienIndex].classList.remove('alien')
    if (this.moveCount < 9) {
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

    this.playerHitByProjectile(this.alienIndex)
    if (this.squares[this.alienIndex] == null) {
      return clearInterval(this.timerId)
    }
    this.squares[this.alienIndex].classList.add('alien')
  }

  dropBomb(alienBombIndex) {
    if (!this.isLive) return

    this.squares[alienBombIndex].classList.add('bomb')
    const movementInterval = setInterval(() => {
      this.squares[alienBombIndex].classList.remove('bomb')
      alienBombIndex += width

      this.playerHitByProjectile(alienBombIndex)

      if (!this.isLive || this.squares[alienBombIndex] == null) {
        clearInterval(movementInterval)
      } else {
        this.squares[alienBombIndex].classList.add('bomb')

      }
    }, 250)
  }

  playerHitByProjectile(projectileIndex) {
    if (projectileIndex === playerIndex) {
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
      if (!this.isLive || this.squares[this.alienIndex] == null) {
        return clearInterval(bombInterval)
      }
      this.dropBomb(this.alienIndex)
    }, Math.ceil(Math.random() * 5000) + 500)
  }

  alienHit(bulletIndex) {
    if (bulletIndex === this.alienIndex && this.isLive === true) {
      this.isLive = false
      score += 250
      document.querySelector('.user-score').innerHTML = score
      this.squares[this.alienIndex].classList.remove('alien')
      return true
    }

    return false
  }

  increasePlayerScore() {

  }
}
