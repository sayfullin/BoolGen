Random = function(){}

Random.prototype.getBoolean = function(){
  return Math.random() > 0.5;
}

Random.prototype.event = function(){
 var randomPercent = this.range(1, 100);
 var passedPercents = 0;
 var count = 0;
 while(passedPercents < randomPercent){
//   if(arguments[count] === undefined)
//     console.log('!!!! ', passedPercents, randomPercent, count);
  passedPercents+= arguments[count].chance;
  count++;
 }
 return arguments[count-1].event;
}

Random.prototype.range = function(){
 if(arguments.length == 1)
  return Math.floor(Math.random() * (arguments[0])) + 1;
 else
  return Math.floor(Math.random() * (arguments[1] - arguments[0] + 1)) + arguments[0];
}

Random = new Random();


// example
/*
coin = function(){
  return Random.event(
           {event: 'Heads', chance: 50},
           {event: 'Tails', chance: 50}
      )
}


var tails = 0, heads = 0;
for(var i=0; i < 100; i++){
 if(coin()=='Tails')
  tails++
}
console.log(tails)
*/
