const History = document.getElementById("history");
const current = document.getElementById("currentvalue");
const operators = [ '+' , '×' , '/' , '=' , '-']
let keyCount = 0;
let isCalculated = false;

function keyPrint(key){
    if (isCalculated){
        allClear();
        isCalculated = false;
    }
    if( ( operators.includes (current.value.slice(-1) ) && operators.includes(key) ) ){
        if(keyCount > 1 ){
            backSpace();
            current.value += key;
        }
    }
    else if( !operators.includes(key) || keyCount > 0  || key == '-' ){
        current.value += key;
        keyCount++;
    }
}

function allClear(){
    keyCount = 0;
    History.value = '';
    current.value = '';
}

function backSpace(){
    current.value = current.value.slice(0,-1);
    keyCount--;
    if (keyCount<0)
        keyCount = 0;
}

function  calculate(){
    History.value = current.value;
    try{
        current.value = eval(History.value);
    }
    catch(error){
        current.value = "Error";
    }
    isCalculated = true;
}


document.addEventListener('keydown', function(event) {
    const keyin = event.key; // get key form event class
    //pass to valid parameter to keyprint
    if ((keyin >= 0 && keyin<=9) || keyin === '.' || keyin === '+' || keyin === '-' || keyin === '*' || keyin === '/' ) {
        keyPrint(keyin);
    }else if(keyin === 'Delete'){
        allClear();
    }else if(keyin === 'Backspace'){
        backSpace();
    }else if(keyin === 'Enter' || keyin === '='){

        //this is use to prevent default key inputs (some time we click AC via mouse and after that we press enter it will press AC againly bcs we are selected it by mouse .. this can prevent it)
        event.preventDefault(); 

        calculate();
    }
});