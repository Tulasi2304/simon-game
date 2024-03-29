let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

if($(window).width() < 1024){
    $("#level-title").text("Click on the Button to start");
    $("#level-title").after("<button class='btn'>Start Game</button>");
    $(".btn").on("click", ()=>{
        if(started === false){
            $(".btn").hide();
            started = true;
            nextSequence();
        }
    });
}

else{
    $(document).on("keydown", ()=>{
        if(started === false){
            started = true;
            nextSequence();
        }
    });
}

$(".game-btn").on("click",function(){
    let userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length-1);
});

function nextSequence(){
    userPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    let random = Math.floor(Math.random()*4);
    let randomColor = buttonColors[random];
    gamePattern.push(randomColor);

    $("#"+randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function playSound(name){
    let sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(()=>{
        $("."+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentColor){
    if(userPattern[currentColor] === gamePattern[currentColor]){
        if(currentColor+1 === gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            }, 1000);
        }
    }
    else{
        startOver();
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        if($(window).width() < 1024){
            $("#level-title").text("Game Over, Press the Button to Restart");
            $(".btn").show();
            $(".btn").text("Restart Game");
        }
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}