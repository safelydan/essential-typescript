// definição da função calculateTax que recebe um valor e um formato desejado
function calculateTax(amount: number, format: boolean): string | number {
  // calcula o valor do imposto (20% do valor de entrada)
  const calcAmount = amount * 1.2;

  // retorna o valor formatado como string ou não formatado como número
  return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
}

// chama a função calculateTax com amount=100 e format=false, armazenando o resultado em taxValue
let taxValue = calculateTax(100, false);

// estrutura de controle de fluxo switch baseada no tipo de taxValue
switch (typeof taxValue) {
  case "number":
    // se taxValue for do tipo número, imprime o valor formatado com duas casas decimais
    console.log(`number value: ${taxValue.toFixed(2)}`);
    break;
  case "string":
    // se taxValue for do tipo string, imprime o primeiro caractere da string
    console.log(`number value: ${taxValue.charAt(0)}`);
    break;
  default:
    // se o tipo de taxValue for diferente de número ou string, imprime uma mensagem indicando um tipo inesperado
    let value: never = taxValue;
    console.log(`unexpected type for value: ${value}`);
}

// chama a função calculateTax com amount=200 e format=false, armazenando o resultado em newResult de tipo unknown
let newResult: unknown = calculateTax(200, false);

// realiza uma assertiva de tipo para converter newResult em um número, assumindo que o resultado será um número
let myNumber: number = newResult as number;

// imprime no console o valor formatado com duas casas decimais da variável myNumber
console.log(`number value: ${myNumber.toFixed(2)}`);
