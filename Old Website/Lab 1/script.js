var churro; // this is a variable declaration without definiton

console.log(churro); // churro has the value undefined

churro = 13;
churro = 'churro is great';
churro = 'churro said "yum"';

// keyword expression codeblock

if(true){
    console.log(churro);
}

if( 15 > 15){
    console.log('is it true?');
}

churro = "delicious";
if(churro){ // coercion change string to a boolean
    console.log('churro is delicious');
}

if(churro === 'delicious'){ // === testing for equal value and same type
    console.log('really delicious');
}

// == testing for equal value but allows for coercion
// churro == true
// churro gets coerced to a boolean and the expression is true

// typeof operator precedes a variable name or literal value

console.log(typeof "aiejfienjn");
console.log(typeof churro);

if(typeof churro === "string"){
    churro = 'ejwodja dsknos';
}else{
    churro = 42;
}

//////////////// 
// for loop

for(var i = 0; i < 5; i++){
    console.log('hello');
}

for(var i = 0; i < 10; i++){
    console.log(i);
} 
console.log(i);
////////

// function declaration
function bagel(){
    console.log('i am bagel');
    return 'bagel';
}

// function invokation
bagel(); /// () function invokation operator 

/* multiline comment
for(var i = 0; i < 10000; i++){
        bagel();
}
*/

console.log( bagel() );

function yogurt(data){
    data = data + 100;
    return data;
}

var mydata = yogurt(50);
console.log(mydata);
console.log( typeof mydata);