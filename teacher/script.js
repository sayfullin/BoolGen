function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

var app = angular.module('BoolGen', ['pascalprecht.translate']);
app.filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min);
    max = parseInt(max) + 1;
    for (var i=min; i<max; i++)
      input.push(i);
    return input;
  };
});
app.filter("nl2br", function($filter) {
 return function(data) {
   if (!data) return data;
   return data.replace(/\n\r?/g, '<br />');
 };
});

app.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    'TITLE': 'Boolean Expression Generator',
    'DESCRIPTION': 'Generator is designed to help computer scince teachers and with training and checking knowledge',
    'OPTIONS': 'Options',
    'VARIANTS_QUANTITY': 'Variant quantity',
    'EXAMPLE': 'Example',
    'QUANTITY': 'Quantity',
    'REGENERATE': 'Regenegate',
    'TASKS': 'Tasks',
    'ANSWERS': 'Answers',
    'VARIANT': 'Variant',
    'SWITCH_TO_STUDENT': 'Switch to student version'
  });

  $translateProvider.translations('ru', {
    'TITLE': 'Генератор логических выражений',
    'DESCRIPTION': 'Генератор призван помочь ИТ-преподавтелям и студентам с созданием логических выражений для обучения и проверки знаний',
    'OPTIONS': 'Настройки',
    'VARIANTS_QUANTITY': 'Количество вариантов',
    'EXAMPLE': 'Пример',
    'QUANTITY': 'Количество',
    'REGENERATE': 'Перегенировать',
    'TASKS': 'Задачи',
    'ANSWERS': 'Ответы',
    'VARIANT': 'Вариант',
    'SWITCH_TO_STUDENT': 'Перейти на версию для студентов'
  });

  $translateProvider.preferredLanguage('ru');
}]);

app.controller('BoolGenCotrloller',['$scope', '$translate', function($scope, $translate){
  var quantityArray = getCookie('quantityArray');
  if(!quantityArray){
    quantityArray = [1, 0, 1, 0, 1, 0, 0, 1, 0, 1];
    setCookie('quantityArray', quantityArray.join('|'), 12);
  }else{
		quantityArray = quantityArray.split('|');
	}

  $scope.expressionTypes = [
    {type: 'Without varibles', quantity: parseInt(quantityArray[0]), level: 2, example: "True or False"},
    {type: 'Without varibles', quantity: parseInt(quantityArray[1]), level: 3, example: "True or False and False"},
    {type: 'Without varibles', quantity: parseInt(quantityArray[2]), level: 4, example: "True or False or not False"},
    {type: 'With variables', quantity: parseInt(quantityArray[3]), level: 2, variableCount: 1, example: "A and A; A=true"},
    {type: 'With variables', quantity: parseInt(quantityArray[4]), level: 4, variableCount: 2, example: "(A and A) or (B and not B); A=false; B=true"},
    {type: 'With variables', quantity: parseInt(quantityArray[5]), level: 5, variableCount: 3, example: "(C and (C and A)) or (C or not C); A=false; B=true; C=false"},
    {type: 'Arithmetic comparison', quantity: parseInt(quantityArray[6]), level: 1, example: "-1 - 8 != -9"},
    {type: 'Arithmetic comparison', quantity: parseInt(quantityArray[7]), level: 2, example: "(0 - 12 = -8) xor not (1 + 6 > 9)"},
    {type: 'With any values', quantity: parseInt(quantityArray[8]), level: 3, variableCount: 2, example: "B and not A"},
    {type: 'With any values', quantity: parseInt(quantityArray[9]), level: 5, variableCount: 2, example: "not (B and A xor B) xor not B"}
  ];
  var langKey = getCookie('langKey');
  if(langKey)
    $translate.use(langKey);

  $scope.variantsQuatity = 2;
  $scope.generatedExpression = [];


  $scope.refresh = function(){
    $scope.emptyGeneratedExpression();

    for(var i=0; i < $scope.variantsQuatity; i++){
      var newVariant = [];
      angular.forEach($scope.expressionTypes, function(expType){
				var taskTexts = {};
				for(var j=0; j < expType.quantity; j++){
          if(expType.type != 'With any values'){
            do{
  						var newExpression = new BoolGen(expType);
  					}while(taskTexts[newExpression.task] !== undefined);
  					// while for checking not repeating
  					// if it will be same loop make one more step
  					taskTexts[newExpression.task] = true;
          }else{
              var newExpression = new BoolGen(expType);
          }
					newVariant.push(newExpression);
				}
      })
      $scope.generatedExpression.push(newVariant);
    }
		saveQuantityArray();
  };

  $scope.emptyGeneratedExpression = function(){
    var len = $scope.generatedExpression.length;
    for(var i=0; i < len; i++){
      $scope.generatedExpression[i].length = 0;
    }
    $scope.generatedExpression.length = 0;
  }

	var saveQuantityArray = function(){
    var len = $scope.expressionTypes.length;
    var quantityArray = [];
    for(var i=0; i < len; i++)
      quantityArray.push($scope.expressionTypes[i].quantity);
    setCookie('quantityArray', quantityArray.join('|'), 12);
	}

  $scope.isArray = function(data){
    return data instanceof Array;
  }

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    setCookie('langKey', langKey, 14);
  };

  $scope.refresh();
}]);
