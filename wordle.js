var height = 6 //number of guesses
var width = 5 //length of the word

var row = 0 //attempt number
var col = 0 //current letter for attempt

var gameOver = false
var words = [
  'ABOUT',
  'FIELD',
  'DROVE',
  'GOING',
  'PEACE',
  'ROUND',
  'SLIDE',
  'VITAL',
  'WOULD',
  'YOUNG',
]
var word = words[Math.floor(Math.random() * words.length)]

window.onload = function () {
  initialise()
}

const initialise = () => {
  //creating game board

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement('span')
      tile.id = r.toString() + '-' + c.toString()
      tile.classList.add('tile')
      tile.innerText = ''
      document.getElementById('board').appendChild(tile)
    }
  }

  //User event on keypress

  document.addEventListener('keyup', (e) => {
    if (gameOver) return

    if ('KeyA' <= e.code && e.code <= 'KeyZ') {
      if (col < width) {
        let currentTile = document.getElementById(
          row.toString() + '-' + col.toString()
        )
        if (currentTile.innerText == '') {
          currentTile.innerText = e.code[3]
          col += 1
        }
      }
    } else if (e.code == 'Backspace') {
      if (0 < col && col <= width) {
        col -= 1
        let currentTile = document.getElementById(
          row.toString() + '-' + col.toString()
        )
        currentTile.innerText = ''
      }
    } else if (e.code == 'Enter') {
      update()
      row += 1 //move to next row
      col = 0 //reset to first box
    }

    if (!gameOver && row == height) {
      gameOver = true
      document.getElementById('answer').innerText = word
    }
  })
}

const update = () => {
  let correct = 0
  for (let c = 0; c < width; c++) {
    let currentTile = document.getElementById(
      row.toString() + '-' + c.toString()
    )

    let letter = currentTile.innerText

    //correct position
    if (word[c] == letter) {
      currentTile.classList.add('correct')
      correct += 1
    } else if (word.includes(letter)) {
      //exists in word
      currentTile.classList.add('present')
    }
    //does not exist
    else currentTile.classList.add('absent')

    if (correct == width) {
      gameOver = true
    }
  }
}
