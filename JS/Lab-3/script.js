function findSumOfNaturalNumbers(number) {
    let sum = 0;
    while (number !== 0){
        sum += number;
        --number;
    }
    return sum;
}
console.log(findSumOfNaturalNumbers(50));

function calculateFactorial(number) {
    let factorial = 1;
    if (number < 0){
        throw new Error("The parameter must be an integer");
    }

    for (let i = 1; i <= number; i++) {
        factorial *= i;
    }
    return factorial;
}
console.log(calculateFactorial(10));

function getMonthByNumber(number){
    switch (number){
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4 :
            return "April";
        case 5:
            return "May"
        case 6:
            return "June"
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
        default:
            throw new Error("Unknown month");
    }
}
console.log(getMonthByNumber(1));

function calculateSumOfEvenNumbers(numbers) {
    return numbers
        .filter(number => number % 2 === 0)
        .reduce((sum, number) => sum + number, 0);
}

console.log(calculateSumOfEvenNumbers([1, 2, 3, 4, 5, 6]));
console.log(calculateSumOfEvenNumbers([7, 9, 11]));

countVowLetter = (value) => {
    let vows = ["a","o","u","e","i","y"]
    let result = 0;
    for (let i = 0; i < value.length; i++) {
        if (vows.includes(value[i])){
            ++result;
        }
    }
    return result;
}
console.log(countVowLetter("some good string"));

function calculateExponentExpression(base,exponent)


{
    return base**exponent;
}
console.log(calculateExponentExpression(2,3))