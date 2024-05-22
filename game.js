var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];

var level=0;

$(document).keypress(function(){
    if(level==0){
        //alert("key pressed");
        nextSequence();
    }
});


 
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
} 

function playSound(nameOfColor){
    var audio = new Audio("sounds/"+nameOfColor+".mp3");
    audio.play();
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor){
    $("#"+currentColor).toggleClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).toggleClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").toggleClass("gameOver");
        $("h1").text("Game Over,Press Any Key to Restart ");
        setTimeout(function(){
            $("body").toggleClass("gameOver");
/* $("h1").text("Game Over");*/
gameOver();
        },200);
        
    }
}

function gameOver(){
    gamePattern=[];
    level=0;
}