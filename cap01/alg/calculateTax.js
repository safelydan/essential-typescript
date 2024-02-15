// definição da função calculateTax
function calculateTax(amount, format) {
    // cálculo do valor do imposto
    var calcAmount = amount * 1.2;

    // retorno formatado ou não formatado, dependendo do valor de format
    return format ? "$".concat(calcAmount.toFixed(2)) : calcAmount;
}

// chamada da função com amount=100 e format=false
var taxValue = calculateTax(100, false);

// switch para verificar o tipo de taxValue (number ou string)
switch (typeof taxValue) {
    case "number":
        // saída no console para valor numérico
        console.log("number value: ".concat(taxValue.toFixed(2)));
        break;
    case "string":
        // saída no console para valor de string
        console.log("string value: ".concat(taxValue.charAt(0)));
        break;
    default:
        // saída no console para tipo inesperado
        var value = taxValue;
        console.log("unexpected type for value: ".concat(value));
}

// chamada da função novamente com amount=200 e format=false
var newResult = calculateTax(200, false);

// atribuição do resultado a uma variável myNumber
var myNumber = newResult;

// saída no console do valor formatado de myNumber
console.log("Number value: ".concat(myNumber.toFixed(2)));
