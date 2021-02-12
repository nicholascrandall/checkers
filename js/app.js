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

//check if target tile contains an opposing piece or not

const checkOpposing = (parentElement, childClassName) => {
  if ($(`${parentElement}`)[0].hasChildNodes()) {
    if  ($(`${parentElement}`)[0].childNodes[0].className.includes(childClassName)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//check if that tile is jumpable
const blackLeftJump = (startingTileNumber) => {
  let oppositeNum = startingTileNumber+18
  let stringClassName = (".tile"+oppositeNum.toString())
  if ($(`${stringClassName}`)[0].hasChildNodes() === false) {
    return true;
  } else {
    return false;
  }
}
const blackRightJump = (startingTileNumber) => {
  let oppositeNum = startingTileNumber+14
  let stringClassName = (".tile"+oppositeNum.toString())
  if ($(`${stringClassName}`)[0].hasChildNodes() === false) {
    return true;
  } else {
    return false;
  }
}

const whiteLeftJump = (startingTileNumber) => {
  let oppositeNum = startingTileNumber-14
  let stringClassName = (".tile"+oppositeNum.toString())
  if ($(`${stringClassName}`)[0].hasChildNodes() === false) {
    return true;
  } else {
    return false;
  }
}
const whiteRightJump = (startingTileNumber) => {
  let oppositeNum = startingTileNumber-18
  let stringClassName = (".tile"+oppositeNum.toString())
  if ($(`${stringClassName}`)[0].hasChildNodes() === false) {
    return true;
  } else {
    return false;
  }
}


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
    // console.log(firstNum);
    firstClass = (".tile"+firstNum.toString())
    // console.log(firstClass);
    //if target has a jumpable opposing piece
    if (checkOpposing(firstClass, "whitepiece") && blackLeftJump(num)) {
      const $jumpedPiece = $(`${firstClass} > p`)

      firstNum = num+18
      firstClass = (".tile"+firstNum.toString())
      // console.log(firstClass);
      if ($(`${firstClass}`)[0].hasChildNodes() === false) {
        $jumpedPiece.addClass("jumped")
      }

    }
    $legalTile = $(`${firstClass}:not(:has(>p))`)
    // console.log("black left corner");

  }
  //black pov right corner
  else if (starter.parent(".tile8")[0] || starter.parent(".tile24")[0] || starter.parent(".tile40")[0] || starter.parent(".tile56")[0]) {

    firstNum = num+7
    firstClass = (".tile"+firstNum.toString())
    // console.log(firstClass);
//if target has a jumpable opposing piece
    if (checkOpposing(firstClass, "whitepiece") && blackRightJump(num)) {
      const $jumpedPiece = $(`${firstClass} > p`)

      firstNum = num+14
      firstClass = (".tile"+firstNum.toString())
      // console.log(firstClass);
      if ($(`${firstClass}`)[0].hasChildNodes() === false) {
        $jumpedPiece.addClass("jumped")
      }

    }

    $legalTile = $(`${firstClass}:not(:has(>p))`)
    // console.log("black right corner");
  }
  //rest of tiles on black
  else {

    firstNum = num+7
    firstClass = (".tile"+firstNum.toString())
    // console.log(firstClass);

    secondNum = num+9
    secondClass = (".tile"+secondNum.toString())
    // console.log(secondClass);

//if first target has an opposing piece, isn't in a corner, and can be jumped
    if (checkOpposing(firstClass, "whitepiece") && $(`${firstClass}`)[0].classList.contains("tile9") === false && $(`${firstClass}`)[0].classList.contains("tile25") === false && $(`${firstClass}`)[0].classList.contains("tile41") === false && $(`${firstClass}`)[0].classList.contains("tile8") === false && $(`${firstClass}`)[0].classList.contains("tile24") === false && $(`${firstClass}`)[0].classList.contains("tile40") === false && $(`${firstClass}`)[0].classList.contains("tile56") === false && $(`${firstClass}`)[0].classList.contains("tile57") === false && blackRightJump(num)){

      const $jumpedPiece = $(`${firstClass} > p`)

      firstNum = num+14
      firstClass = (".tile"+firstNum.toString())
      // console.log(firstClass);

      if ($(`${firstClass}`)[0].hasChildNodes() === false) {
        $jumpedPiece.addClass("jumped")
      }
      $legalTile = $(`${firstClass}:not(:has(>p))`)
//if second has an opposing piece and isn't in a corner
} else if (checkOpposing(secondClass, "whitepiece") && $(`${secondClass}`)[0].classList.contains("tile9") === false && $(`${secondClass}`)[0].classList.contains("tile25") === false && $(`${secondClass}`)[0].classList.contains("tile41") === false && $(`${secondClass}`)[0].classList.contains("tile8") === false && $(`${secondClass}`)[0].classList.contains("tile24") === false && $(`${secondClass}`)[0].classList.contains("tile40") === false && $(`${secondClass}`)[0].classList.contains("tile56") === false && $(`${secondClass}`)[0].classList.contains("tile57") === false && blackLeftJump(num)) {

      const $jumpedPiece = $(`${secondClass} > p`)

      secondNum = num+18
      secondClass = (".tile"+secondNum.toString())
      // console.log(secondClass);

      if ($(`${secondClass}`)[0].hasChildNodes() === false) {
        $jumpedPiece.addClass("jumped")
      }
      // console.log(secondClass);
      $legalTile = $(`${secondClass}:not(:has(>p))`)
    } else { //if no jumps can be made
      $legalTile = $(`${firstClass}:not(:has(>p)), ${secondClass}:not(:has(>p))`)
      // console.log("black center");
    }
  }

  // const $legalTile = $('.darkTile:not(:has(>p))')
  $legalTile.css("background-color", "#3ba4f5")

  $legalTile.on('click',()=> {
    event.target.append(starter[0])
    $('.darkTile').css("background-color", "#6f3f32")
    if ($(".jumped")[0]) {
      $(".jumped").remove()
      whiteRemaining--
      if (whiteRemaining < 1) {
        alert("Black wins! White has no pieces remaining. Start a new match by clicking the button labeled 'New Match'")
      } else {
        $('#whitetext').text(`${whiteRemaining} pieces remaining`)
      }
    }
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
    // console.log(firstClass);

    if (checkOpposing(firstClass, "blackpiece") && whiteLeftJump(num)) {
      const $jumpedPiece = $(`${firstClass} > p`)

      firstNum = num-14
      firstClass = (".tile"+firstNum.toString())
      // console.log(firstClass);
      if ($(`${firstClass}`)[0].hasChildNodes() === false) {
        $jumpedPiece.addClass("jumped")
      }

    }

    $legalTile = $(`${firstClass}:not(:has(>p))`)
    // console.log("white left corner");
  }
  // white pov right corner
  else if (starter.parent(".tile24")[0] || starter.parent(".tile40")[0] || starter.parent(".tile56")[0]) {

    firstNum = num-9
    firstClass = (".tile"+firstNum.toString())
    // console.log(firstClass);

    if (checkOpposing(firstClass, "blackpiece") && whiteRightJump(num)) {
      const $jumpedPiece = $(`${firstClass} > p`)

      firstNum = num-18
      firstClass = (".tile"+firstNum.toString())
      // console.log(firstClass);
      if ($(`${firstClass}`)[0].hasChildNodes() === false) {
        $jumpedPiece.addClass("jumped")
      }

    }

    $legalTile = $(`${firstClass}:not(:has(>p))`)
    // console.log("white right corner");
  }
  //rest of tiles on white
  else {
    firstNum = num-7
    firstClass = (".tile"+firstNum.toString())
    // console.log(firstClass);

    secondNum = num-9
    secondClass = (".tile"+secondNum.toString())
    // console.log(secondClass);

    //if first target has an opposing piece and it isn't in a corner
        if (checkOpposing(firstClass, "blackpiece") && $(`${firstClass}`)[0].classList.contains("tile9") === false && $(`${firstClass}`)[0].classList.contains("tile25") === false && $(`${firstClass}`)[0].classList.contains("tile41") === false && $(`${firstClass}`)[0].classList.contains("tile8") === false && $(`${firstClass}`)[0].classList.contains("tile24") === false && $(`${firstClass}`)[0].classList.contains("tile40") === false && $(`${firstClass}`)[0].classList.contains("tile56") === false && $(`${firstClass}`)[0].classList.contains("tile57") === false && whiteLeftJump(num)) {

          const $jumpedPiece = $(`${firstClass} > p`)

          firstNum = num-14
          firstClass = (".tile"+firstNum.toString())
          // console.log(firstClass);

          if ($(`${firstClass}`)[0].hasChildNodes() === false) {
            $jumpedPiece.addClass("jumped")
          }
          $legalTile = $(`${firstClass}:not(:has(>p))`)
    //if second has an opposing piece and isn't in a corner
  } else if (checkOpposing(secondClass, "blackpiece") && $(`${secondClass}`)[0].classList.contains("tile9") === false && $(`${secondClass}`)[0].classList.contains("tile25") === false && $(`${secondClass}`)[0].classList.contains("tile41") === false && $(`${secondClass}`)[0].classList.contains("tile8") === false && $(`${secondClass}`)[0].classList.contains("tile24") === false && $(`${secondClass}`)[0].classList.contains("tile40") === false && $(`${secondClass}`)[0].classList.contains("tile56") === false && $(`${secondClass}`)[0].classList.contains("tile57") === false && whiteRightJump(num)) {

          const $jumpedPiece = $(`${secondClass} > p`)

          secondNum = num-18
          secondClass = (".tile"+secondNum.toString())
          // console.log(secondClass);

          if ($(`${secondClass}`)[0].hasChildNodes() === false) {
            $jumpedPiece.addClass("jumped")
          }
          $legalTile = $(`${secondClass}:not(:has(>p))`)
        } else { //if no jumps can be made
          $legalTile = $(`${firstClass}:not(:has(>p)), ${secondClass}:not(:has(>p))`)
          // console.log("black center");
        }

  }
    // console.log("white center");
  // const $legalTile = $('.darkTile:not(:has(>p))')
  $legalTile.css("background-color", "#3ba4f5")

    $legalTile.on('click',()=> {
      event.target.append(starter[0])
      $('.darkTile').css("background-color", "#6f3f32")
      if ($(".jumped")[0]) {
        $(".jumped").remove()
        blackRemaining--
        if (blackRemaining < 1) {
          alert("White wins! Black has no pieces remaining. Start a new match by clicking the button labeled 'New Match'")
        } else {
          $('#blacktext').text(`${blackRemaining} pieces remaining`)
        }
      }
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
      // console.log($starterPiece[0]);
      //run function that checks which moves are legal
      blackLegal($starterPiece)
    })
  }
    //during white's turn
    const whitesTurn = () => {
      // console.log($starterPiece);
    $('.whitepiece').on('click',()=> {
      $starterPiece = $(event.path[0])
      // console.log($starterPiece[0]);
      //run function that checks which moves are legal
      whiteLegal($starterPiece)
    })
  }

blacksTurn()
