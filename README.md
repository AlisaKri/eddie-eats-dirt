# eddie-eats-dirt
## VIDEO DEMO: https://youtu.be/W1fVJ1G-Shs
## URL of website: https://alisakri.github.io/eddie-eats-dirt/index.html

### Descrition: A game to improve guitar fretboard literacy

In this project, I explored building a simple game using HTML and procedural-based JavaScript. The app has three mini-games: Eddie Ate Dirt, Eddie Says, and Find Eddie. 
Each game managed by its own script and all four HTML pages are styled using the same CSS file. I am using bootstrap for responsive design and jQuery for most DOM manipulations.

The premise of this project was to explore the capabilities of procedural JavaScript and its asynchronous nature. The next still will be to translate it to an OOP design, to make it scalabe.


Description of the files:
1) Index.html contains the home page with links to the three games
2) Dirt.html contains the "Eddie Ate Dirt" game. The game can be played in three modes: Visual, Audio, Mixed and Random. In the Visual mode, a random string lights up and the player has to identify the string. This can be done either by pressing a button or using the keyboard. The buttons can be shuffled, to make it more difficult. In the Audio mode, the player only hears the sound associated with the string. In the Mixed mode (default), the player sees the string light up and hears the sound. In the Random mode is a random mixture of the other three modes. The feedback is given on the right and a counter of the correct answer appears on the left. On small screens, only the counter is shown. The game is over after ten rounds.
4) Dirt.js contains the logic behind the game. It uses an asynchronous function "Play Game" to allow a reset of the board between rounds.
5) Find.html contains the "Find Eddie" game. In this game, the player is asked to find specific notes on the fretboard. The counter on the left shows how many times the note appears, which varies between 2 and 4 depending on the note. When the player clicks on a fretboard and string combination, the location colors either green if it is correct, or red if it is wrong. The game is over when the player finds all of the notes, or after three mistakes. 
7) Find.js contains the logic for the "Find Eddie" game. The clickability of the fretboard image is managed by invisible buttons, which change color by adding a "correct" class or a "wrong" class. 
8) Says.html contains the "Eddie Says" game and it is a mixture of the previous two games. The player gets instructions to press specific string/fretboard locations. Once all locations are correctly pressed, six buttons with chord names appear and player has to identify the chord. The game ends when a mistake is made.
9) Says.js contains the logic for "Eddie Says".
10) The "Sounds" directory contains the open string note sounds used in "Eddie Ate Dirt". It also has some chords that aren't use yet.
11) The "Images" directory has the vector images used for the background and the fretboard, as well as the "correct" and "incorrect" images I made myself.

Ideas for further development once redesigned to OOP:
1) Encapsulate current game into the "Small" mode, add "Medium" mode showing a fretboard up the the 7th fret, "Large" mode showing a fretboard up to the 10th fret and "XL" mode showing a fretboard up to the 14th fret. Limit game to "Small" and/or "Medium" depending on viewport size.
2) Add "Capo" mode to "Small" and "Medium".
3) Add sound playing the notes when player pressed on the fretboard.
4) Expand "Eddie Says" to a larger selection of chords. As in Find Eddie, expand to larger fretboards and/or capo mode. 
5) Add backend for user management, keeping score etc.
