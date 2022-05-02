// ********************************************* build tasks *********************************************
interface TaskList {
	listID: number;
	listName: string;
	listUserID: number;
	tasks: Task[];
}
interface Task {
	taskID: number;
	taskName: string;
	taskStatus: 0 | 1;
}

/**
 * build the tasks from localStorage and append them to the lists
 */
function buildTasks() {
	const listCont = document.getElementById("list-cont");
	const taskList = getTaskList();

	for (let i = 0; i < taskList.length; i++) {
		const tasks = taskList[i].tasks;
		const listElement = getListElement(taskList[i]);
		listCont.appendChild(listElement);

		for (let j = 0; j < tasks.length; j++) {
			const task = tasks[j];
			if (task.taskStatus === 0) {
				listElement.querySelector("#open-task-cont").appendChild(getOpenTaskElement(task, taskList[i].listID));
			} else if (task.taskStatus === 1) {
				listElement.querySelector("#done-task-cont").appendChild(getDoneTaskElement(task, taskList[i].listID));
			}
		}
	}
}

/**
 * get task object from localStorage and return it
 * @returns the task list from localStorage
 */
function getTaskList() {
	return JSON.parse(window.localStorage.getItem("taskList"));
}

/**
 * get list element
 * @param list element of list
 * @returns HTML element of list
 */
function getListElement(list: TaskList) {
	const ID = list.listID;
	const name = list.listName;
	const listTemplate = `
		<div class="list-cont" id="list-cont">
			<div class="list" id="list-${ID}">
				<div class="header f a row">
					<span class="list-title f20">${name}</span>
				</div>
				<div class="content open f col">
					<div class="items-cont-open" id="open-task-cont"></div>
				</div>
				<div class="add-task">
					<img src="./assets/i/plus.svg" alt="plus icon" class="i" onclick="addTask(this)" />
				</div>
				<div class="content done f col" data-toggle="closed">
					<div class="toggle-header f a row" onclick="toggleDoneTasks(this)">
						<span>abgehakte </span>
						<img src="./assets/i/expand-more.svg" alt="expand icon" class="i toggle-tasks-icon" />
					</div>
					<div class="items-cont-done" id="done-task-cont"></div>
				</div>
			</div>
		</div>`;
	return parseHTML(listTemplate);
}

/**
 * get HTML element of open task
 * @param task element of task
 * @param listID id of list
 * @returns HTML element of open task
 */
function getOpenTaskElement(task: Task, listID: number) {
	const ID = task.taskID;
	const name = task.taskName;
	const taskTemplate = `
		<div class="items task f a row">
			<input type="checkbox" id="li-${listID}-${ID}" name="li-${listID}-${ID}" />
			<span for="li-${listID}-${ID}">${name}</span>
		</div>`;
	return parseHTML(taskTemplate);
}

/**
 * get HTML element of done task
 * @param task element of task
 * @param listID id of list
 * @returns HTML element of done task
 */
function getDoneTaskElement(task: Task, listID: number) {
	const ID = task.taskID;
	const name = task.taskName;
	const taskTemplate = `
		<div class="items task f a row">
			<input checked type="checkbox" id="li-${listID}-${ID}" name="li-${listID}-${ID}" />
			<span for="li-${listID}-${ID}">${name}</span>
		</div>`;
	return parseHTML(taskTemplate);
}

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
		moveTaskToDoneOrOpen(task, ".items-cont-open");
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
 * @param plusImg element of plus
 */
function addTask(plusImg: HTMLElement) {
	const listID = getListID(plusImg.parentNode.parentNode as HTMLDivElement);
	const taskID = getNextTaskID(listID);
	const taskTemplate = `
        <div class="items task f a row">
            <input type="checkbox" id="li-${listID}-${taskID}" name="li-${listID}-${taskID}" />
            <input type="text" class="task-edit" value="" />
        </div>`;
	const taskElement = parseHTML(taskTemplate);
	taskElement.querySelector("input").addEventListener("click", toggleTask);
	taskElement.querySelector(".task-edit").addEventListener("focusout", saveTask);
	document.querySelector(`#list-${listID}`).querySelector(".items-cont-open").appendChild(taskElement);
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
	return document.querySelector(`#list-${listID}`).querySelector(".items-cont-open").children.length + 1;
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
