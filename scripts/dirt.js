//global variables
var STRINGS = ["Eh", "B", "G", "D", "A", "El"]
var ACTIVE_STRING = "";
var GAMECOUNTER = 0;
var IMAGES = new Array();

let getRandomInt = (max)  => {
    return Math.floor(Math.random() * max) + 1;
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
    let button = event.currentTarget.id;
    if (button == ACTIVE_STRING) {
        $('.feedback-correct').show();
        $('.feedback-incorrect').hide();
    }
    else {
        $('.feedback-correct').hide();
        $('.feedback-incorrect').show();
    }

    if (GAMECOUNTER < 10){
        startPlay();
    }
    else
    {
        $('.game-over').show();
        $('.note').off('click');
    }                 
};

let showBlank = () => {    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            $('.fretboard-image').attr("src", IMAGES[0].src);
            $('.feedback-correct').hide();
            $('.feedback-incorrect').hide();
            $('.game-over').hide();
            ACTIVE_STRING = "";
            GAMECOUNTER++;  
            resolve('board reset');
        },1000);
    });
};

let resetBoard = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve('finished');
        }, 1000);
    });
};

function startPlay () {
    showBlank().then( () => {
        return resetBoard();
    })
    .then(() => {
        var index = getRandomInt(6);
        var image = IMAGES[index];
        ACTIVE_STRING = STRINGS[index - 1];
        $('.fretboard-image').attr("src", image.src);
        $('.note').off().one('click', checkButton);
    }); 
};    
        
//this now should just activate loadImages once the document is ready.    
$(() => {
    $('#modeButton').on('click', () => {
        $('.mode-menu').toggle();
    });
    loadImages();
    $('.play-btn').off().one('click', startPlay);
});