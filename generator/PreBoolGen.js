PreBoolGen = function(options){
  this.level = options.level === undefined ? Random.range(1, 3) : options.level;
  this.type = options.type === undefined ? 'withoutVaribles' : options.type;
  this.variableCount = options.variableCount === undefined ? Random.range(1, 3) : options.variableCount;

  switch(this.type){
    case 'Without varibles':
      this.expression = new Collection(this.level, {variableCount: 2});
      this.values = [];
      this.values['A'] = true;
      this.values['B'] = false;
      break;
    case 'With variables':
      this.expression = new Collection(this.level, {variableCount: this.variableCount});
      this.alphabit = Alphabet.genArray(this.variableCount);
      this.values = Alphabet.getLetterAndBooleanArray(this.variableCount);
      break;
    case 'Arithmetic comparison':
      this.expression = new Collection(this.level, {Single: SingleArithmeticComp});
      break;
    case 'With any values':
      var multipleExpression = new Collection(this.level, {variableCount: this.variableCount});
      this.alphabit = Alphabet.genArray(this.variableCount);
      var sepered = this.sepereteMultipleExression(multipleExpression, 0, []);
      break;
  }
};

PreBoolGen.prototype.getAnswer = function(){
  var ans;
  switch(this.type){
    case 'Without varibles':
    case 'With variables':
      ans = this.expression.getAnswer(this.values);
      break;
    case 'Arithmetic comparison':
      ans = this.expression.getAnswer();
      break;
    case 'With any values':
      ans = this.getAnswerWithAnyValues(0, []);
      break;
  }
  return ans;
}

PreBoolGen.prototype.getExpressionText = function(){
  var str;
  switch(this.type){
    case 'Without varibles':
      str = this.toStrWithoutVariable();
      break;
    case 'With variables':
      str = this.toStrExpression();
      str+= '; ' + this.toStrVariable(this.values);
      break;
    case 'Arithmetic comparison':
    case 'With any values':
      str = this.toStrExpression();
      break;
  }
  return str;
}

PreBoolGen.prototype.sepereteMultipleExression = function(count, values){
  if(count == this.variableCount){
    return this.toStrVariable(values) + ' => ' + this.expression.getAnswer(values);
  }else{
    var str = '';
    values[this.alphabit[count]] = true;
    str += this.getAnswerWithAnyValues(count+1, values) + '/n';
    values[this.alphabit[count]] = false;
    str += this.getAnswerWithAnyValues(count+1, values) + '/n';
    return str;
  }
}


PreBoolGen.prototype.getAnswerWithAnyValues = function(count, values){
  if(count == this.variableCount){
    return this.toStrVariable(values) + ' => ' + this.expression.getAnswer(values);
  }else{
    var str = '';
    values[this.alphabit[count]] = true;
    str += this.getAnswerWithAnyValues(count+1, values) + '/n';
    values[this.alphabit[count]] = false;
    str += this.getAnswerWithAnyValues(count+1, values) + '/n';
    return str;
  }
}

PreBoolGen.prototype.toStrWithoutVariable = function(){
  var str = this.toStrExpression();
  str = str.replace(new RegExp('A', 'g'), 'True').replace(new RegExp('B', 'g'), 'False');
  return str;
}


PreBoolGen.prototype.toStrVariable = function(values){
  var arr = [];
  for(var i=0; i<this.variableCount; i++){
    arr.push(this.alphabit[i] + '=' + values[this.alphabit[i]]);
  }
  return arr.join('; ');
}

PreBoolGen.prototype.toStrExpression = function(){
  var str = this.expression.getExpressionText(this.values);
  if((str.slice(-1) === ')') && (str[0] !== 'n'))
    str = str.slice(0, -1);
  if(str[0] === '(')
    str = str.substr(1);
  return str;
}
