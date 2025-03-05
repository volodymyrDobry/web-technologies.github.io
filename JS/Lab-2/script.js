//Task 1.1
//----------------------------------------------------
function findTheHighestAndLowestNumber(arr){
    if (!arr instanceof Array)
        throw Error("The parameter must be an Array of numbers")

    let result = {};
    result.lowest = arr.sort((a,b) => a - b)[0];
    result.highest = arr.reverse()[0];
    return result;
}

arr = [1,2,4,5,5,6,7,"b",100000]
let res = findTheHighestAndLowestNumber(arr)
console.log(res)
// ------------------------------------------------------------
//Task 1.2
function Person(name,age,gender,skin){
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.skin = skin;
}

Person.prototype.equals =  function(person){
    if (!(person instanceof Person))
        return false;
    return this.name === person.name &&
        this.age === person.age &&
        this.gender === person.gender &&
        this.skin === person.skin;
}

person1 = new Person("John",12,true,"white");
person2 = new Person("John",12,true,"white");
console.log(person1.equals(person2));

// -----------------------------------------------
//Task 2.1
function isInRangeOf(searchedValue, minRangeValue, maxRangeValue) {
    if (Number.isInteger(searchedValue) && Number.isInteger(minRangeValue) && Number.isInteger(maxRangeValue)) {
        return searchedValue >= minRangeValue && searchedValue <= maxRangeValue;
    }
    throw new Error("All values must be integers");
}

console.log(isInRangeOf(1,2,3));
//------------------------------------------------

//Task 2.2
console.log(!true)
// ------------------------------------------------

//Task 3.1
function convertNumberPointToString(point){
    if (!Number.isInteger(point)){
        throw new Error("The parameter must be an integer");
    }
    if(point < 50){
        return "FX";
    }else if(point >= 50 && point < 70){
        return "F"
    }else if(point < 90){
        return "B"
    }else{
        return "A";
    }
}

function convertNumberPointToStringTrinary(point) {
    if (!Number.isInteger(point)) {
        throw new Error("The parameter must be an integer");
    }
    return point < 50 ? "FX" :
        point < 70 ? "F" :
            point < 90 ? "B" : "A";
}
// Task 3.2
function defineSeasonByMonth(month){
    if (month === "December" || month === "January" || month === "February") {
        return "Winter"
    } else if (month === "March" || month === "April" || month === "May") {
        return "Spring"
    } else if (month === "June" || month === "July" || month === "August") {
        return "Summer"
    } else if (month === "September" || month === "October" || month === "November") {
        return "Fall"
    } else {
        throw new Error("Unknown month");
    }
}

function defineSeasonByMonthTrinary(month) {
    return ["December", "January", "February"].includes(month) ? "Winter" :
        ["March", "April", "May"].includes(month) ? "Spring" :
            ["June", "July", "August"].includes(month) ? "Summer" :
                ["September", "October", "November"].includes(month) ? "Fall" :
                    (() => { throw new Error("Unknown month"); })();
}

console.log(defineSeasonByMonth("December"));
console.log(defineSeasonByMonthTrinary("March"));
console.log(convertNumberPointToString(100));
console.log(convertNumberPointToStringTrinary(1));
