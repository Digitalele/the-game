function Blackjack() {
    this.cards = [];
    this.suits = ["spades", "hearts", "clubs", "diams"];
    this.numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    this.cardCount = 0;

}

Blackjack.prototype.getRoot = function() {
    var output = document.getElementById("output");
    return output;

    var dealerHolder = document.getElementById("dealerHolder");
    return dealerHolder;

    var playerHolder = document.getElementById("dealerHolder");
    return playerHolder;

    console.log(playerHolder, dealerHolder);

}

Blackjack.prototype.startGame = function(options) {
    deck = options.deck;

    deck.createDeck();
    deck.shuffleDeck(deck.cards);
    deck.outputCards();

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
  var cards = options.deck.cards;
  var cardCount = options.deck.cardCount;

  var playerCard = [];
  var dealerCard = [];
  
  var dealerHolder = options.dealer;
  var playerHolder = options.player;

  console.log(dealerHolder, playerHolder)

  dealerHolder.innerHTML = '';
  playerHolder.innerHTML = '';

  for (var i = 0; i < 2; i++) {

    dealerCard.push(cards[cardCount]);
    cardCount ++;

    playerCard.push(cards[cardCount]);
    cardCount ++;

    console.log(dealerCard);
    console.log(playerCard);
    
  }

}

//Deck constructor
function Deck(cards, suits, numb, cardCount) {
    Blackjack.call(this, cards, suits, numb);
    //new properties
}

Deck.prototype.shuffleDeck = function(array) {
    console.log(array);
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
    return array;
}

Deck.prototype.outputCards = function() {
    var cards = this.cards;
    var bgcolor = this.bgcolor;
    var cardCount = this.cardCount;
    var randomNum = random();
    output.innerHTML += "<span style='color:" + cards[cardCount].bgcolor + "'>&" + cards[cardCount].icon + ";" + cards[cardCount].cardnum + "</span>  ";
    console.log(output.innerHTML)

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
  this.dealerHolder = [];
}

Dealer.prototype = Object.create(Blackjack.prototype);
Dealer.prototype.constructor = Dealer;

Dealer.prototype.newDeal = function(){
  return "";
}


//Player constructor
function Player() {
  this.playerCard = [];
}

Player.prototype = Object.create(Blackjack.prototype);
Player.prototype.constructor = Player;

Player.prototype.newDeal = function(){
  return "";
}

//options
var options = {
    deck: new Deck(),
    dealer: new Dealer(),
    player: new Player()
};

//obj creation
var bj = new Blackjack(options)

//handler
bj.buttonHandler();