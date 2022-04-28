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
		input.style.outlineColor = "var(--inp-bor-foc-color)";
		input.setAttribute("class", "validated-true");
		return true;
	} else {
		input.style.outlineColor = "var(--inp-bor-foc-color-false)";
		input.setAttribute("class", "validated-false");
		return false;
	}
}

/**
 * validate an email input
 * @returns {boolean} true if regex is ok
 */
function validateEmail(): boolean {
	// regex source: https://stackoverflow.com/
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
	// regex created with: https://regex101.com/
	return validateRegex("password", /^(?=.*\d).{6,}$/);
}

/**
 * validate an username input
 * @returns {boolean} true if regex is ok
 */
function validateUsername(): boolean {
	// regex created with: https://regex101.com/
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

///**
// * save quiz
// */
//function saveQuiz() {
//	document.getElementById("questionLength").value = getQuizLength();
//	document.getElementById("h-btn").click();
//}
//
///**
// * add a question to dom with question template
// */
//function addQuestion() {
//	const questionID = document.getElementById("questions").childElementCount;
//	const questionIDReadable = questionID + 1;
//	const questionTemplate = `
//	<div class="question">
//		<span>Frage ${questionIDReadable}</span>
//		<br>
//		<input required type="text" name="question-${questionID}" id="question-${questionID}" placeholder="Frage ${questionIDReadable}" minlength="5">
//		<span>Richtig:</span>
//		<br>
//		<input required type="text" name="answer1-${questionID}" id="answer1-${questionID}" placeholder="Antwortmöglichkeit ${questionIDReadable}.1" minlength="5">
//		<input required type="radio" name="correct-${questionID}" value="1" id="correct1-${questionID}">
//		<br>
//		<input required type="text" name="answer2-${questionID}" id="answer2-${questionID}" placeholder="Antwortmöglichkeit ${questionIDReadable}.2" minlength="5">
//		<input required type="radio" name="correct-${questionID}" value="2" id="correct2-${questionID}">
//		<br>
//		<input required type="text" name="answer3-${questionID}" id="answer3-${questionID}" placeholder="Antwortmöglichkeit ${questionIDReadable}.3" minlength="5">
//		<input required type="radio" name="correct-${questionID}" value="3" id="correct3-${questionID}">
//		<br>
//		<button type='button' onclick='removeQuestion(this)'>Frage entfernen</button>
//		<br>
//		<br>
//	</div>
//	`;
//	document.getElementById("questions").innerHTML += questionTemplate;
//}
//
///**
// * remove a question
// * @param {HTMLNode} question question in DOM
// */
//function removeQuestion(question) {
//	question.parentElement.remove();
//	updateQuestionIDs();
//}
//
///**
// * update all quiz ids and other information
// */
//function updateQuestionIDs() {
//	const questions = document.getElementsByClassName("question");
//	for (let i = 0; i < questions.length; i++) {
//		const children = questions[i].children;
//
//		// label text
//		children[0].innerHTML = `Frage ${i + 1}`;
//
//		// question input
//		children[2].placeholder = `Frage ${i + 1}`;
//		children[2].id = `question-${i}`;
//		children[2].name = `question-${i}`;
//
//		// answer inputs
//		const answerIDs = [5, 8, 11];
//		for (let j = 0; j < answerIDs.length; j++) {
//			const id = answerIDs[j];
//			children[id].placeholder = `Antwortmöglichkeit ${i + 1}.${j + 1}`;
//			children[id].name = `answer${j + 1}-${i}`;
//			children[id].id = `answer${j + 1}-${i}`;
//		}
//		// radio inputs
//		const radioIDs = [6, 9, 12];
//		for (let j = 0; j < radioIDs.length; j++) {
//			const id = radioIDs[j];
//			children[id].name = `correct-${i}`;
//			children[id].id = `correct${j + 1}-${j}`;
//		}
//	}
//}
//
