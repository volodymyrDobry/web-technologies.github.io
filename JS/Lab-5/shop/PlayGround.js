function User(name, balance) {
    this.name = name;
    this.balance = balance;
}

let usersHistory = new WeakMap();
let users = new Set();

function getUserByUsername(username) {
    for (let user of users) {
        if (user.name === username) {
            return user;
        }
    }
    return undefined;
}

function removeUserByUsername(username){
    for (let user of users) {
        if (user.username === username) {
            users.delete(user);
        }
    }
}

function addUser(user, balance) {
    let createdUser = new User(user, balance);
    users.add(createdUser);
    usersHistory.set(createdUser, "User was Successfully created");
}

addUser("New User", 1999);
function showUsersAfterAdding(){
    let user = getUserByUsername("New User");
    console.log(user);
    console.log(usersHistory.has(user));
}
removeUserByUsername("New User");
console.log(usersHistory.has(user));
