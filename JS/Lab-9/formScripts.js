const signUpForm = document.forms.signUpForm;
const loginForm = document.forms.loginForm;

const cities = {
    ua: ["Kyiv", "Lviv", "Odesa", "Dnipro", "Kharkiv"],
    us: ["New York", "Los Angeles", "Chicago", "Houston", "Miami"],
    de: ["Berlin", "Hamburg", "Munich", "Frankfurt", "Cologne"],
    fr: ["Paris", "Lyon", "Marseille", "Nice", "Toulouse"],
    jp: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya"]
};

const signUpNavItem = document.getElementById("signUpNavItem");
const loginNavItem = document.getElementById("loginNavItem");

const eyeWrappers = document.querySelectorAll(".password-icon");

let elements = document.querySelectorAll("[data-val='true']");

const countrySelect = document.getElementById("country");

elements.forEach(element => {
    element.addEventListener("change", onChangeHandler);
});

signUpForm.addEventListener("submit",onSubmitHandler);
loginForm.addEventListener("submit",onSubmitHandler);

signUpNavItem.addEventListener("click",() => {
    switchForm(loginForm,signUpForm);
    switchButton(loginNavItem,signUpNavItem);
});

loginNavItem.addEventListener("click",() => {
    switchForm(signUpForm,loginForm);
    switchButton(signUpNavItem,loginNavItem);
});

eyeWrappers.forEach(wrapper => {
    wrapper.addEventListener("click", (event) => {
        const img = event.target;
        const passwordInput = event.target.parentElement.querySelector(".form-item-input");
        eyeHandler(img,passwordInput);
    });

});

countrySelect.addEventListener("change",countrySelectChangeHandler);

function eyeHandler(icon,input) {
    if (!icon.classList.contains("opened")) {
        input.type = "password";
        icon.src = "./icons/visibility_24dp_000000_FILL0_wght400_GRAD0_opsz24.png";
        icon.classList.add("opened");
    } else {
        input.type = "text";
        icon.src = "./icons/visibility_off_24dp_000000_FILL0_wght400_GRAD0_opsz24.png";
        icon.classList.remove("opened");
    }

}

function switchButton(fromButton, toButton){
    fromButton.classList.remove("active");
    toButton.classList.add("active");
}

function switchForm(fromForm,toForm){
    fromForm.style.display = "none";
    toForm.style.display = "flex";
}

function validateElement(element) {
    for (const key in validators) {
        if (Object.hasOwnProperty.call(validators, key) && typeof validators[key] == "object") {
            if (element.dataset[key]) {
                const validator = validators[key];
                if (!validator.isValid(element))
                    return false;
            }
        }
    }

    return true;
}

function onChangeHandler(e) {
    const element = e.target;
    if (element.tagName === "INPUT") {
        validateElement(element);
    }
}

function onSubmitHandler(e) {
    e.preventDefault();

    const form = e.target;
    let allValid = true;

    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        if (!validateElement(element)) {
            allValid = false;
        }
    }

    if (allValid) {
        console.log("Form is valid! 🥳");
        let formData = new FormData(form);
        const user = Object.fromEntries(formData);
        console.log(user);
        clearForm(form);
        showToast("Form is valid! 🥳");
    }
}

function clearForm(form){
    if (form.tagName === "FORM"){
        for (let i = 0; i < form.elements.length - 1; i++) {
            form.elements[i].value = "";
        }
        const cityContainer = document.querySelector(".form-item-city");
        cityContainer.style.display = "none";
    }
}

function countrySelectChangeHandler(e){
    const country = e.target.value;
    addCitiesSelect(country);
}

function addCitiesSelect(country){
    const cityContainer = document.querySelector(".form-item-city");
    const citySelect = document.getElementById("city");
    const countryCities = cities[country];
    cityContainer.style.display = "block";
    citySelect.innerHTML = "<option value='' disabled>Choose a city</option>";
    for (const city of countryCities){
        const option = `<option value=${city}>${city}</option>`;
        citySelect.innerHTML += option;
    }
}

let validators = {};

validators.validate = function (element, message, predicate) {
    let errorLabel = document.querySelector("#" + element.dataset.errorLabel);
    errorLabel.innerHTML = message;
    errorLabel.style.display = "none";
    element.classList.remove("valid");
    element.classList.remove("invalid");

    if (typeof predicate == "function" && predicate()) {
        element.classList.add("valid");
        return true;
    }
    else {
        element.classList.add("invalid");
        errorLabel.style.display = "block";
        return false;
    }
};

validators.required = {
    isValid: function (element) {
        const message = element.dataset.required;
        const name = element.name;

        if (element.type === "radio") {
            // check if any radio in the group is checked
            const radios = document.querySelectorAll(`input[name="${name}"]`);
            const isAnyChecked = Array.from(radios).some(r => r.checked);

            // use the same error label for all radios in the group
            const errorLabel = document.querySelector("#" + element.dataset.errorLabel);
            radios.forEach(r => {
                r.classList.remove("valid", "invalid");
            });

            if (isAnyChecked) {
                radios.forEach(r => r.classList.add("valid"));
                errorLabel.style.display = "none";
                return true;
            } else {
                radios.forEach(r => r.classList.add("invalid"));
                errorLabel.innerHTML = message;
                errorLabel.style.display = "block";
                return false;
            }
        }

        return validators.validate(element, message, () => element.value.length > 0);
    }
};

validators.pattern = {
    isValid: function (element) {
        let message = "Введене значення не відповідає шаблону";
        let regex = new RegExp(element.dataset.pattern);
        return validators.validate(element, message, () => regex.test(element.value));
    }
};

validators.confirm = {
    isValid: function (element) {
        let message = "Значення не співпадають";
        let confirmInput = document.querySelector("#" + element.dataset.confirm);
        return validators.validate(element, message, () => element.value === confirmInput.value);
    }
};

validators.birthDate = {
    isValid: function (element) {
        let message = "";
        let inputDate = new Date(element.value);
        let now = new Date();

        let yearsDiff = now.getFullYear() - inputDate.getFullYear();
        let monthDiff = now.getMonth() - inputDate.getMonth();
        let dayDiff = now.getDate() - inputDate.getDate();


        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            yearsDiff--;
        }

        if (inputDate > now) {
            message = "Дата не може бути в майбутньому!";
        } else if (yearsDiff < 12) {
            message = "Має бути більше 12 років!";
        }

        return validators.validate(element, message, () => message.length === 0);
    }
}

function showToast(message, duration = 3000) {
    const container = document.getElementById("toast-container");

    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerText = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => container.removeChild(toast), 400);
    }, duration);
}