//initializing variables for adding positions to the board
const $board = $('.board')
const $letters = $('.boardLetters')
const $numbers = $('.boardNumbers')
let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"]
let index = 0
let black = false;
let num = 1;

for (let i = 0; i < 8; i++) { //loops to add num/letter positions
  const $li = $('<li>')
  $li.text(alphabet[i])
  $letters.append($li)
  const $num = $('<li>')
  $num.text(num++)
  $numbers.append($num)
}

//adding tiles to the board

for (let i = 1; i <= 64; i++) {
  const $tile = $('<div>').addClass(`tile${i}`)
  if (black) {
    $tile.addClass("darkTile")
    index++
    black = !black; //makes next tile white
  } else {
    $tile.addClass("lightTile")
    index++
    black = !black;
  }
  $board.append($tile)
  if (index === 8) { //reset for new row
    black = !black; //sets black back to true
    index = 0;
  }
}

//adding pieces to the board
for (let i = 1; i <=24; i++) {
  const $tile = $(`.tile${i}`)
  const $piece = $("<p>").addClass("blackpiece")
  $piece.addClass("piece")
  if ($tile.hasClass("darkTile")) {
    $tile.append($piece)
  }
}
for (let i = 41; i <=63; i++) {
  const $tile = $(`.tile${i}`)
  const $piece = $("<p>").addClass("whitepiece")
  $piece.addClass("piece")
  if ($tile.hasClass("darkTile")) {
    $tile.append($piece)
  }
}


//buttons
//clicking resign ends the game and declares a winner
//clicking new match starts a new game

//odds = black's turn, evens = white's
let blackRemaining = 12 //how many pieces they have left
let whiteRemaining = 12
let player1 = ""
let player2 = ""
let $starterPiece = ""
//randomize who's assigned to black/white
const assigner = Math.floor(Math.random() * Math.floor(2))
console.log(assigner);
const $h1 = $('h1') //grab h1 to update text

if (assigner === 0) {
  player1 = "black"
  player2 = "white"
  //update header to say who goes first
  $h1.text(`Player 1's turn (${player1})`)
} else {
  player1 = "white"
  player2 = "black"
  $h1.text(`Player 2's turn (${player2})`)
}

console.log(`player 1 has been assigned to ${player1}`);
console.log(`player 2 has been assigned to ${player2}`);


//check legal moves function
const legalMoves = (starter) => {
  const $legalTile = $('.darkTile:not(:has(>p))')
  $legalTile.css("background-color", "#3ba4f5")


  $legalTile.on('click',()=> {
    event.target.append(starter[0])
    $('.darkTile').css("background-color", "#6f3f32")
  })
}


for (let i = 1; i <= 100; i++) {
  if (i %2 === 1) {
    //adding on click functionality to each piece
    //during black's turn
    $('.blackpiece').on('click',()=> {
      $starterPiece = $(event.path[0])
      //run function that checks which moves are legal
      legalMoves($starterPiece)
    })
    //during white's turn
  } else if (i %2 === 0) {
    $('.whitepiece').on('click',()=> {
      const $starterPiece = $(event.target)
      //run function that checks which moves are legal
      legalMoves($starterPiece)
    })
  }
}
