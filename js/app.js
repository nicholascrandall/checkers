//adding tiles and positions to the board
const $board = $('.board')
const $letters = $('.boardLetters')
const $numbers = $('.boardNumbers')


//buttons
//clicking resign ends the game and declares a winner
//clicking new match starts a new game

//odd numbers = black's turn, even numbers = white
let playerTurn = 1
let blackRemaining = 12 //how many pieces they have left
let whiteRemaining = 12
let player1 = ""
let player2 = ""
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

//should I make two different gameplay loops, one for each side?

//board
