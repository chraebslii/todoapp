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
function disableButton() {
    const button = document.getElementById("btn");
    if (validateEmail() && validatePassword()) {
        button.disabled = false;
    }
    else {
        button.disabled = true;
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
        input.style.outlineColor = "var(--inp-bor-foc-color)";
        input.setAttribute("class", "validated-true");
        return true;
    }
    else {
        input.style.outlineColor = "var(--inp-bor-foc-color-false)";
        input.setAttribute("class", "validated-false");
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
function submitForm() {
    const form = document.getElementById("form");
    form.submit();
}
function getQuizLength() {
    return document.getElementById("questions").childElementCount;
}
