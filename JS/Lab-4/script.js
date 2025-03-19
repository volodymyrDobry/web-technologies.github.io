function Employee(name, age, position){
    this.name = name;
    this.age = age;
    this.position = position;
}

function Student(name, age, yearOfStudy){
    this.name = name;
    this.age = age;
    this.yearOfStudy = yearOfStudy;
}

function task1(){
    console.log("Task 1");

    let fruits = ["banana","apple","orange","grapefruit","tangerine","pineapple"];
    console.log(fruits);

    fruits.pop()
    console.log(fruits);

    fruits.unshift("pineapple");
    console.log(fruits);

    fruits.sort((a, b) => b.localeCompare(a));
    console.log(fruits);

    console.log(fruits.indexOf("apple"))
}
//task1()

function task2(){
    let colors = ["blue","green","red","yellowblue","purple","pink","orange","brown","black"];

    let shortest = colors.sort((a,b) => a.length - b.length).at(0);
    let longest = colors.sort((a,b) => a.length - b.length).at(colors.length-1);

    console.log(shortest,longest);

    let onlyBlueColors = colors.filter(name => name.includes("blue"))
    console.log(onlyBlueColors);

    let joinedColors = colors.join(", ")
    console.log(joinedColors);
}

//task2()

function task3(){
    let employees = [
        new Employee("John Doe",21,"junior JS developer"),
        new Employee("Betty White",30,"Middle Python developer"),
        new Employee("Jack Smith",40,"System Administrator"),
        new Employee("Natalia Romanova",27,"Talent searcher"),
        new Employee("Vova Dobrianskyi",19,"Trainee Java developer")
    ];

    console.log("Sorted Employees 1");
    employees.sort((a,b) => a.name.localeCompare(b.name));
    console.log(employees);

    console.log("Employees with word dev inside");
    let devEmployees = employees.filter(e => e.position.toLowerCase().includes("developer"));
    console.log(devEmployees);


    let givenAge = 38
    console.log(`Employees under ${givenAge}`);
    employees = employees.filter(e => e.age < givenAge)
    console.log(employees);

    console.log("Employees with new employee");
    employees.push(new Employee("Vasya Rusnak",19,"junior Perl developer"));
    console.log(employees);

}
//task3()

function task4(){
    let students = [
        new Student("Vova Dobry", 19, 2),
        new Student("Sanya Hele1", 18, 2),
        new Student("Vova Svastenko", 19, 2),
        new Student("Oleksiy", 25, 6)
    ]

    let nameOfStudentToDelete = "Oleksiy";

    students = students.filter(student => student.name !== nameOfStudentToDelete);
    console.log(`Students without ${nameOfStudentToDelete} : `);
    console.log(students);

    students.push(new Student("John Doe", 19, 3));
    console.log(`Students plus new student :  `);
    console.log(students);

    students.sort((a,b) => b.age - a.age);
    console.log(`Sorted Students: `);
    console.log(students);

    let yearOfStudy = 3;
    let someGradeYearStudent = students.find(s => s.yearOfStudy === yearOfStudy);
    console.log(`Student of year of study ${yearOfStudy} is `);
    console.log(someGradeYearStudent);
}
//task4();

function task5(){
    let numbers = [1,2,3,4,5,6,7,8,9]
    let squaredNumbers = numbers.map(n => n*n)
    console.log("Squared Numbers" + squaredNumbers);
    console.log();

    let evenNumbers = numbers.filter(n => n % 2 === 0)
    console.log("Even Numbers " + evenNumbers);
    console.log();

    let sumOfAllNumbers = numbers.reduce((sum, result) => sum + result, 0);
    console.log("Sum of all numbers : ",sumOfAllNumbers);
    console.log();

    let extraNumbers = [10,11,12,13,14]
    numbers = numbers.concat(extraNumbers);
    console.log("Extra numbers " + numbers);

    numbers.splice(0,3)
    console.log("Spliced numbers " + numbers);

}

function task7(){
    let student = {
        name: "Vova",
        age: 19,
        kurs: 2
    }
    student.subjects = ["Math","Chemistry","PE","English"]

    delete student.age;

    console.log(student);

}
