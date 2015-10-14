SingleVariable = function(variableCount){
  this.content = Alphabet.getRandomLetter(variableCount);
}

SingleVariable.prototype.getAnswer = function(variblesValues){

  return variblesValues[this.content];
}

SingleVariable.prototype.getExpressionText = function(){
  return this.content;
}
