/* 
 * Create a list that holds all of your cards.
 */

/*List of all cards images, two copies of each image*/
const faIcons = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", 
"fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

const allCards = faIcons.concat(faIcons);

let deck = document.querySelector(".deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*Container for shuffled cards*/
let shuffledCards = [];
/*Card shuffling with provided function*/
shuffledCards = shuffle(allCards);

/*Function, that creates card's HTML. For each element of container with 
shuffled cards, the function creates li element with class "card" and inside 
that li element, the i element with classes "fa" and corresponding class 
from shuffledCards container is created.*/
function newGame() {
 	for (let i = 0; i < shuffledCards.length; i++) {
 		let newCard = document.createElement("li");
 		newCard.classList.add("card");
 		let newCardImg = document.createElement("i");
 		newCardImg.classList.add("fa",""+shuffledCards[i]+"");
 		newCard.appendChild(newCardImg);

 		deck.appendChild(newCard);

 		click(newCard);

 	};
};


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
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


let openedList = [];
let matchedList = [];
let moves = 0;

/*When user click any card, the moves variable is incremented;
if the list of opened cards already has two cards, the function chceked if cards are equal,
but if the list of opened cards just have one card yet, function only adds "open", "show"
classes to the card and ands it to the list of opened card */

/*I decided, that one move counts when user click next two cards,
because of that score variable is moves/2 */

function click(newCard) {
	newCard.addEventListener("click", function() {
		moves++;
		if (openedList.length === 1) {
		newCard.classList.add("open","show","pointer");
		openedList.push(newCard);
		ifMatched(openedList[0], openedList[1]);
		let score = moves/2;
		document.querySelector(".moves").innerHTML = score + " Moves";
		starRate(score);
	} else {
		newCard.classList.add("open","show","pointer");
		openedList.push(newCard);
	};
	});
};


/*ifMathced function check if two card on the list of opened cards are equal.
If they are, "match" class is added to cards and cards also are added to the 
list of matched cards. List of opened cardes makes empty.

If the cards aren't equal, the classes "open" and "show" are removed to hide the card.
Timeout gives user some time to be able to see the hidden card. */


function ifMatched(card1, card2) {
	if(card1.innerHTML === card2.innerHTML) {
		
			card1.classList.add("match");
			card2.classList.add("match");
			matchedList.push(card1);
			matchedList.push(card2);
			openedList = [];

			win();		
	} else {
			setTimeout(function() {
			card1.classList.remove("open", "show","pointer");
			card2.classList.remove("open", "show","pointer");
			openedList = [];
		}, 250);
	};
};

/*The function win() check if the length of the list of mathced cards already 16,
that will tell the function, that all cards are already matched.
If they are, the function stop the timer and shows to user his score */


function win() {
	if(matchedList.length === 16) {
		stopTimer();
		document.querySelector(".modal-text").innerHTML = `You win! Score: ${moves/2} Time: ${formatTime()} 
			Star rate: ${starContainer} Do you want to play new game?`;
		document.querySelector(".modal").classList.remove("modal-visibility");
		document.querySelector(".play").addEventListener("click", function() {
			document.querySelector(".modal").classList.add("modal-visibility");
			document.location.reload();
		});
		document.querySelector(".cancel").addEventListener("click", function() {
			document.querySelector(".modal").classList.add("modal-visibility");
		});
	};
};




let star1 = document.querySelector(".star1");
let star2 = document.querySelector(".star2");
let star3 = document.querySelector(".star3");

let starContainer = 3;

/*The function starRate keeps information about star rating of the game.
For example if user made 15 moves, first star is hidden and starContainer 
variable switched to 2 (because user still has 2 stars on the board) */


function starRate(score) {
	if(score == 15) {
		star3.classList.add("hidden");
		starContainer = 2;
	}
	if(score == 20) {
		star2.classList.add("hidden");
		starContainer = 1;
	}
	if(score == 25) {
		star1.classList.add("hidden");
		starContainer = 0;
	}
};


/*Event listener for restart icon*/

document.querySelector(".restart").addEventListener("click", function() {
	document.location.reload();
});


/*Timer implementation from Technical Webinar with Ryan Waite*/

let minutes = 0;
let seconds = 0;

let timer = 0;

function startTimer() {
	timer = setInterval(function() {
		seconds++;
		formatTime();
		if(seconds == 60) {
			minutes++;
			seconds = 0;
		}

	}, 1000);
};

function stopTimer() {
	clearInterval(timer);
};

function formatTime() {
	let sec = seconds > 9 ? String(seconds) : "0" + String(seconds);
	let min = minutes > 9 ? String(minutes) : "0" + String(minutes);
	
	document.querySelector(".timer").innerHTML = min + ":" + sec;
	return min + ":" + sec;
};




newGame();
startTimer();