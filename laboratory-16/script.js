let actualOperation = '';
let operator = '';
let result = 0;

function addNumber(number) {
    actualOperation += number;
    refreshScreen(actualOperation);
}

function addOperation(operation) {
    if (actualOperation !== '') {
        operator = operation;
        actualOperation += operation;
        refreshScreen(actualOperation);
    }
}

function calculate() {
    try {
        result = eval(actualOperation);
        refreshScreen(result);
        actualOperation = result.toString();
    } catch (e) {
        refreshScreen('err0r');
        actualOperation = '';
    }
}

function clear() {
    actualOperation = '';
    operator = '';
    result = 0;
    refreshScreen(0);
}

function refreshScreen(value) {
    document.getElementById('result').innerHTML = value;
}