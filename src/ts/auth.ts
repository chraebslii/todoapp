/**
 * check input elements
 * @param {string} inputs string of characters to check inputs
 */
function setEventListener(inputs: string) {
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

/**
 * disable button if all inputs are ok
 */
function disableButton() {
	const button = document.getElementById("btn") as HTMLButtonElement;
	if (validateEmail() && validatePassword()) {
		button.disabled = false;
	} else {
		button.disabled = true;
	}
}

/**
 * check if all is validated and then login
 * @param {string} redirect redirect page
 */
function validation(redirect: string) {
	if (redirect === "register") {
		if (validateEmail() && validatePassword() && validateUsername()) {
			submitForm();
		}
	} else if (redirect === "login") {
		if (validateEmail() && validatePassword()) {
			submitForm();
		} else {
		}
	}
}

/**
 * validate DOM element with regex
 * @param {string} id id of DOM
 * @param {RegExp} regex regex string
 * @returns {bool} true if regex is ok
 */
function validateRegex(id: string, regex: RegExp): boolean {
	const input = document.getElementById(id) as HTMLInputElement;

	if (input.value.match(regex)) {
		input.classList.add("validated-true");
		input.classList.remove("validated-false");
		return true;
	} else {
		input.classList.remove("validated-true");
		input.classList.add("validated-false");
		return false;
	}
}

/**
 * validate an email input
 * @returns {boolean} true if regex is ok
 */
function validateEmail(): boolean {
	return validateRegex(
		"email",
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
	);
}

/**
 * validate a password input
 * @returns {boolean} true if regex is ok
 */
function validatePassword(): boolean {
	return validateRegex("password", /^(?=.*\d).{6,}$/);
}

/**
 * validate an username input
 * @returns {boolean} true if regex is ok
 */
function validateUsername(): boolean {
	return validateRegex("username", /^[A-Za-z][A-Za-z0-9_]{3,30}$/);
}

/**
 * submit form
 */
function submitForm() {
	const form = document.getElementById("form") as HTMLFormElement;
	form.submit();
}

/**
 * get number of questions
 * @returns {number} length of quiz
 */
function getQuizLength(): number {
	return document.getElementById("questions").childElementCount;
}
