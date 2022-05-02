function setEventListener(inputs) {
    if (inputs.includes("p")) {
        document.getElementById("password").addEventListener("input", validatePassword);
        document.getElementById("password").addEventListener("input", disableButton);
    }
    if (inputs.includes("e")) {
        document.getElementById("email").addEventListener("input", validateEmail);
        document.getElementById("email").addEventListener("input", disableButton);
    }
    if (inputs.includes("u")) {
        document.getElementById("username").addEventListener("input", validateUsername);
    }
}
function validation(redirect) {
    if (redirect === "register") {
        if (validateEmail() && validatePassword() && validateUsername()) {
            submitForm();
        }
    }
    else if (redirect === "login") {
        if (validateEmail() && validatePassword()) {
            submitForm();
        }
        else {
        }
    }
}
function validateRegex(id, regex) {
    const input = document.getElementById(id);
    if (input.value.match(regex)) {
        input.classList.add("validated-true");
        input.classList.remove("validated-false");
        return true;
    }
    else {
        input.classList.remove("validated-true");
        input.classList.add("validated-false");
        return false;
    }
}
function validateEmail() {
    return validateRegex("email", /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/);
}
function validatePassword() {
    return validateRegex("password", /^(?=.*\d).{6,}$/);
}
function validateUsername() {
    return validateRegex("username", /^[A-Za-z][A-Za-z0-9_]{3,30}$/);
}
function disableButton() {
    const button = document.getElementById("btn");
    if (validateEmail() && validatePassword()) {
        button.disabled = false;
    }
    else {
        button.disabled = true;
    }
}
function submitForm() {
    const form = document.getElementById("form");
    form.submit();
}
