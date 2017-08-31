// BLACKJACK CONSTRUCTOR //
// ===================== //

function Blackjack(numberOfPlayers) {
  this.cards = [];
  this.suits = ["spades", "hearts", "clubs", "diams"];
  this.numb = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

  this.numberOfPlayers = numberOfPlayers;

  this.playersList = [];

  this.dealerHand = [];

  this.dealerCardsCount = 0;

  //message
  this.message = document.getElementById("message");

  //output
  this.output = document.getElementById("board");

  //holder
  this.dealerHolder = document.getElementById("dealerHolder");
  this.playerHolder = document.getElementById("playerHolder");
  this.playerCoins  = document.getElementById('playerCoins');

  //value
  this.playerValue = document.getElementById("pValue");
  this.dealerValue = document.getElementById("dValue");
}


Blackjack.prototype.startGame = function() {

  this.deck = new Deck();

  this.deck.createDeck();
  this.deck.shuffleDeck(this.deck.cards);

  this.sitPlayers();
  this.newGame();

  document.getElementById('btnStart').style.display = "none";
  this.playerCoins.innerHTML = this.playersList[0].chips;
}

Blackjack.prototype.sitPlayers = function() {
  for(var i = 0; i < this.numberOfPlayers; i++) {
    var numberOfChips = 15000;
    this.playersList.push(new Player(numberOfChips));
  }
  console.log('this.playersList', this.playersList);
}


Blackjack.prototype.buttonStart = function() {
  var button = document.getElementById("btnStart");
  var that = this;
  button.onclick = function() {
    that.startGame();
  }
}


Blackjack.prototype.buttonHit = function() {
  var button = document.getElementById("btnHit");
  var that = this;
  button.onclick = function() {
    that.playerActions("hit");
  }
}



Blackjack.prototype.newGame = function() {
  
  var betValue = document.getElementById("playerBet").value;
  
  console.log('this.playersList', this.playersList[0]);
  this.playersList[0].chips -= betValue;
  this.playerHolder.innerHTML = this.playersList[0].chips;

  var style = document.getElementById("playerActions").style.display = "block";

  this.message.innerHTML = "Get 21 or higher then dealer <br> your bet is: €" + betValue + "";

  //disable input
  document.getElementById("playerBet").disabled = true;
  document.getElementById("maxBet").disabled    = true;

  console.log('this.playerCoins',this.playerCoins);

  this.firstHand();
}

Blackjack.prototype.firstHand = function() {
 
  this.dealerHolder.innerHTML = '';
  this.playerHolder.innerHTML = '';

  // check later
  //this.dealerHolder.innerHTML += '<div id="cover" style="left:100px;"></div>';

  for (var i = 0; i < 2; i++) {

    // Dealer HAND
    this.dealerHand.push(this.deck.cards.shift());
    this.dealerHolder.innerHTML += this.deck.outputCards(this.dealerCardsCount, i);
    
    console.log('dealer hand', this.dealerHand)

    // PLAYER HAND
    this.playersList[0].hand.push(this.deck.cards.shift());
    console.log('player hand', this.playersList)


    this.playerHolder.innerHTML += this.deck.outputCards(this.playersList[0].cardsCount, i);
    
  }
}


// TODO:   STAND, DOUBLE, SPLIT
Blackjack.prototype.playerActions = function(action) {
  switch(action){
    case 'hit':
    this.hit();
    break;

    case 'stand':
    playEnd();
    break;

    case 'double':
    playDouble();
    playEnd();
    break;

    default:
    console.log('default');
    playEnd();
  }
}

Blackjack.prototype.hit = function() {
  
  // Pushing new card in the player hand
  var newCard = this.deck.cards.shift();
  
  this.playersList[0].hand.push(newCard);
 
  // switch that return case values
  var card = this.asCase(newCard.cardnum);

  this.playersList[0].cardsCount += card;  // FIX !!! VALUE, not a STRING 
  
  this.playerValue.innerHTML += this.deck.outputCards(this.playersList[0].cardsCount, i);
  
}

// Blackjack.prototype.calcHandValue = function(currentHand) {
  
// }


Blackjack.prototype.asCase = function(currentHand){

  switch(currentHand){
    case 'A': 
    console.log('a')
      if(currentHand <= 11){
        return 11;
      } else {return 1}
  
    break;
    case 'K': console.log('k'); return 10;
    
    break
    case 'Q' : console.log('q'); return 10;
    
    break;
    case 'J' : console.log('j'); return 10;
    
    break;
    default: return currentHand;
  }


}


//  DECK CONSTRUCTOR  //
// ================== //

//apply call for extend the property from Blackjack to Deck
function Deck(cards, suits, numb, cardsCount) {
    Blackjack.call(this, cards, suits, numb, cardsCount);
    //new properties
}

Deck.prototype.shuffleDeck = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
    return array;
}

Deck.prototype.outputCards = function(value, position) {
    var position = (position > 0) ? position * 60 + 100 : 100;
    //console.log('this.cards',this.cards);
   
    return `
      <div class="icard ${this.cards[value].icon}" style="left:${position}px;">
        <div class="top-card suit">${this.cards[value].cardnum}<br></div>
        <div class="content-card suit"></div>
        <div class="bottom-card suit">${this.cards[value].cardnum}<br></div>
      </div>
    `;
}

Deck.prototype.createDeck = function() {

    for (s in this.suits) {
        var suit = this.suits[s][0].toUpperCase();
        var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";

        for (n in this.numb) {
            var cardValue = (n > 9) ? 10 : parseInt(n) + 1
            var card = {
                suit: suit,
                icon: this.suits[s],
                bgcolor: bgcolor,
                cardnum: this.numb[n]
            }
            this.cards.push(card);
        }
    }

}



// PLAYER CONSTRUCTOR //
// ================== //
function Player(chips) {
  this.hand = [];
  this.chips       = chips;
  this.cardsCount  = 0;
}




//    INITIALIZE      // 
// ================== //
var bj;


document.addEventListener('DOMContentLoaded', function(event) {
  //obj creation
  bj = new Blackjack(1);

  //handler
  bj.buttonStart();
  bj.buttonHit(); 

});
