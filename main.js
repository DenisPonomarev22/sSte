// События панели
// Ты забыл учесть в исправлении знаков отрицательные числа,
// пока я помню, удалишь из условий минусы и переработаешь их систему

let flagOverflowNumber = true;
let flagCleanArea = true;
let firstNumber = 0;
let secondNumber = 0;

let flagNegativeNumber = false;


const Out = document.querySelector(".output span");
const buttonBlock = document.querySelector(".button-block")

buttonBlock.addEventListener("click", (e) => {
    let targetItem = e.target;

    if (targetItem.closest("#zero")){
        printNumber('0');
    }
    else if (targetItem.closest("#one")){
        printNumber('1');
    }
    else if (targetItem.closest("#two")){
        printNumber('2');
    }
    else if (targetItem.closest("#three")){
        printNumber('3');
    }
    else if (targetItem.closest("#four")){
        printNumber('4');
    }
    else if (targetItem.closest("#five")){
        printNumber('5');
    }
    else if (targetItem.closest("#six")){
        printNumber('6');
    }
    else if (targetItem.closest("#seven")){
        printNumber('7');
    }
    else if (targetItem.closest("#eight")){
        printNumber('8');
    }
    else if (targetItem.closest("#nine")){
        printNumber('9');
    }
    else if (targetItem.closest("#point")){
        printNumber('.');
    }
    else if (targetItem.closest("#plus")){
        checkSign('+');
        lenh = 0;
    }
    else if (targetItem.closest("#minus")){
        checkSign('-');
        lenh = 0; 
    }
    else if (targetItem.closest("#multiplic")){
        checkSign('🞩');
        lenh = 0; 
    }
    else if (targetItem.closest("#division")){
        checkSign('÷');
        lenh = 0; 
    }
    else if (targetItem.closest("#percent")){
        calcPersent();        
    }
    else if (targetItem.closest("#delete-all")){
        Out.innerHTML = '';
        lenh = 0;
    }
    else if (targetItem.closest("#delete-last")){
        let arrNumbers = Out.innerHTML.split('');

        arrNumbers.pop();
        Out.innerHTML = arrNumbers.join('');
        lenh--;
    } 
})

// Проверка на повтор знаков

const checkSign = (sign) => {

    let expression = Out.innerHTML;
    let lastElemArr;
    let arrDouble = expression.split(" ");
    

    arrDouble = arrDouble.filter(Boolean);
    lastElemArr = arrDouble[arrDouble.length - 1]; 
    
    if (sign == "+" || sign == "🞩" || sign == "÷"){

        lastElemArr = sign;

        let arrExpression = expression.split(/\+|\-|\🞩|\÷/);
        arrExpression = arrExpression.filter(item => item != " ")

        let arrSign = arrDouble.filter(item => item == "+" 
        || item == "-" || item == "🞩" || item == "÷" || item == ".");

        let retStr = '';

        for (let i = 0; i < arrExpression.length; i ++){
            if (arrDouble.length == 2){

                retStr = `${arrExpression[i].trim()} ${lastElemArr} `;                
                break; 
            }

            if (i != arrExpression.length - 1) {

                retStr += `${arrExpression[i]} ${arrSign[i]} `;
            }
            else {

                retStr += `${arrExpression[i]} ${lastElemArr} `;
            }
        }
        
        Out.innerHTML = retStr;

    } 
    
    else if (sign == "-"){
        // console.log(lastElemArr);
        // console.log(flagNegativeNumber);

        
        if (flagNegativeNumber == false && (lastElemArr == "-" || lastElemArr == '+' || lastElemArr == '-'
        || lastElemArr == '🞩' || lastElemArr == '÷')){

            flagNegativeNumber = true;
            Out.innerHTML += ' - ';
            console.log('KEK')

        } 
        else if (flagNegativeNumber == false){
            Out.innerHTML += ' - ';
            console.log('LOL')
        }

        console.log(arrDouble[arrDouble.length - 1]);
        
    }
    else if (sign == '.'){
        Out.innerHTML += '.';
    }
    // else{
    //     Out.innerHTML += ` ${sign} `;
    // }
    // console.log(arrDouble);
    lenh = 0;
}

// Печать цифр
let lenh = 0;

function printNumber(num){

    if (lenh == 0 && flagCleanArea == false){
        Out.innerHTML = '';
        flagCleanArea = true;
    }

    if (lenh < 8){
        lenh += 1;
        Out.insertAdjacentHTML('beforeend', `${num}`);
    }

    else{
        flagOverflowNumber = false;     
    };
};

// Процент 

let calcPersent = () => {
    Out.innerHTML += " %"
    let expression = Out.innerHTML;
    let arrExpression = expression.split(/\+|\-|\🞩|\÷/);
    let arrSign = expression.split(" ").filter(item => item == "+" 
    || item == "-" || item == "🞩" || item == "÷" || item == "%");

    let percent = parseFloat(arrExpression[arrExpression.length - 1]) / 100;
    
    let retStr = '';

    for (let i = 0; i < arrExpression.length; i ++){
        if (i != arrExpression.length - 1){
            retStr += `${arrExpression[i].trim()} ${arrSign[i]} `;
        }
        else {
            retStr += `${percent} `;
        } 
    }

    Out.innerHTML = retStr;
}

//  Кнопка равно или получение результата
let equal = document.querySelector('#equal');

equal.addEventListener('click', (e) => {

    let flagNegativeNumber = false;
    let expression = Out.innerHTML;
    let arrExpression = expression.split(/\+|\-|\🞩|\÷/);
    let arrSign = expression.split(" ").filter(item => item == "+" 
    || item == "-" || item == "🞩" || item == "÷");

    let countArrSign = 0;
    let retrn = 0;
    let frsNum;
    let scnNum;

    for (let i = 0; i < arrExpression.length; i ++){      
        // Присвоениек значений

        if (i == 0){
            frsNum = +arrExpression[i];
            scnNum = +arrExpression[i + 1];
        }
        else {
            frsNum = retrn;
            scnNum = +arrExpression[i + 1];
        }
            
        // Действия 

        if (arrSign[countArrSign] == "+"){
            retrn = frsNum + scnNum;
        } else if (arrSign[countArrSign] == "-"){
            retrn = frsNum - scnNum;
        } else if (arrSign[countArrSign] == "🞩"){
            retrn = frsNum * scnNum;
        } else if (arrSign[countArrSign] == "÷"){
            retrn = frsNum / scnNum;
        } 

        countArrSign++; 
    }  
    
    Out.innerHTML = retrn;
    flagCleanArea = false;
    lenh = 0;
})
