function Blackjack() {
    this.cards = [];
    this.suits = ["spades", "hearts", "clubs", "diams"];
    this.numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    this.cardCount = 0;

    this.output = document.getElementById("output");

    this.dealerHolder = document.getElementById("dealerHolder");

    this.playerHolder = document.getElementById("playerHolderHolder");

}

//Blackjack.prototype.getRoot = function() {}

Blackjack.prototype.startGame = function(options) {

    deck = options.deck;

    deck.createDeck();
    deck.shuffleDeck(deck.cards);
    //deck.outputCards();

    this.newGame(options); //pass argument for set newGame

}

Blackjack.prototype.buttonHandler = function() {
    var button = document.getElementById("btn-start");
    var that = this;
    button.onclick = function() {
        that.startGame(options);
    }
}

Blackjack.prototype.newGame = function(options) {
  //from options because of i need the property of the object, NB if i take this.cards i will take empty value
  var deck = options.deck;
  var cards = options.deck.cards;
  var cardCount = options.deck.cardCount;
  
  var playerCard = [];//
  var dealerCard = [];//

  console.log(playerCard, dealerCard)

  dealerHolder.innerHTML = '';
  playerHolder.innerHTML = '';

  for (var i = 0; i < 2; i++) {

    dealerCard.push(cards[cardCount]);
    dealerHolder.innerHTML += deck.outputCards(cardCount, i);
    if (i == 0) {
        dealerHolder.innerHTML += '<div id="cover" style="left:100px;"></div>';
    }
    cardCount ++;

    playerCard.push(cards[cardCount]);
    playerHolder.innerHTML += deck.outputCards(cardCount, i);
    cardCount ++;

    console.log(cardCount)
    console.log(dealerCard);
    console.log(playerCard);
    
  }

}

//Deck constructor
//apply call for extend the property from Blackjack to Deck
function Deck(cards, suits, numb, cardCount) {
    Blackjack.call(this, cards, suits, numb, cardCount);
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

Deck.prototype.outputCards = function(count, pos) {
    var pos = (pos > 0) ? pos * 60 + 100 : 100;
    var cards = this.cards;
    console.log(output.innerHTML)
    return '<div class="icard ' + cards[count].icon + '" style="left:' + pos + 'px;"> <div class="top-card suit">' + cards[count].cardnum + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + cards[count].cardnum + '<br></div> </div>';
    
}

Deck.prototype.createDeck = function() {
    var suits = this.suits;
    var numb = this.numb;
    var cards = this.cards
    for (s in suits) {
        var suit = suits[s][0].toUpperCase();
        var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";

        for (n in numb) {
            var cardValue = (n > 9) ? 10 : parseInt(n) + 1
            var card = {
                suit: suit,
                icon: suits[s],
                bgcolor: bgcolor,
                cardnum: numb[n],
                cardvalue: cardValue
            }
            cards.push(card);
        }
    }

}

//function random
function random() {
    return Math.floor((Math.random() * 52));
}


//Dealer constructor
function Dealer() {
  this.dealerCard = [];
}

Dealer.prototype = Object.create(Blackjack.prototype);
Dealer.prototype.constructor = Dealer;

// Dealer.prototype.newDeal = function(){
//   return "";
// }


//Player constructor
function Player() {
  this.playerCard = [];
}

Player.prototype = Object.create(Blackjack.prototype);
Player.prototype.constructor = Player;

// Player.prototype.newDeal = function(){
//   return "";
// }

//options for take the method and property in objects.

var options = {
    deck: new Deck(),
    dealer: new Dealer(),
    player: new Player()
};

//obj creation
var bj = new Blackjack(options)

//handler
bj.buttonHandler();