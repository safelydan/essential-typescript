function calculateTax(amount: number, format: boolean): string | number {
    const calcAmount = amount * 1.2;
    return format ? `$${calcAmount.toFixed(2)}` : calcAmount;
}
 
let taxValue = calculateTax(100, false)

switch (typeof taxValue) {
    case "number":
        console.log(`number value: ${taxValue.toFixed(2)}`)
        break
    case "string":
        console.log(`number value: ${taxValue.charAt(0)}`)
        break
    default:
        let value: never = taxValue
        console.log(`unexpected type for value: ${value}`)
}

let newResult: unknown = calculateTax(200, false);
let myNumber: number = newResult as number;
console.log(`Number value: ${myNumber.toFixed(2)}`);