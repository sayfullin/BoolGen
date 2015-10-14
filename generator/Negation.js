Negation = function(quantity, options){
  this.quantity = quantity;
  if(quantity == 1)
    this.content = new options.Single(options.variableCount);
  else{
    this.content = new Collection(this.quantity, options);
  }
}

Negation.prototype.getAnswer = function(variblesValues){
  return !this.content.getAnswer(variblesValues);
}

Negation.prototype.getExpressionText = function(){
  return 'not ' + this.content.getExpressionText();
}
