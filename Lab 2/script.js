var doggy = {
    cute: true, 
    hungry: 0.8,
    lives: 9,
    fur: {
        fluffy: true,
        colour: "brown",
    },
    threats: null,
    woof: function (){ // a function contained as a key value pair of an object is called a method
        return "woof";
    }, // annonymous functions have no name
};

console.log(doggy.woof()); // ()function invokation operator 

console.log(doggy.two);
// variable name that is not declared gives an error
// a undeclared parameter of an object gives undefined and no error

doggy.lives++;
console.log(doggy);

doggy.two = 'two'; // object are changeable and mutable (you can add to them after they are created)
console.log(doggy);

// doggy.travel(); // error because you can't invoke undefined as a function

console.log(doggy.future++); // results in a type number with value NaN which is not a number

console.log( doggy.lives / null );

//null gets coerced to 0 when changing to type number!!

// . accessor of an object
doggy.fur.fluffy;

if(doggy.cute){
   console.log('true?'); 
}else{
    console.log('false?');
}

for(key in doggy){ // generics 
    console.log(key);
    doggy[key]; // alternate accessor for objects in javascript
    // doggy["woof" + count];
}

var x = {};
x.y = 12; // mutates object with assignment
x.z; // returns undefined
x.z()// throws an error by trying to invoke undefined as a function
x.z = function(){}; // method
x.z(); // invoke the z method and returns undefined unless modified