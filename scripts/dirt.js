

//global variables
var STRINGS = ["Eh", "B", "G", "D", "A", "El"]
var ACTIVE_STRING = "";
var GAMECOUNTER = 0;
var CORRECT = 0;
var INCORRECT = 0;
var IMAGES = new Array();
var MAXGAME = 10;

//sound varialbes
var SOUNDS = new Array()
var SOUNDMODE = true;
var VISUALMODE = true;
var RANDOMMODE = false;

let getRandomInt = (max)  => {
    return Math.floor(Math.random() * max) + 1;
    }
  
function loadImages() { 
    //preload images
    // THIS DOESN'T WORK ON PAGES
    /*var fretboard_empty = new Image();
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
    IMAGES.push(fretboard_el);   */

    //rewrote this for PAGES
    var fretboards = $('.fretboard-image')
    fretboards.each(function ()  {
        IMAGES.push($(this))
    }
    );
}

function loadSounds(){
    //preload sounds => THIS DOESN'T WORK ON PAGES
    /*
    var soundHighE = new Audio("../sounds/1st_String_E_short.mov");
    var soundB = new Audio("../sounds/2nd_String_B_short.mov");
    var soundG = new Audio("../sounds/3rd_String_G_short.mov");
    var soundD = new Audio("../sounds/4th_String_D_short.mov");
    var soundA = new Audio("../sounds/5th_String_A_short.mov");
    var soundLowE = new Audio("../sounds/6th_String_E_short.mov");   */ 

    var sounds = document.querySelectorAll('audio');
    sounds.forEach( (element) => SOUNDS.push(element));
}

let checkButton = (event) => {
    $('.note').off();
    $(document).off('keypress');
    
    //alert(event.type);
    let button;
    if (event.type == 'click') {
        button = event.currentTarget.id;
    }
    else {
        //alert(event.keyCode)
        switch (event.keyCode){
            case 101: 
                button = 'El';
                break
            case 97:
                button = 'A';
                break
            case 100:
                button = 'D';
                break
            case 103:
                button = 'G';
                break
            case 98:
                button = 'B';
                break
            case 69:
                button = 'Eh';
                break
            case 115:
                //alert('triggering shuffle buttons')
                $('.note').off().on('click', checkButton);
                $(document).on('keypress', checkKey);
                return
        }
        var noteButtons = $('.note-grid').children();
        noteButtons.children('#' + button).addClass('pressed');
        //$('#' + button).addClass('pressed'); 

    }

    if (!ACTIVE_STRING){
        // button pressed outside of play
        $('.note').off().on('click', checkButton);
        $(document).on('keypress', checkKey);
        noteButtons.children('#' + button).removeClass('pressed');
        return
    }
    if (button == ACTIVE_STRING) {
        CORRECT++;
        $('.feedback-correct').show();
        $('.feedback-incorrect').hide();
    
    }
    else {
        INCORRECT++;
        $('.feedback-correct').hide();
        $('.feedback-incorrect').show();
    }

    //$('.counter').html(`${CORRECT} / ${GAMECOUNTER}`);
    $('.counter').html(`${CORRECT} / 10`);

    if (GAMECOUNTER < MAXGAME){
        startPlay();
    }
    else
    {
        stopGame();     
    }                 
};

let showBlank = () => {    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            $('.btn').removeClass('pressed');
            //$('.fretboard-image').attr("src", IMAGES[0].src);
            $('.fretboard-image').hide()
            IMAGES[0].show();
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
        }, 300);
    });
};

async function startPlay () {
    $('.play-btn').off();
    $(document).off('keypress');
    if (GAMECOUNTER == 0) {
        $('.counter').html(` `);
        $('.feedback-correct').hide();
        $('.feedback-incorrect').hide();
    }
    //$('.shuffle-btn').addClass('disabled');
    //$('.shuffle-btn').off();
    $('.play-btn').addClass('disabled');
    await showBlank();
    await resetBoard();
    var index = getRandomInt(6);
    ACTIVE_STRING = STRINGS[index - 1];
    $('.note').off().on('click', checkButton);
    $(document).on('keypress', checkButton);
    if (RANDOMMODE) {
        let randomNumber = Math.random();
        if (randomNumber > 0.66) {
            VISUALMODE = true;
            SOUNDMODE = false;
        }
        else if (randomNumber > 0.33) {
            SOUNDMODE = true;
            VISUALMODE = false;
        }
        else {
            SOUNDMODE = true;
            VISUALMODE = true;
        }
    }
    if (VISUALMODE) {
        var image = IMAGES[index];      
        //$('.fretboard-image').attr("src", image.src);
        $('.fretboard-image').hide();
        image.show();
        
    }
    if (SOUNDMODE) {
        var sound = SOUNDS[index - 1];
        if (sound.paused) {
            sound.play();
        } else {
            sound.currentTime = 0;
            sound.play();
        }
        
    }


};    

async function stopGame() {
    GAMECOUNTER = -1;
    CORRECT = 0;
    INCORRECT = 0;
    await showBlank();
    await resetBoard();
    $('.note').off();
    $('.play-btn').on('click');
    $('.play-btn').removeClass('disabled')
    //$('.shuffle-btn').removeClass('disabled');
    //$('.shuffle-btn').on('click');  


    //$('.shuffle-btn').off().one('click', shuffleButtons);
    $('.play-btn').off().one('click', startPlay);
    $('.play-btn').html('<h2>Play Again<h2>');
    $(document).on('keypress', checkKey);
    $('.game-over').show();
}

let shuffleButtons = () =>  {
    //shuffle order of buttons
    //$('.shuffle-btn').addClass('disabled');
    var noteButtons = $('.note-grid').children();
    var orderClasses = ['order-1', 'order-2', 'order-3', 'order-4', 'order-5', 'order-6']
    var orderClassesUnchanged = ['order-1', 'order-2', 'order-3', 'order-4', 'order-5', 'order-6']
    for (var i = 0; i < noteButtons.length; i++) {
        var button = noteButtons[i];
        var randomIndex = Math.floor(Math.random() * orderClasses.length);
        // first remove old order classes 
        for (var j = 0; j < 6; j++){
            $(button).removeClass(orderClassesUnchanged[j]);
        };
        $(button).addClass(orderClasses[randomIndex]);
        orderClasses.splice(randomIndex, 1);
      }
    
}
      
let checkKey = (event) => {
    //alert(event.keyCode)
    switch(event.keyCode) {
        case 112:
            startPlay();
            break
        case 115:
            shuffleButtons();
            break;
        default:
            checkButton(event);
    }
}


//this now should just activate loadImages once the document is ready.    
$(() => {
    $('#modeButton').on('click', () => {
        $('.mode-menu').toggle();
    });
    loadImages();
    loadSounds();

    // attach event to mode button modes
    $('.mode-type').on('click', (event) => {
        modeType = event.target.id;
        $('#' + modeType).addClass('selected'); 
        var otherModeTypes = $('#' + modeType).parent().siblings()
        for (i = 0; i < otherModeTypes.length; i++){
            $(otherModeTypes[i]).children().removeClass('selected');
        }

        $('.instructions-text').addClass('disabled')
        $('.instructions-text').siblings('#' + modeType).removeClass('disabled')

        //alert(modeType);
        if (modeType == 'audioMode' || modeType == 'mixedMode') {
            SOUNDMODE = true;
        }
        else {
            SOUNDMODE = false;
        }
        if (modeType == 'visualMode' || modeType == 'mixedMode') {
            VISUALMODE = true;
        }
        else {
            VISUALMODE = false;
        }
        if (modeType == 'randomMode') {
            RANDOMMODE = true;
        } else {
            RANDOMMODE = false;
        }

    })


    //$('.shuffle-btn').off().one('click', shuffleButtons)
    $('.shuffle-btn').on('click', shuffleButtons)
    $('.play-btn').off().one('click', startPlay);
    $(document).on('keypress', checkKey);
});

