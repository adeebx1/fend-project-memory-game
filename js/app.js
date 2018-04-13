
const types =["fa-diamond","fa-diamond","fa-paper-plane-o","fa-paper-plane-o",
"fa-anchor","fa-anchor","fa-bolt","fa-bolt","fa-cube","fa-cube",
"fa-leaf","fa-leaf","fa-bicycle","fa-bicycle","fa-bomb","fa-bomb"];
let shuffledCards = shuffle(types);
let twoCards =[0,0]; // list of  the two opened cards
let matchList =[]; // list of matched cards
let count = 0; //count clicked cards
let matchedCounter =0; //count matched cards 
let resuem =true; // condition for eventListener
let moves = 0; // count number of moves
const cards = document.getElementsByClassName('card'); // list of cards
const stars = document.getElementsByClassName('star'); // list of stars
let stopWatch = document.getElementsByTagName('time')[0]; // for the timer
let seconds = 0, minutes = 0, time; // for the timer



 document.querySelector('.restart').addEventListener('click', restartGame, true ); // listen for restart button

// function to reset all childern elements of class cards and stars when restart
function resetAll(){
    for (i=0; i<cards.length; i++){
        cards[i].classList.remove('match','open','show');
        cards[i].innerHTML='';
    }
    for (j=0; j<stars.length; j++){
        stars[j].classList.replace('fa-star-o','fa-star');
    }


}


// function to restart the game
function restartGame(){
    resetAll();
    shuffledCards = shuffle(types);
    insertAll();
    twoCards =[];
    matchList =[];
    count = 0;
    resuem= true;
    matchedCounter =0;
    moves =0;
    resetTimer();
}




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



//class to insert the innerHTML of class card when start
function insertAll(){
    for (i=0; i<cards.length; i++){
        cards[i].innerHTML='<i class="fa '+shuffledCards[i]+'"></i>';
    }
    document.querySelector("span").innerHTML = 0;  // reset the #moves

    $( ".deck" ).effect( "highlight", {}, 500);
    $( ".card" ).effect( "highlight", {}, 500);
}




//timer and resetTimer functions from https://jsfiddle.net/Daniel_Hug/pvk6p/ with some modifications
function timer() {
     seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    
    stopWatch.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
     ":" + (seconds > 9 ? seconds : "0" + seconds);

    time = setTimeout(timer, 1000);

    time;
}

//function to reset the timer
function resetTimer(){
    stopTimer();
    stopWatch.textContent = "00:00";
    seconds = 0; minutes = 0;
}

//function to stop the timer
function stopTimer(){
    clearTimeout(time, 1000); // stop the timer
}



// this function will listen for a click and open the cards
function ON_CLICK(){
    for (let k = 0; k < cards.length; k++) {
    cards[k].addEventListener('click', function() {
    if (resuem){
    if (count == 0) {
         cards[twoCards[0]].classList.remove('lastMatch');
         cards[twoCards[1]].classList.remove('lastMatch');
         cards[k].classList.add('open', 'show');
         twoCards[0]= k;
         count++;
         if (moves == 1){
            timer();
         }
    }
    else if (count == 1 && k != twoCards[0] ){
        twoCards[1] = k;
        cards[k].classList.add('open', 'show');
        moves++;
        count =0;
        resuem =false;      // disable evetListener for a while
        setTimeout(function (){chickMatch();}, 350);
                   
    }

    moves_stars();
    }
    });

}
}



//this function will count the number of moves and based on that will decrease the stars 
function moves_stars(){
    document.querySelector("span").innerHTML = moves;

    if (moves>16&& moves < 30){
        stars[2].classList.replace('fa-star','fa-star-o');
    }
    else if (moves > 30 ){
        stars[1].classList.replace('fa-star','fa-star-o');
    }


}

// this function will check if the two clicked cards
function  chickMatch(){
    if (shuffledCards[twoCards[0]] == shuffledCards[twoCards[1]]){
        Match();
    }
    else{
        notMatch();
    }
    resuem = true;      // to enable openning the cards
}

// this function will mark the two matched card and add their type to the list
// the animiation effects from https://jqueryui.com/effect/
function Match(){
      for (let i = 0; i < twoCards.length; i++) {
        cards[twoCards[i]].classList.remove('open','show');
        cards[twoCards[i]].classList.add('match','lastMatch');
      }
      matchList[matchedCounter] = shuffledCards[twoCards[0]];
      matchedCounter++;
     $( ".card.lastMatch" ).effect( "bounce", {}, 500);
      if (matchedCounter == 8){
        setTimeout(function (){finish();}, 1000); 
        
    }
}

// this function will reset the non matched cards
function notMatch(){
    $( ".card.open" ).effect( "shake", {}, 500);
      for (let i = 0; i < twoCards.length; i++) {
        cards[twoCards[i]].classList.remove('open','show');
      }
     
}

// this function will return a string that contain the time taken to solve the game and the deserved stars

function report(){

    let winStars = document.getElementsByClassName('fa-star').length; // final number of stars 
    let str ='YOU FINISH THE GAME IN ';

    if (minutes==0){
       str += seconds+" SECONDS";  
    }
    else{
        str+= minutes+" MINUTES AND "+ seconds+" SECONDS"; 
    }

    if (winStars >1){
        str+=  "\n YOU GOT "+ winStars +" STARS";
    }

    else{
         str+=  "\n YOU GOT "+ winStars +" STAR";
    }

    return str;
}


// this function will pop up the window with the final resultes and ask for paly again
function finish(){
    resuem=false; // to ignore the clicking
    stopTimer();
    let result = report();
    if (confirm("CONGRATULATION!\n"+ result + "\n Do you want to play again? ")) {
       restartGame();
}
 
}


 function main(){
    insertAll();
    ON_CLICK();

 }
