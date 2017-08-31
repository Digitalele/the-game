// BLACKJACK CONSTRUCTOR //
// ===================== //

function Blackjack(numberOfPlayers) {
  this.cards = [];

  this.numberOfPlayers = numberOfPlayers;

  this.playersList = [];

  this.dealerHand = [];

  this.dealerCardsCount = 0;

  this.dealerCardsCount2 = {
    optionOne : 0,
    optionTwo : 0
  };

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
  this.cards = this.deck.shuffleDeck(this.deck.cards);

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

Blackjack.prototype.buttonStand = function() {
  var button = document.getElementById("btnHold");
  var that = this;
  button.onclick = function() {
    that.playerActions("stand");
  }
}



Blackjack.prototype.newGame = function() {
  
  var betValue = document.getElementById("playerBet").value;

  this.playersList[0].chips -= betValue;
  this.playerHolder.innerHTML = this.playersList[0].chips;

  var style = document.getElementById("playerActions").style.display = "block";

  this.message.innerHTML = "Get 21 or higher than dealer <br> your bet is: €" + betValue + "";

  //disable input
  document.getElementById("playerBet").disabled = true;
  document.getElementById("maxBet").disabled    = true;

  this.firstHand();
}

Blackjack.prototype.firstHand = function() {
 
  this.dealerHolder.innerHTML = '';
  this.playerHolder.innerHTML = '';

  // check later
  //this.dealerHolder.innerHTML += '<div id="cover" style="left:100px;"></div>';
  for (var i = 0; i < 2; i++) {

    // Dealer HAND
    this.dealerHand.push(this.cards.shift());
    this.dealerHolder.innerHTML += this.drawCards(this.dealerHand[i], this.dealerHand.length);
    this.countCards(true, this.dealerHand[i]);

    this.dealerValue.innerHTML = this.dealerCardsCount;
    console.log();

    // PLAYER HAND
    this.playersList[0].hand.push(this.cards.shift());
    this.playerHolder.innerHTML += this.drawCards(this.playersList[0].hand[i], this.playersList[0].hand.length);
    this.countCards(false, this.playersList[0].hand[i]);

    this.playerValue.innerHTML = this.playersList[0].cardsCount;
  }
  console.log('dealer hand', this.dealerHand)
  console.log('player hand', this.playersList)
}


Blackjack.prototype.drawCards = function(card, position) {
    var position = (position > 0) ? position * 60 + 100 : 100;
    //console.log('this.cards',this.cards);
   
    return `
      <div class="icard ${card.icon}" style="left:${position}px;">
        <div class="top-card suit">${card.name}<br></div>
        <div class="content-card suit"></div>
        <div class="bottom-card suit">${card.name}<br></div>
      </div>
    `;
}

Blackjack.prototype.countCards = function(dealer, card) {
  switch(card.name) {
    case 'A' :
      if(dealer) {
        this.dealerCardsCount + 11 > 21 ? 
        this.dealerCardsCount += 1 : 
        this.dealerCardsCount += 11;
      } else {
        this.playersList[0].cardsCount + 11 > 21 ? 
        this.playersList[0].cardsCount += 1 : 
        this.playersList[0].cardsCount += 11;
      }
      break;
    case 'J' : 
    case 'Q' : 
    case 'K' :
      dealer ? 
      this.dealerCardsCount += 10 : 
      this.playersList[0].cardsCount += 10;
      break;
    default  :
      dealer ? 
      this.dealerCardsCount += parseInt(card.name) : 
      this.playersList[0].cardsCount += parseInt(card.name);
      break;
  }

  //console.log('this.dealerCardsCount', this.dealerCardsCount);
  //console.log('this.playersList[0].cardsCount', this.playersList[0].cardsCount);
  this.playersList[0].cardsCount > 21 ? this.gameOver() : false;
}
Blackjack.prototype.asCase = function(currentHand){
  
}

Blackjack.prototype.gameOver = function() {
  // if(this.playersList[0].cardsCount === 21 || this.playersList[0].cardsCount){

  // }
  console.log('LOSER');
}

Blackjack.prototype.checkForTheWinner = function() {
  console.log('checking winner');
  // var playervalue = countCards(false, this.playersList[0].hand[i]);
  // if (playervalue === 21 && this.playersList[0].hand.length == 2) {
  //   this.message.innerHTML = "Player Blackjack";
  // }
}


Blackjack.prototype.dealerHit = function() {
  console.log('hit')

  var newCard = this.cards.shift();

  this.dealerHand.push(newCard);

  var cardPosition = this.dealerHand.length-1;

  this.dealerHolder.innerHTML += this.drawCards(this.dealerHand[cardPosition], this.dealerHand.length);

  this.countCards(true, this.dealerHand[cardPosition]);
  console.log(this.dealerCardsCount)

  this.dealerValue.innerHTML = this.dealerCardsCount;

}


Blackjack.prototype.stand = function() {
  //  while (this.dealerCardsCount < 17) {
  //   this.dealerHit()
  // }
  
}


Blackjack.prototype.hit = function() {
  // Pushing new card in the player hand
  var newCard = this.cards.shift();
  
  this.playersList[0].hand.push(newCard);

  //print cards
  console.log(this.playersList[0].hand.length);

  var cardPosition = this.playersList[0].hand.length-1;

  this.playerHolder.innerHTML += this.drawCards(this.playersList[0].hand[cardPosition], this.playersList[0].hand.length);
  this.countCards(false, this.playersList[0].hand[cardPosition]);


  //increment value
  this.playerValue.innerHTML = this.playersList[0].cardsCount;
  
}



// TODO:   STAND, DOUBLE, SPLIT
Blackjack.prototype.playerActions = function(action) {
  switch(action){
    case 'hit':
    this.hit();
    break;

    case 'stand':
    this.dealerHit();
    //playEnd();
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


//  DECK CONSTRUCTOR  //
// ================== //

//fix this
function Deck(cards, suits, names, cardsCount) {
    //new properties
  this.suits = ["spades", "hearts", "clubs", "diams"];
  this.names = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
  this.cards = [];
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

Deck.prototype.createDeck = function() {
  var suit, color, card;

  for (s in this.suits) {
    suit  = this.suits[s][0].toUpperCase();
    color = (suit == "S" || suit == "C") ? "black" : "red";

    for (name in this.names) {

      card = {
        suit  : suit,
        icon  : this.suits[s],
        color : color,
        name  : this.names[name]
      }
      this.cards.push(card);
    }
  }
};



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
  bj.buttonStand();

});
