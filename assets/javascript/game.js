var gameWins = 0;
var gameLosses = 0;
var evilGemPoints = 0;
var userPoints = 0;
var winsdiv = $("#winsdiv");
var lossdiv = $("#lossdiv");
var userScorediv = $("#userScore");
var progressDiv = $("#progressdiv");
var metaPlayDiv = $("#metaPlayDiv");
var metaResetDiv = $("#metaResetDiv");
var metaResultDiv = $("#metaResultDiv");

function resetBoard() {
  evilGemPoints = Math.floor(Math.random() * 101 + 1) + 18; //random number between 120 and 19.
  console.log(evilGemPoints);
  $("#gemboard").text("");
  userPoints = 0;
  updateprogress();
}

function resetall() {
  gameWins = 0;
  gameLosses = 0;
  metaResultDiv.css("display", "none");

  resetBoard();
}

function startRound() {
  winsdiv.text(gameWins);
  lossdiv.text(gameLosses);
  userScorediv.text(userPoints);

  $("#eviltotal").text(evilGemPoints);
  //create gems and assign them a value between 1 and 12
  for (var i = 0; i < 4; i++) {
    var valnum = Math.floor(Math.random() * 12 + 1); //random number between 1 and 12.

    var gembutton = $("<div>");
    //Generate the color of the gem randomly also the background of the gemcad.
    var gemcolor = getGemColor();
    var gemBG = getGemBG();
    // console.log(gemcolor);
    // console.log(gemBG);
    gembutton.css("background-color", gemBG);
    gembutton.css("color", gemcolor);
    gembutton.addClass("gem-btn col-2 fas fa-gem");
    gembutton.attr("data-gemvalue", valnum);

    $("#gemboard").append(gembutton);
  }
  //listen for clicks on Gem Buttons
  $(".gem-btn").on("click", function() {
    var gemvalue = $(this).attr("data-gemvalue");
    //newly learned method to convert this value from a string to an integer
    gemvalue = parseInt(gemvalue);
    userPoints += gemvalue;
    userScorediv.text(userPoints);
    updateprogress();
    // console.log(userPoints);
    // console.log(evilGemPoints);
    // console.log()
    if (userPoints === evilGemPoints) {
      // console.log("You Win!");
      winRound();
    } else if (userPoints >= evilGemPoints) {
      // console.log("You Lose");
      loseRound();
    }
  });
}

function winRound() {
  gameWins++;
  winsdiv.text(gameWins);
  userPoints = 0;
  metaResultDiv.css("display", "block");
  var brightcolor = getGemColor();
  metaResultDiv.css("background-color", brightcolor);
  metaResultDiv.text("Winner!");
}
function loseRound() {
  gameLosses++;
  lossdiv.text(gameLosses);
  userPoints = 0;
  metaResultDiv.css("display", "block");
  var brightcolor = getGemColor();
  metaResultDiv.css("background-color", brightcolor);
  metaResultDiv.text("Loser!");
}
function getGemColor() {
  var brightArr = [
    "DeepPink",
    "FireBrick",
    "OrangeRed",
    "DarkOrange",
    "Gold",
    "Yellow",
    "Indigo",
    "DarkMagenta",
    "HotPink",
    "MediumVioletRed",
    "RoyalBlue"
  ];

  var rando = Math.floor(Math.random() * brightArr.length + 1);
  rando--;
  //  console.log(rando);
  return brightArr[rando];
}
function getGemBG() {
  var blueArr = [
    "LightCyan",
    "AquaMarine",
    "PaleTurquoise",
    "SkyBlue",
    "PowderBlue"
  ];
  var rando = Math.floor(Math.random() * blueArr.length + 1);
  rando--;
  //  console.log(rando);
  return blueArr[rando];
}

function updateprogress() {
  var progresspercent = Math.floor((userPoints / evilGemPoints) * 100);
  var progresspercenttext = "width: " + progresspercent + "%";
  // console.log(progresspercenttext);
  progressDiv.attr("style", progresspercenttext);
  progressDiv.attr("aria-valuenow", progresspercent);
}

metaPlayDiv.on("click", function() {
  metaPlayDiv.text("New Evil!");
  resetBoard();
  startRound();
});

metaResetDiv.on("click", function() {
  metaPlayDiv.text("New Evil!");
  resetall();
  startRound();
});

// startRound();
