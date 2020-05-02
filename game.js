
var started=false;
var level=0;

$(".start").click(function(event){
    $(".start").css("visibility","hidden");
    if(!started){
        nextSequence();
        $("#level-title").text("Level "+level);
        started= true;
    }
});




var userClickedPattern=new Array();

var gamePattern=new Array();

var buttonColours=new Array("red","blue","green","yellow");

$(".btn").click(handler);


function handler(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}

function nextSequence() {
    userClickedPattern=[];
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);
}

function playSound(name){
    switch(name) {
        case "red": 
        var audio=new Audio("sounds/red.mp3");
        audio.play();
        break;
        case "blue": 
        var audio=new Audio("sounds/blue.mp3");
        audio.play();
        break;
        case "green": 
        var audio=new Audio("sounds/green.mp3");
        audio.play();
        break;
        case "yellow": 
        var audio=new Audio("sounds/yellow.mp3");
        audio.play();
        break;
    }
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("Success");
    
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}


function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    $(".start").css("visibility","visible");
}