# Space Invaders
This is a dupe of the awesome 1970's space invaders game ([https://spaceinvaders.square-enix-games.com/]).

Space Invaders is a classic arcade game from the 80s. The player aims to shoot an invading alien armada, before it reaches the planet's surface using a mounted gun turret.

The player can only move left or right. The aliens also move from left to right, and also down each time the reach either side of the screen. The aliens also periodically drop bombs towards the player.

There is a score counter keeping track of number of shot aliens, and a reset button to play further games.

![alt text][spaceInvadersPic.png]

## To play:
- Move left: Key left-arrow 

- Move right: Key right-arrow 

- Shoot: Space-bar


## Requirements
* The player should be able to clear at least one wave of aliens
* The player's score should be displayed
* Work solo
* Max-timeframe: 7 days

### The main challenge
* The main challenge here is the movement of large groups of aliens in formation, and the animation of the bombs and player's shots. There are several approaches here, with collision detection being the more challenging.

```javascript
  moveAlien() {
    if (!this.isLive) {
      clearInterval(this.timerId)
      return // end if not live
    }

    if (alienIndex > width * width) {
      this.squares[this.alienIndex].classList.remove('alien')
    } // remove off screen

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
      this.movingRight = !this.movingRight
    } // move alien horizontally and down when it reaches side of screen

    this.playerHitByProjectile(this.alienIndex)
    if (this.squares[this.alienIndex] == null) {
      return clearInterval(this.timerId)
    }
    this.squares[this.alienIndex].classList.add('alien')
  }
```

### How I spent my time
| Time          | Task          |
| ------------- |:-------------:|
| 1.5 day        | Planning, research |
| ~ 3.5 days        | Game logic, minimal styling    |
| 2 days  | Testing, bug fixes  |

## Technology used
 * JavaScript 
 * HTML5 
 * CSS3 

## Wins and blockers
My favourite thing was thinking about the game logic, and moving so many elements across the screen. I hadn't done that so much before (just in a Pong dupe, but that worked differently and used SVGs instead). In particular the alien movement in a group was challenging, and having aliens ‘know’ their particular position, status (dead or live), and their shooting was fun to get my head around!

## Future features
There are a number of bugs in the game that I’d like to fix given more time (for instance the shooting mechanism also resets the players position in the current version!). 

Once the bugs are ironed out, I'd also change the sprites, look and feel of the game, because it doesn't look as good as I would like, and I care about that!

Beyond that I can also add additional levels, with different alien types.

## Key learnings
* Animating so many elements at the same time
* Having those elements respond to what is going on (for instance die if they are shot by a dropped bomb or the player's shot hits an alien)
* Learning another way (a grid with indices) to make a game 

[spaceInvadersPic.png]: spaceInvadersPic.png
