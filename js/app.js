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

//true = black's turn, false = white's
let playerTurn = true
let blackRemaining = 12 //how many pieces they have left
let whiteRemaining = 12
let $starterPiece = ""


const $h1 = $('h1') //grab h1 to update text
$h1.text("Black's Turn")


//check legal moves function (black)
const blackLegal = (starter) => {
  let firstNum = ""
  let firstClass = ""
  let secondNum = ""
  let secondClass = ""

  //gets the number of the tile ("tile42" becomes just "42")
  let str = starter.parent()[0].className.split(" ")[0].toString()
  let sliced = str.slice(4)
  //turns "42" to a number to use later
  const num = parseInt(sliced, 10)

  let $legalTile = $('.darkTile:not(:has(>p))')
//black pov left corner
  if (starter.parent()[0].classList.contains("tile9") || starter.parent()[0].classList.contains("tile25") || starter.parent()[0].classList.contains("tile41")) {

    firstNum = num+9
    firstClass = (".tile"+firstNum.toString())
    console.log(firstClass);

    $legalTile = $(`${firstClass}:not(:has(>p))`)
    console.log("black left corner");
  }
  //black pov right corner
  else if (starter.parent(".tile8")[0] || starter.parent(".tile24")[0] || starter.parent(".tile40")[0] || starter.parent(".tile56")[0]) {

    firstNum = num+7
    firstClass = (".tile"+firstNum.toString())
    console.log(firstClass);

    $legalTile = $(`${firstClass}:not(:has(>p))`)
    console.log("black right corner");
  }
  //rest of tiles on black
  else {

    firstNum = num+7
    firstClass = (".tile"+firstNum.toString())
    console.log(firstClass);

    secondNum = num+9
    secondClass = (".tile"+secondNum.toString())
    console.log(secondClass);

    $legalTile = $(`${firstClass}:not(:has(>p)), ${secondClass}:not(:has(>p))`)
    console.log("black center");
  }

  // const $legalTile = $('.darkTile:not(:has(>p))')
  $legalTile.css("background-color", "#3ba4f5")

  $legalTile.on('click',()=> {
    event.target.append(starter[0])
    $('.darkTile').css("background-color", "#6f3f32")
    playerTurn = !playerTurn
    $h1.text("White's Turn")
    whitesTurn()
    $legalTile.off("click")
  })
}
const whiteLegal = (starter) => {
  let firstNum = ""
  let firstClass = ""
  let secondNum = ""
  let secondClass = ""

  //gets the number of the tile ("tile42" becomes just "42")
  let str = starter.parent()[0].className.split(" ")[0].toString()
  let sliced = str.slice(4)
  //turns "42" to a number to use later
  const num = parseInt(sliced, 10)

  let $legalTile = $('.darkTile:not(:has(>p))')

  //white pov left corner
  if (starter.parent(".tile9")[0] || starter.parent(".tile25")[0] || starter.parent(".tile41")[0] || starter.parent("tile57")[0]) {

    firstNum = num-7
    firstClass = (".tile"+firstNum.toString())
    console.log(firstClass);

    $legalTile = $(`${firstClass}:not(:has(>p))`)
    console.log("white left corner");
  }
  // white pov right corner
  else if (starter.parent(".tile24")[0] || starter.parent(".tile40")[0] || starter.parent(".tile56")[0]) {

    firstNum = num-9
    firstClass = (".tile"+firstNum.toString())
    console.log(firstClass);

    $legalTile = $(`${firstClass}:not(:has(>p))`)
    console.log("white right corner");
  }
  //rest of tiles on white
  else {
    firstNum = num-7
    firstClass = (".tile"+firstNum.toString())
    console.log(firstClass);

    secondNum = num-9
    secondClass = (".tile"+secondNum.toString())
    console.log(secondClass);

    $legalTile = $(`${firstClass}:not(:has(>p)), ${secondClass}:not(:has(>p))`)
    console.log("white center");
  }
  // const $legalTile = $('.darkTile:not(:has(>p))')
  $legalTile.css("background-color", "#3ba4f5")

    $legalTile.on('click',()=> {
      event.target.append(starter[0])
      $('.darkTile').css("background-color", "#6f3f32")
      playerTurn = !playerTurn
      $h1.text("Black's Turn")
      blacksTurn()
      $legalTile.off("click")
    })
}
  const blacksTurn = () => {
    //adding on click functionality to each piece
    //during black's turn
    $('.blackpiece').on('click',()=> {
      $starterPiece = $(event.path[0])
      console.log($starterPiece[0]);
      //run function that checks which moves are legal
      blackLegal($starterPiece)
    })
  }
    //during white's turn
    const whitesTurn = () => {
      console.log($starterPiece);
    $('.whitepiece').on('click',()=> {
      $starterPiece = $(event.path[0])
      console.log($starterPiece[0]);
      //run function that checks which moves are legal
      whiteLegal($starterPiece)
    })
  }

blacksTurn()





//BACKUP
//
// const whiteLegal = (starter) => {
//   let firstNum = ""
//   let firstClass = ""
//   let secondNum = ""
//   let secondClass = ""
//
//   //gets the number of the tile ("tile42" becomes just "42")
//   let str = starter.parent()[0].className.split(" ")[0].toString()
//   let sliced = str.slice(4)
//   //turns "42" to a number to use later
//   const num = parseInt(sliced, 10)
//
//   let $legalTile = $('.darkTile:not(:has(>p))')
// //black pov left corner
//   if (playerTurn === true && starter.parent()[0].classList.contains("tile9") || starter.parent()[0].classList.contains("tile25") || starter.parent()[0].classList.contains("tile41")) {
//
//     firstNum = num+9
//     firstClass = (".tile"+firstNum.toString())
//     console.log(firstClass);
//
//     $legalTile = $(`${firstClass}:not(:has(>p))`)
//     console.log("black left corner");
//   }
//   //black pov right corner
//   else if (playerTurn === true && starter.parent(".tile8")[0]|| starter.parent(".tile24")[0] || starter.parent(".tile40")[0] || starter.parent(".tile56")[0]) {
//
//     firstNum = num+7
//     firstClass = (".tile"+firstNum.toString())
//     console.log(firstClass);
//
//     $legalTile = $(`${firstClass}:not(:has(>p))`)
//     console.log("black right corner");
//   }
//   //rest of tiles on black
//   else if (playerTurn === true){
//
//     firstNum = num+7
//     firstClass = (".tile"+firstNum.toString())
//     console.log(firstClass);
//
//     secondNum = num+9
//     secondClass = (".tile"+secondNum.toString())
//     console.log(secondClass);
//
//     $legalTile = $(`${firstClass}:not(:has(>p)), ${secondClass}:not(:has(>p))`)
//     console.log("black center");
//   }
//
//   //white pov left corner
//   if (playerTurn === false && starter.parent(".tile9")[0] || starter.parent(".tile25")[0] || starter.parent(".tile41")[0] || starter.parent("tile57")[0]) {
//
//     firstNum = num-7
//     firstClass = (".tile"+firstNum.toString())
//     console.log(firstClass);
//
//     $legalTile = $(`${firstClass}:not(:has(>p))`)
//     console.log("white left corner");
//   }
//   // white pov right corner
//   else if (playerTurn === false && starter.parent(".tile24")[0] || starter.parent(".tile40")[0] || starter.parent(".tile56")[0]) {
//
//     firstNum = num-9
//     firstClass = (".tile"+firstNum.toString())
//     console.log(firstClass);
//
//     $legalTile = $(`${firstClass}:not(:has(>p))`)
//     console.log("white right corner");
//   }
//   //rest of tiles on white
//   else if (playerTurn === false){
//     firstNum = num-7
//     firstClass = (".tile"+firstNum.toString())
//     console.log(firstClass);
//
//     secondNum = num-9
//     secondClass = (".tile"+secondNum.toString())
//     console.log(secondClass);
//
//     $legalTile = $(`${firstClass}:not(:has(>p)), ${secondClass}:not(:has(>p))`)
//     console.log("white center");
//   }
//   // const $legalTile = $('.darkTile:not(:has(>p))')
//   $legalTile.css("background-color", "#3ba4f5")
//
// if (playerTurn === true)
//   $legalTile.on('click',()=> {
//     event.target.append(starter[0])
//     $('.darkTile').css("background-color", "#6f3f32")
//     playerTurn = !playerTurn
//     $h1.text("White's Turn")
//     whitesTurn()
//     $legalTile.off("click")
//   })
//   if (playerTurn === false)
//     $legalTile.on('click',()=> {
//       event.target.append(starter[0])
//       $('.darkTile').css("background-color", "#6f3f32")
//       playerTurn = !playerTurn
//       $h1.text("Black's Turn")
//       blacksTurn()
//       $legalTile.off("click")
//     })
// }
//
