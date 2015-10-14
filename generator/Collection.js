Collection = function(quantity, options){
  options.Single = options.Single ? options.Single : SingleVariable;
  this.quantity = quantity;
  this.content = this.createCollectionConnent(quantity, options);
  this.operators = this.createCollectionOperators(this.content.length - 1);
}

Collection.prototype.createCollectionConnent = function(quantity, options){
  var content = [];
  while(quantity >= 2){
    var element;
    var elementType = Random.event(
      {event: 'Boolean', chance: 40},
      {event: 'Negation', chance: 20},
      {event: 'Collection', chance: 40}
    );
    switch(elementType){
      case 'Boolean':
        element = new options.Single(options.variableCount);
        quantity--;
        break;
      case 'Collection':
        var newCollectionQuality = Random.range(2, quantity-1);
        element = new Collection(newCollectionQuality, options)
        quantity-= newCollectionQuality;
        break;
      case 'Negation':
        var newCollectionQuality = Random.range(1, quantity-1);
        element = new Negation(newCollectionQuality, options);
        quantity-= newCollectionQuality + 1;
        break;
    }
    content.push(element)
  }
  if(quantity === 1){
    var elementType = Random.event(
      {event: 'Boolean', chance: 80},
      {event: 'Negation', chance: 20}
    );
    switch(elementType){
      case 'Boolean':
        element = new options.Single(options.variableCount);
        break;
      case 'Negation':
        element = new Negation(1, options);
        break;
    }
    content.push(element)
  }
  return content;
}

Collection.prototype.createCollectionOperators = function(length){
  operators = [];
  for(var i=0; i< length; i++){
    var operator =  Random.event(
      {event: 'and', chance: 40},
      {event: 'or', chance: 40},
      {event: 'xor', chance: 20}
    );
    operators.push(operator);
  }
  return operators;
}

Collection.prototype.getAnswer = function(variblesValues){
  var value = this.content[0].getAnswer(variblesValues);
  for(var i=0; i< this.operators.length; i++){
    var nextValue = this.content[i+1].getAnswer(variblesValues);
    switch(this.operators[i]){
      case 'and':
        value = value && nextValue;
        break;
      case 'or':
        value = value || nextValue;
        break;
      case 'xor':
        value = ( value || nextValue ) && !( value && nextValue );
    }
  }
  return value;
}

Collection.prototype.getExpressionText = function(){
  if(this.content.length === 1)
    return this.content[0].getExpressionText();
  else{
    var str = this.content[0].getExpressionText();
    for(var i=0; i< this.operators.length; i++)
      str += ' ' + this.operators[i] + ' ' + this.content[i+1].getExpressionText();
    return '(' + str +')';
  }
}
