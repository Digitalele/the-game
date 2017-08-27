function Blackjack() {
    this.cards = [];
    this.suits = ["spades", "hearts", "clubs", "diams"];
    this.numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

}

Blackjack.prototype.getRoot = function() {
    var output = document.getElementById("output");
    return output;

}

Blackjack.prototype.createDeck = function() {
    var suits = this.suits;
    var numb = this.numb;
    var cards = this.cards
    for (s in suits) {
        var suit = suits[s][0].toUpperCase();
        console.log(suit);
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


Blackjack.prototype.startGame = function() {

    this.createDeck();
    this.outputCards();
    this.shuffleDeck(this.cards);
    this.outputCards();


}

Blackjack.prototype.shuffleDeck = function(array) {
    console.log(array);
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;

    }
    return array;

}

Blackjack.prototype.outputCards = function() {
    var cards = this.cards;
    var bgcolor = this.bgcolor;
    console.log(bgcolor)
    var randomNum = random();
    output.innerHTML += "<span style='color:" + cards[0].bgcolor + "'>&" + cards[0].icon + ";" + cards[0].cardnum + "</span>  ";
    console.log(output.innerHTML)

}


Blackjack.prototype.buttonHandler = function() {
    var button = document.getElementById("btn-start");
    var that = this;
    button.onclick = function() {
        that.startGame();
    }
}

//function random
function random() {
    return Math.floor((Math.random() * 52));
}


//Dealer
function Dealer() {

}

Dealer.prototype = Object.create(Blackjack.prototype);
Dealer.prototype.constructor = Dealer;


//Player
function Player() {

}

Player.prototype = Object.create(Blackjack.prototype);
Player.prototype.constructor = Player;

var bj = new Blackjack()

bj.buttonHandler();