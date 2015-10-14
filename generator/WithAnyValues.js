WithAnyValues = function(options){
  this.level = options.level === undefined ? Random.range(1, 3) : options.level;
  this.type = options.type === undefined ? 'withoutVaribles' : options.type;
  this.variableCount = options.variableCount === undefined ? Random.range(1, 3) : options.variableCount;
  this.multipleExpression = new Collection(this.level, {variableCount: this.variableCount});
  this.alphabit = Alphabet.genArray(this.variableCount);
  this.expression = new Collection(this.level, {variableCount: this.variableCount});
  this.expressions = [];
  this.sepereteMultipleExression(0, []);
}

WithAnyValues.prototype.sepereteMultipleExression = function(count, values){
  if(count == this.variableCount){
    this.expressions.push(new WithValues(this, values));
  }else{
    values[this.alphabit[count]] = true;
    this.sepereteMultipleExression(count+1, values);
    values[this.alphabit[count]] = false;
    this.sepereteMultipleExression(count+1, values);
  }
}

WithValues = function(multipleExpression, values){
  this.level = multipleExpression.level;
  this.variableCount = multipleExpression.variableCount;
  this.expression = multipleExpression.expression;
  this.alphabit = multipleExpression.alphabit;
  this.values = [];
  for(var i=0, len=this.alphabit.length; i<len; i++){
    this.values[this.alphabit[i]] = values[this.alphabit[i]];
  }
  this.type = 'With variables';
}

WithValues.prototype = Object.create(PreBoolGen.prototype);
