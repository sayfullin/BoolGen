Alphabet = function(){
  this.ALPHABET_LENGTH = 25;

  var source = [];
  i = 'A'.charCodeAt(0), j = 'Z'.charCodeAt(0);
  for (; i <= j; ++i) {
    source.push(String.fromCharCode(i));
  }
  this.SOURCE = source;

}

Alphabet.prototype.getRandomLetter = function(max){
  var rand = Random.range(0, max-1);
  var div = Math.floor(rand/this.ALPHABET_LENGTH);
  var mod = rand % this.ALPHABET_LENGTH;

  var newLetter = '';
  for(var i=0; i<=div; i++){
    newLetter+=this.SOURCE[mod];
  };
  return newLetter;
};

Alphabet.prototype.genArray = function(quantity){
  var div = Math.floor(quantity/this.ALPHABET_LENGTH);
  var mod = quantity % this.ALPHABET_LENGTH;

  var arrayToReturn = [];
  var count = 0;
  var level = 1;
  for (var i=0; i < quantity; i++){
    if(count === this.ALPHABET_LENGTH){
      count = 0;
      level++
    }
    var newLetter = '';
    for(var j=0; j<level; j++){
      newLetter+=this.SOURCE[count]
    }
    arrayToReturn.push(newLetter);
    count++;
  }
  return arrayToReturn;
}

Alphabet.prototype.getLetterAndBooleanArray = function(quantity){
  var div = Math.floor(quantity/this.ALPHABET_LENGTH);
  var mod = quantity % this.ALPHABET_LENGTH;

  var result = [];
  var count = 0;
  var level = 1;
  for (var i=0; i < quantity; i++){
    if(count === this.ALPHABET_LENGTH){
      count = 0;
      level++
    }
    var newLetter = '';
    for(var j=0; j<level; j++){
      newLetter+=this.SOURCE[count]
    }
    result[newLetter] = Random.getBoolean();
    count++;
  }
  return result;
};

Alphabet = new Alphabet();
