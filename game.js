var level=0;
var f=0;
var  gamePattern=[];
var userClickedPattern=[];
var userChosenColour;
function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  },100);
}
function playsound(name) {
  var sound="sounds/"+name+".mp3";
  new Audio(sound).play();
}
function checkanswer(n) {
  var i;
    for(i=0;i<n;i++) {
    if(gamePattern[i]!==userClickedPattern[i]) {
      return 0;
      break;
    }
  }
  return 1;
}

function fun() {
  var randomNumber=Math.floor(Math.random()*4);
  var buttonColours=["red", "blue", "green", "yellow"];
  var randomChosenColour=buttonColours[randomNumber];
  setTimeout(function () {
    animatePress(randomChosenColour);
    playsound(randomChosenColour);
  },1000);
  gamePattern.push(randomChosenColour);
}

function nextSequence() {
fun();
level=level+1;
$("h1").text("level "+level);
}


$(".btn").on("click",function () {
  userChosenColour=this.id;
  animatePress(userChosenColour);
  playsound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  f=f+1;
    var a=checkanswer(f);
    if(a===0) {
      $("h1").text("Game over,Press space to restart");
      playsound("wrong");
      gamePattern=[];
      userClickedPattern=[];
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      },100);
      f=0;
      level=0;
    }
    if(a===1&&f===level) {
      f=0;
      userClickedPattern=[];
      nextSequence();
    }
});

$(document).on("keydown",function () {
  if(level===0&&event.key===' ')
  nextSequence();
});
