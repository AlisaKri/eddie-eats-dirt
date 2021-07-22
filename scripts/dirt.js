//global variables
var STRINGS = ["Eh", "B", "G", "D", "A", "El"]
var ACTIVE_STRING = "";
var FEEDBACK = document.querySelector(".feedback");
var FRETBOARD = document.getElementById("fretboardImage");
var GAMECOUNTER = 0;
var IMAGES = new Array();

let getRandomInt = (max)  => {
    return Math.floor(Math.random() * max) + 1;
    }
  
let resetGame = () => {
    FEEDBACK.innerHTML = "<p> </p>";
    FRETBOARD.style.content = 'url(../images/fretboard_transparent.png)';
    ACTIVE_STRING = "";
    GAMECOUNTER++;
    
}
function loadImages() {
    
    //preload images
    var fretboard_empty = new Image();
    var fretboard_eh = new Image();
    var fretboard_b = new Image();
    var fretboard_g = new Image(); 
    var fretboard_d = new Image();
    var fretboard_a = new Image();
    var fretboard_el = new Image();

    fretboard_empty.src = "../images/fretboard_transparent.png";
    fretboard_eh.src = "../images/fretboard_eh.png";
    fretboard_b.src = "../images/fretboard_b.png";
    fretboard_g.src = "../images/fretboard_g.png";
    fretboard_d.src = "../images/fretboard_d.png";
    fretboard_a.src = "../images/fretboard_a.png";
    fretboard_el.src = "../images/fretboard_el.png";

    IMAGES.push(fretboard_empty);
    IMAGES.push(fretboard_eh);
    IMAGES.push(fretboard_b);
    IMAGES.push(fretboard_g);
    IMAGES.push(fretboard_d);
    IMAGES.push(fretboard_a);
    IMAGES.push(fretboard_el);   
}

let checkButton = (event) => {
    let button = event.target.id;

    if (button == ACTIVE_STRING) {
        //replace with counter
        FEEDBACK.innerHTML = "correct";
    }
    else {
        //replace with counter
        FEEDBACK.innerHTML = "incorrect";
    }
    //I have to learn about promises to do this thing better
    setTimeout(function(){
        resetGame();
        setTimeout(function(){
            if (GAMECOUNTER < 10){
                startPlay();
            }
            else
            {
                FEEDBACK.innerHTML = "game over";
            }        
        },1000);
    }, 1000);
        
    
    
    
}

let startPlay = () => {
    
    //How to repeat this code several times??
        //alert(GAMECOUNTER);
        var index = getRandomInt(6);
        var image = IMAGES[index];
        ACTIVE_STRING = STRINGS[index - 1];
        FRETBOARD.style.content = 'url(' + image.src + ')';

        //wait for a button click
        

        var buttons = document.querySelectorAll(".note");
        buttons.forEach(element => {
            element.addEventListener('click', checkButton);  
        });
    }
        
loadImages();

let playButton = document.getElementById("startplay");
playButton.addEventListener("click", startPlay);