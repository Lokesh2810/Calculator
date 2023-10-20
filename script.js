const numberButtons=document.querySelectorAll(".number");
const opeartionButtons=document.querySelectorAll(".operator");

const equalButton = document.querySelector("#eq");
const allClearButton = document.querySelector("#ac");
const deleteButton = document.querySelector(".delete");

const previousOperandElement = document.querySelector(".previous-operand");
const currentOperandElement = document.querySelector(".current-operand");

let previousOperand="";
let currentOperand="";
let operation = undefined;

const clearFn = () => {
    previousOperand="";
    currentOperand="";
    operation=undefined;
};

const deleteFn = () => {
    currentOperand = currentOperand.toString().slice(0,-1);
};

const appendNumber = (number) => {
    if (number==='.' && currentOperand.includes(".")) return ;
    currentOperand = currentOperand.toString()+number.toString();
};

const chooseOperator = (op) => {
    if (currentOperand=== "") return;

    if (previousOperand !== "") {
        compute();
    }

    operation=op;
    previousOperand=currentOperand;
    currentOperand="";

};

const compute = () => {

    let computation;
    const prev= parseFloat(previousOperand);
    const current= parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return ;

    switch(operation){

        case "+":
            computation=prev+current;
            break;
        case "-":
            computation=prev-current;
            break;
        case "x":
            computation=prev*current;
            break;
        case "÷":
            computation=prev/current;
            break;
        default :
            return;
    }

    currentOperand=computation;
    operation=undefined;
    previousOperand="";

};

const updateDisplay = () => {
    currentOperandElement.textContent=currentOperand;

    if (operation != null){
        previousOperandElement.textContent = `${previousOperand} ${operation}`;
    }
    else {
        previousOperandElement.textContent=previousOperand;
    }
    
};

numberButtons.forEach((button) =>{
    button.addEventListener("click", (e) => {
        appendNumber(button.textContent);
        updateDisplay();
    });
});

deleteButton.addEventListener("click", (e) =>{
    deleteFn();
    updateDisplay();
});

allClearButton.addEventListener("click", (e) =>{
    clearFn();
    updateDisplay();
});


opeartionButtons.forEach((operation) => {
    
    operation.addEventListener("click", (e) =>{
        chooseOperator(operation.textContent);
        updateDisplay();
    });
});


equalButton.addEventListener("click",(e) => {
    compute();
    updateDisplay();
});