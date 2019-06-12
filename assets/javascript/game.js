var gameWins = 0;
var gameLosses = 0;
var evilGemPoints = 0;
var userPoints = 0;
var winsdiv = $("#winsdiv");
var lossdiv = $("#lossdiv");
var userScorediv = $("#userScore");
var progressDiv = $("#progressdiv");

function startRound() {
  winsdiv.text(gameWins);
  lossdiv.text(gameLosses);
  userScorediv.text(userPoints);
  evilGemPoints = Math.floor(Math.random() * 101 + 1) + 18; //random number between 120 and 19.
  console.log(evilGemPoints);
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
    console.log(userPoints);
    console.log(evilGemPoints);
    // console.log()
    if (userPoints === evilGemPoints) {
      console.log("You Win!");
      winRound();
    } else if (userPoints >= evilGemPoints) {
      console.log("You Lose");
      loseRound();
    }
  });
}

function winRound() {
  gameWins++;
  winsdiv.text(gameWins);
  userPoints = 0;
}
function loseRound() {
  gameLosses++;
  lossdiv.text(gameLosses);
  userPoints = 0;
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
  var progresspercenttext = ("width: " + progresspercent + "%");
  console.log(progresspercenttext);
  progressDiv.attr("style", progresspercenttext);
  progressDiv.attr("aria-valuenow", progresspercent);
}
startRound();
