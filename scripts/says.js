/*Global variables*/
var NOTES = ['A', 'A#', 'B', 'C','C#','D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

var STRINGS = [7, 2, 10, 5, 0, 7];

var NOTE;
var CHORD;
var CHORD_NOTE;
var TOTALNOTES;

var CORRECT = 0;

var INCORRECT = 0;

var CHOSEN = [];

var PLAYINPROGRESS = false;

var CHORDS = ['E', 'A', 'C', 'G', 'D', 'F']

var CHORD_INSTRUCTIONS = new Object();
CHORD_INSTRUCTIONS['E'] = ['Place the middle finger on the SECOND FRET of the A STRING', 
                           'Place the ring finger on the SECOND FRET of the D STRING', 
                           'Place the index finger on the FIRST FRET of the G STRING'];
CHORD_INSTRUCTIONS['A'] = ['Bar the SECOND FRET of the D STRING',
                            'Bar the SECOND FRET of the G STRING',
                            'Bar the SECOND FRET of the B STRING'];
CHORD_INSTRUCTIONS['C'] = ['Place the ring finger on the THIRD FRET of the A STRING', 
                           'Place the middle finger on the SECOND FRET of the D STRING', 
                           'Place the index finger on the FIRST FRET of the B STRING'];

CHORD_INSTRUCTIONS['G'] = ['Place the middle finger on the THIRD FRET of the LOW E STRING', 
                           'Place the index finger on the SECOND FRET of the A STRING', 
                           'Place the ring finger on the THIRD FRET of the B STRING',
                            'Place the pinky on the THIRD FRET of the HIGH E STRING'];

CHORD_INSTRUCTIONS['D'] = ['Place the index finger on the SECOND FRET of the G STRING', 
                            'Place the ring finger on the THIRD FRET of the B STRING', 
                            'Place the middle finger on the SECOND FRET of the HIGH E STRING'];

CHORD_INSTRUCTIONS['F'] = ['Bar the FIRST FRET of the HIGH E STRING', 
                            'Bar the FIRST FRET of the B STRING', 
                            'Place the middle finger on the SECOND FRET of the G STRING',
                            'Place the ring finger on the THIRD FRET of the D STRING'];

var CHORD_NOTES = new Object(); 
CHORD_NOTES['E'] = [[4, 2], [3,2], [2,1]]; /*[stringNumber, fretNumber] counting from highE = 0 and open string = 0*/
CHORD_NOTES['A'] = [[3, 2], [2, 2], [1, 2]];
CHORD_NOTES['C'] = [[4, 3], [3, 2], [1, 1]];
CHORD_NOTES['G'] = [[5, 3], [4, 2], [1, 3], [0, 3]];
CHORD_NOTES['D'] = [[2,2],[1,3],[0,2]];
CHORD_NOTES['F'] = [[0, 1], [1, 1], [2, 2], [3, 3]];




$(() => {
    $('.play-btn').off().one('click', startPlay);
});

async function startPlay () {
    PLAYINPROGRESS = true;
    $('.game-over').hide();
    $('.play-btn').addClass('disabled')
    $('.play-btn').off();
    // generate random chord
    CHORD = CHORDS[Math.floor(Math.random() * CHORDS.length)];
    //alert(CHORD)

    CHORD_NOTE = 0;
    $('.random-note').html(`<h3>${CHORD_INSTRUCTIONS[CHORD][CHORD_NOTE]}</h3>`)
    
    $('.fretboard-button').off().one('click', checkButton);
    
};    

function continuePlay() {
    CHORD_NOTE++;
    if (CHORD_NOTE < CHORD_NOTES[CHORD].length) {
        $('.random-note').html(`<h3>${CHORD_INSTRUCTIONS[CHORD][CHORD_NOTE]}</h3>`);
        $('.fretboard-button').off().one('click', checkButton);
    }
    else
    {
        $('.random-note').html(`<h3>Which chord is this?</h3>`);
        $('.chord-buttons').show();
        $('.note').off().one('click', checkNoteButton)
    }
}
let checkNoteButton = (event) => {
    $('.note').off();
    
    let button = event.currentTarget.id;

    var noteButtons = $('.note-grid').children();
    

    if (button == CHORD) {
        noteButtons.children('#' + button).addClass('correct');
        $('.game-over').html('Correct!');
        $('.game-over').show();
        
    
    }
    else {
        $('.game-over').html('Game over, try again');
        $('.game-over').show();
        noteButtons.children('#' + button).addClass('wrong');
    }


    stopGame();     
           
};
let checkButton = (event) => {
    if (PLAYINPROGRESS) {
        let buttonId = event.target.id;
        let chosenButton = $('#' + buttonId)
        let stringNumber = parseInt(buttonId[1]);
        let fretNumber = parseInt(buttonId[3]);
        /*alert(stringNumber);
        alert(fretNumber);
        alert(CHORD_NOTES[CHORD][CHORD_NOTE][0])
        alert(CHORD_NOTES[CHORD][CHORD_NOTE][1])*/

        
        if (stringNumber == CHORD_NOTES[CHORD][CHORD_NOTE][0] && fretNumber == CHORD_NOTES[CHORD][CHORD_NOTE][1]) {
            chosenButton.addClass('correct')
            
            if (fretNumber == 0){
                chosenButton.css('transform', 'translateX(-20%)');
            }
            continuePlay();

        } else {
            chosenButton.addClass('wrong')
            if (fretNumber == 0){
                chosenButton.css('transform', 'translateX(-20%)');
            }
            $('.game-over').html('Game over, try again.');
            $('.random-note').css('backgroundColor','red');
            $('.game-over').show();
            $('.freboard-button').off();
            stopGame();
        }
    }
    return
}   
let stopGame =() => {
    CHORD_NOTE = 0;
    PLAYINPROGRESS = false;
    $('.freboard-button').off()

    
    $('.play-btn').html('<h2>Play Again<h2>');
    
    $('.play-btn').removeClass('disabled')
    $('.play-btn').off().one('click', resetPlay);
}

let resetPlay = () => {

    $('.counter').html(' ');
    $('.fretboard-button').off().removeClass('correct').removeClass('wrong');
    $('.chord-buttons').hide();
    $('.game-over').hide();
    $('.note').removeClass('correct').removeClass('wrong');
    $('.random-note').css('backgroundColor','#EBF4FD');
    startPlay();
}