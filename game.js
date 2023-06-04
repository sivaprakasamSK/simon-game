"use strict";
var buttonColor = ["red", "blue", "green", "deeppink"];
var gamepattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$("body").keydown(function(){
    if(!started){
        $("body").removeClass("cracker-element");
        $(".level").removeClass("hide");
        $(".title").addClass("hide");
        $(".container").removeClass("hide"); 
        $(".title").removeClass("text-align");
        $(".sub-title").addClass("hide");
        $("img").addClass("hide");
        $("p").addClass("hide");
        nextSequence();
        $(".level").text(level);
        $(".btn").removeClass("transparency");
        $("body").addClass("clr");
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern =[];
    level++;
    if(level > 10)
    {
        $(".level").text("won");
        $(".level").addClass("text");
        $("body").addClass("cracker-element");
        $(".btn").addClass("transparency");
        setTimeout(function(){
            $(".level").text("press any key to play again ");
        },4000);
        
        startover();
    }
    else{
        $(".level").text(level);
        var randomnumber = Math.floor(Math.random() *4);
        var randomChosenColor = buttonColor[randomnumber];
        gamepattern.push(randomChosenColor);
        playAll();
    }
   
   
}



function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}




function checkAnswer(currentColor) {
    if(gamepattern[currentColor] == userClickedPattern[currentColor]){
        console.log("correct");

        if(gamepattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("NO");
        var audio1 = new Audio("./sounds/wrong.mp3");
        audio1.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("h1").text("game over press any key to restart");
        startover();
    }
}

function startover(){
    level = 0;
    started = false;
    gamepattern = [];
    $("h1").removeClass("text");
    $("body").removeClass("clr");

}

function playAll() {
    let i = 0;
    const intervalId = setInterval(function() {
      const buttonId = gamepattern[i];
      const button = $("#" + buttonId);
      button.addClass("clicked");
      playSound(buttonId);
  
      setTimeout(function() {
        button.removeClass("clicked");
      }, 100);
  
      i++;
      if (i === gamepattern.length) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
  
  

