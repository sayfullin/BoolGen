SingleArithmeticComp = function(){
  this.operator = Random.event(
    {event: '=', chance: 20},
    {event: '!=', chance: 20},
    {event: '>', chance: 20},
    {event: '<', chance: 20},
    {event: '<=', chance: 10},
    {event: '>=', chance: 10}
  )
		
  this.rightSide = Random.range(-10, 10);
  this.leftSide1 = Random.range(-8, 8);

  this.result = Random.getBoolean();
	this.result = false;
	
  if(this.result){
    switch(this.operator){
      case '=':
        this.leftSide2 = this.rightSide - this.leftSide1;
        break;
      case '!=':
				if(Random.getBoolean()) // for exclude 0
					this.leftSide2 = this.rightSide - this.leftSide1 + Random.range(1, 5);
				else
					this.leftSide2 = this.rightSide - this.leftSide1 + Random.range(-1, -5);
        break;
      case '<':
        this.leftSide2 = this.rightSide - this.leftSide1 + Random.range(-5, -1);
        break;
      case '>':
        this.leftSide2 = this.rightSide - this.leftSide1 + Random.range(1, 5);
        break;
      case '<=':
        this.leftSide2 = this.rightSide - this.leftSide1 + Random.range(-5, 0);
        break;
      case '>=':
        this.leftSide2 = this.rightSide - this.leftSide1 + Random.range(0, 5);
        break;
    }
  }else{
    switch(this.operator){
      case '=':
				if( Random.getBoolean())// for exclude 0
					this.leftSide2 = this.rightSide - this.leftSide1 + Random.range(1, 5);
				else
					this.leftSide2 = this.rightSide - this.leftSide1 + Random.range(-1, -5);
        break;
      case '!=':
        this.leftSide2 = this.rightSide - this.leftSide1;
        break;
      case '<':
        this.leftSide2 = this.rightSide - this.leftSide1 + Random.range(0, 5);
        break;
      case '>':
        this.leftSide2 = this.rightSide - this.leftSide1 + Random.range(-5, 0);
        break;
      case '<=':
        this.leftSide2 = this.rightSide - this.leftSide1 + Random.range(1, 5);
        break;
      case '>=':
        this.leftSide2 = this.rightSide - this.leftSide1 + Random.range(-5, -1);
        break;
    }
  }
}

SingleArithmeticComp.prototype.getAnswer = function(){
  return this.result;
}

SingleArithmeticComp.prototype.getExpressionText = function(){
  if(this.leftSide2 < 0){
    var str = this.leftSide1 + ' - ' + (-this.leftSide2) + ' ' + this.operator + ' ' + this.rightSide;
  }else{
    var str = this.leftSide1 + ' + ' + this.leftSide2 + ' ' + this.operator + ' ' + this.rightSide;
  };

  return '(' + str + ')';
}
