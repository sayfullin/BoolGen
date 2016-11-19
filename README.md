# BoolGen
Boolean Exressions Generator JavaScript Library

[Web Application](http://sayfullin.github.io/BoolGen/)

[Web Application Source](https://github.com/Sayfullin/BoolGen/tree/gh-pages)

#Options
##type:

**'Without varibles'** — only True or False. Example: "True or False"

**'With variables'** — expression with initial values. Exapmle: "(A and A) or (B and not B); A=false; B=true"

**'Arithmetic comparison'** — comparison of numbers. Exapmle: (0 - 12 = -8) xor not (1 + 6 > 9)

**'With any values'** — expression without initial values. Tester must to solve expression with all enable variants. Example:

not B and A; A=true; B=true

not B and A; A=true; B=false

not B and A; A=false; B=true

not B and A; A=false; B=false

##level
How many times comparison will be used

value must be >= 1

Examples:

1 => True

2 => True or False

3 => True or False and False

4 => True or False or not False

##variableCount
is used for 'With variables' and 'With any values' types. variableCount is how many variables will be in expression

value must be >= 1

examle

1 => A or A

2 => (A or B) and (A xor B)

3 => (not A and not A) and not ((A and C) and C) and B;


#Return

'With any values' return array of objects. Other types return single object

**object.task** . String.

**object.answer** . Boolean.

#Examples

var boolGen = BoolGen(); *// { task: "False", answer: false }*

boolGen = BoolGen(); *// { task: "True or False", answer: true }*

boolGen.task; *// "True or False"*

boolGen = BoolGen({level: 7})
*// { task: "not ((False and not (False xor True)) or False) or not True", answer: true }*

boolGen = BoolGen({level: 7, type: "With variables"})

*// { task: "((B xor C and C) xor (B or C)) and C and C; A=true; B=false; C=false", answer: false }*

boolGen = BoolGen({level: 7, type: "With variables", variableCount: 2})

*// { task: "(not ((A and B) and B) and not A) or A and B; A=true; B=true", answer: true }*

boolGen = BoolGen({level: 3, type: "Arithmetic comparison"})

*// { task: "not (0 + 6 != 6) or (-3 + 2 < -4)", answer: true }*

boolGen = BoolGen({level: 3, type: "Arithmetic comparison"})

*// { task: "(-5 + 7 != 2) or (8 - 15 > -3) and (3 + 7 != 10)", answer: false }*

boolGenArray = BoolGen({level: 3, type: "With any values", variableCount: 2});
*// [Object, Object, Object, Object]*

boolGenArray[0];
*// Object {task: "(B or B) or not A; A=true; B=true", answer: true}*

boolGenArray[1];
*// Object {task: "(B or B) or not A; A=true; B=false", answer: false}*

boolGenArray[2];
*// Object {task: "(B or B) or not A; A=false; B=true", answer: true}*

boolGenArray[3];
*// Object {task: "(B or B) or not A; A=false; B=false", answer: true}*
