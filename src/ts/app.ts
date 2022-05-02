// ********************************************* toggle tasks *********************************************

/**
 * toggle the visibility of the 'done' list
 * @param element toggle element
 */
function toggleDoneTasks(element: HTMLDivElement) {
	element = element.parentNode as HTMLDivElement;
	const toggleArrow = element.querySelector(".toggle-tasks-icon") as HTMLImageElement;
	if (element.dataset.toggle === "open") {
		element.dataset.toggle = "closed";
		toggleArrow.src = "./assets/i/expand-more.svg";
	} else {
		element.dataset.toggle = "open";
		toggleArrow.src = "./assets/i/expand-less.svg";
	}
}

/**
 * set event listeners for all tasks
 */
function setEventListenerOnTasks() {
	const tasks = document.querySelectorAll(".task");
	for (let i = 0; i < tasks.length; i++) {
		const task = tasks[i];
		task.querySelector("input").addEventListener("input", toggleTask);
		task.querySelector("span").addEventListener("click", editTask);
	}
}

/**
 * move task to done list or open list depending on the current checked state
 */
function toggleTask() {
	const task = this.parentNode as HTMLDivElement;
	const input = task.children[0] as HTMLInputElement;
	if (input.checked) {
		moveTaskToDoneOrOpen(task, ".items-cont-done");
	} else {
		moveTaskToDoneOrOpen(task, ".content.open");
	}
}

/**
 * move task to done list or open list depending on selector
 * @param task element of task
 * @param selector string of query selector
 */
function moveTaskToDoneOrOpen(task: HTMLDivElement, selector: string) {
	const parentList = task.parentNode.parentNode.parentNode as HTMLDivElement;
	const openTasksCont = parentList.querySelector(selector) as HTMLDivElement;
	openTasksCont.appendChild(task);
}

// ********************************************* create tasks *********************************************

/**
 * adds an empty task to the todo list
 * @param e element of plus
 */
function addTask(e: HTMLElement) {
	const listID = getListID(e.parentNode.parentNode as HTMLDivElement);
	const taskID = getNextTaskID(listID);
	const taskTemplate = `
        <div class="items task f a row">
            <input type="checkbox" id="li-${listID}-${taskID}" name="li-${listID}-${taskID}" />
            <input type="text" class="task-edit" value="" />
        </div>`;
	const taskElement = parseHTML(taskTemplate);
	taskElement.addEventListener("click", toggleTask);
	taskElement.querySelector(".task-edit").addEventListener("focusout", saveTask);
	document.querySelector(`#list-${listID}`).querySelector(".content.open").appendChild(taskElement);
	(taskElement.querySelector(".task-edit") as HTMLInputElement).focus();
}

/**
 * get list id of current list
 * @param list element of list
 * @returns id of list as number
 */
function getListID(list: HTMLDivElement) {
	return parseInt(list.getAttribute("id").split("-")[1]);
}
/**
 * get next task id of current list
 * @param listID id of list
 * @returns id for next task in list
 */
function getNextTaskID(listID: number) {
	return document.querySelector(`#list-${listID}`).querySelector(".content.open").children.length + 1;
}

// ********************************************* edit tasks *********************************************
/**
 * change task to be editable
 */
function editTask() {
	const task = this.parentNode;
	const span = task.querySelector("span") as HTMLSpanElement;
	const inputTemplate = `
    <input type="text" class="task-edit"value="${span.innerHTML}" />`;
	const input = parseHTML(inputTemplate);
	input.addEventListener("focusout", saveTask);
	task.removeChild(span);
	task.appendChild(input);
	input.focus();
}

/**
 * save task after editing
 */
function saveTask() {
	const task = this.parentNode;
	const input = task.querySelector(".task-edit") as HTMLInputElement;
	const spanTemplate = `
        <span>${input.value}</span>`;
	const span = parseHTML(spanTemplate);
	task.removeChild(input);
	task.appendChild(span);
	span.addEventListener("click", editTask);
}

// ********************************************* other *********************************************

/**
 * parse html string to element
 * @param html string of html
 * @returns html element
 */
function parseHTML(html: string) {
	return new DOMParser().parseFromString(html, "text/html").body.firstChild as HTMLElement;
}
