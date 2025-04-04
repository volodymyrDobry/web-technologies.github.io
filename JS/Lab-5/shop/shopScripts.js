let products = new Map();
let productsHistory = new WeakMap();
let users = new Set();

function log(product, message) {
    let productMessages;
    if (productsHistory.has(product)) {
        productMessages = productsHistory.get(product);
        productMessages += '\n' + message;
    } else {
        productMessages = message;
    }
    productsHistory.set(product, productMessages);
}

function addProduct(name, price, quantity) {
    if (products.has(name)) {
        console.log(`The product with name "${name}" already exists`);
        return;
    }

    let productObj = { name, price, quantity };
    products.set(name, productObj);
    log(productObj, "Product was added successfully");
}

function removeProduct(name) {
    if (!products.has(name)) {
        console.log(`The product with name "${name}" doesn't exist`);
        return;
    }

    let productObj = products.get(name);
    log(productObj, "Product was removed successfully");
    products.delete(name);
}

function updateProduct(name, price, quantity) {
    if (!products.has(name)) {
        console.log(`The product with name "${name}" doesn't exist`);
        return;
    }

    let productObj = products.get(name);
    productObj.price = price;
    productObj.quantity = quantity;
    products.set(name, productObj);
    log(productObj, "Product was updated successfully");
}

function findProduct(name) {
    if (products.has(name)) {
        let productObj = products.get(name);
        log(productObj, "Product was found successfully");
        return productObj;
    }
    console.log(`The product with name "${name}" doesn't exist`);
    return null;
}

function addUser(username) {
    if (users.has(username)) {
        console.log(`The user with username "${username}" already exists`);
        return;
    }
    users.add(username);
}

function removeUser(username) {
    if (!users.has(username)) {
        console.log(`The user with username "${username}" doesn't exist`);
        return;
    }
    users.delete(username);
}

function orderProduct(user, productName, quantity) {
    if (!products.has(productName)) {
        console.log(`The product with name "${productName}" doesn't exist`);
        return;
    }
    if (!users.has(user)) {
        console.log(`The user with username "${user}" doesn't exist`);
        return;
    }

    let productObj = products.get(productName);
    if (quantity > productObj.quantity) {
        console.log(`Too few "${productName}" left in stock`);
        return;
    }

    productObj.quantity -= quantity;
    products.set(productName, productObj);
    log(productObj, `Ordered ${quantity} units by ${user}`);
}

addUser("Alice");
addProduct("Laptop", 1000, 5);
addProduct("Phone", 500, 10);

console.log(findProduct("Laptop"));

orderProduct("Alice", "Laptop", 2);
console.log(findProduct("Laptop"));

removeProduct("Laptop");

console.log(findProduct("Laptop"));


