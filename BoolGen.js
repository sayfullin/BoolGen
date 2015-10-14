BoolGen = function(options){
	if(options == undefined)
		options = {};	
	if(options.type == undefined)
		options.type = 'Without varibles';
		
  if(options.type != 'With any values'){
    // return object
    var preBoolGen = new PreBoolGen(options);
    var expr = {};
    expr.task = preBoolGen.getExpressionText();
    expr.answer = preBoolGen.getAnswer();
    return expr;
  }else{
    // return array of object
    var withAnyValues = new WithAnyValues(options);
    var expressions = [];
    for(var i=0, len=withAnyValues.expressions.length; i<len; i++){
      var expr = {};
      expr.task = withAnyValues.expressions[i].getExpressionText();
      expr.answer = withAnyValues.expressions[i].getAnswer();
      expressions.push(expr);
    }
    return expressions;
  }

}
