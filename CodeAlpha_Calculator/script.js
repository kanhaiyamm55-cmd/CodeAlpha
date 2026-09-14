const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");

let currentValue = "";
let previousValue = "";
let operator = null;
let shouldResetDisplay = false;


// Add number
function appendNumber(number) {

    if (currentValue === "Error" || shouldResetDisplay) {
        currentValue = "";
        shouldResetDisplay = false;
    }

    if (currentValue === "0") {
        currentValue = number;
    } else {
        currentValue += number;
    }

    updateDisplay();
}


// Add decimal
function appendDecimal() {

    if (shouldResetDisplay) {
        currentValue = "";
        shouldResetDisplay = false;
    }

    if (!currentValue.includes(".")) {

        if (currentValue === "") {
            currentValue = "0";
        }

        currentValue += ".";
    }

    updateDisplay();
}


// Select operator
function chooseOperator(selectedOperator) {

    if (currentValue === "" && previousValue === "") {
        return;
    }

    if (currentValue === "" && previousValue !== "") {
        operator = selectedOperator;
        previousDisplay.textContent =
            `${previousValue} ${getOperatorSymbol(operator)}`;
        return;
    }

    if (previousValue !== "" && operator !== null) {
        calculate();
    }

    previousValue = currentValue;
    operator = selectedOperator;
    shouldResetDisplay = true;

    previousDisplay.textContent =
        `${previousValue} ${getOperatorSymbol(operator)}`;
}


// Calculate result
function calculate() {

    if (previousValue === "" || currentValue === "" || operator === null) {
        return;
    }

    const previous = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    let result;

    switch (operator) {

        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":
            if (current === 0) {
                currentValue = "Error";
                previousValue = "";
                operator = null;
                previousDisplay.textContent = "Cannot divide by zero";
                updateDisplay();
                return;
            }

            result = previous / current;
            break;

        case "%":
            result = previous % current;
            break;

        default:
            return;
    }

    result = Number(result.toFixed(10));

    currentValue = result.toString();
    previousValue = "";
    operator = null;
    shouldResetDisplay = true;

    previousDisplay.textContent = "Result";
    updateDisplay();
}


// Clear everything
function clearDisplay() {

    currentValue = "";
    previousValue = "";
    operator = null;
    shouldResetDisplay = false;

    previousDisplay.textContent = "";
    currentDisplay.value = "0";
}


// Delete last character
function deleteLast() {

    if (currentValue === "Error" || shouldResetDisplay) {
        clearDisplay();
        return;
    }

    currentValue = currentValue.slice(0, -1);

    updateDisplay();
}


// Update display
function updateDisplay() {

    currentDisplay.value =
        currentValue === "" ? "0" : currentValue;
}


// Convert operator to symbol
function getOperatorSymbol(op) {

    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "%": "%"
    };

    return symbols[op] || op;
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (key >= "0" && key <= "9") {
        appendNumber(key);
    }

    else if (key === ".") {
        appendDecimal();
    }

    else if (["+", "-", "*", "/", "%"].includes(key)) {
        chooseOperator(key);
    }

    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape" || key === "Delete") {
        clearDisplay();
    }
});
