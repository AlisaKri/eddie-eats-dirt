/*Global variables*/
var NOTES = ['A', 'A#', 'B', 'C','C#','D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

var STRINGS = [7, 2, 10, 5, 0, 7];

var NOTE;
var TOTALNOTES;

var CORRECT = 0;

var INCORRECT = 0;

let correctAnswers = (note) => {
    let correct = 0;
    for (let s = 0; s < STRINGS.length; s++) {
        for (let f = 0; f < 6; f++) {
            noteIndex = (STRINGS[s] + f) % 12;
            if (NOTES[noteIndex] == note) {
                correct++;
            }
        }
    }
    return correct;
}

var CHOSEN = [];

var PLAYINPROGRESS = false;


$(() => {
    $('.play-btn').off().one('click', startPlay);
});

async function startPlay () {
    PLAYINPROGRESS = true;
    $('.game-over').hide();
    $('.play-btn').addClass('disabled')
    $('.play-btn').off();
    // generate random note
    NOTE = NOTES[Math.floor(Math.random() * NOTES.length)];
    $('.random-note').html(`<h3>Find all ${NOTE} notes</h3>`);
    $('.fretboard-button').off().one('click', checkButton);
    TOTALNOTES = correctAnswers(NOTE);
    
};    

let checkButton = (event) => {
    if (PLAYINPROGRESS) {
        let buttonId = event.target.id;
        let chosenButton = $('#' + buttonId)
        let stringNumber = parseInt(buttonId[1]);
        let fretNumber = parseInt(buttonId[3]);
        let chosenNoteIndex = (STRINGS[stringNumber] + fretNumber) % 12;
        let chosenNote = NOTES[chosenNoteIndex]
        if (chosenNote == NOTE) {
            chosenButton.addClass('correct')
            CORRECT++;
            if (fretNumber == 0){
                chosenButton.css('transform', 'translateX(-20%)');
            }
            CHOSEN.push(buttonId)
        } else {
            chosenButton.addClass('wrong')
            if (fretNumber == 0){
                chosenButton.css('transform', 'translateX(-20%)');
            }
            INCORRECT++;
            CHOSEN.push(buttonId);
        }
        
        $('.counter').html(`${CORRECT} / ${TOTALNOTES}`);
        if (CORRECT == TOTALNOTES) {
            $('.game-over').html('You found Eddie!');
            $('.game-over').show();
            $('.random-note').css('backgroundColor','green');
            $('.freboard-button').off();
            stopGame()
        }
        else if (INCORRECT >= 3) {
            $('.game-over').html('Game over, try again.');
            $('.random-note').css('backgroundColor','red');
            $('.game-over').show();
            $('.freboard-button').off();
            stopGame()
        }
        else {
            $('.fretboard-button').off().one('click', checkButton);
            for (var i = 0; i < CHOSEN.length; i++){
                $('#' + CHOSEN[i]).off();
            }
        }
    }
    return
}   
let stopGame =() => {
    PLAYINPROGRESS = false;
    $('.freboard-button').off()
    CORRECT = 0;
    INCORRECT = 0;
    
    $('.play-btn').html('<h2>Play Again<h2>');
    
    $('.play-btn').removeClass('disabled')
    $('.play-btn').off().one('click', resetPlay);
}

let resetPlay = () => {
    CHOSEN = [];
    $('.counter').html(' ')
    $('.fretboard-button').off().removeClass('correct').removeClass('wrong')
    $('.random-note').css('backgroundColor','#EBF4FD')
    startPlay();
}