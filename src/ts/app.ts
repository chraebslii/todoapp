// ********************************************* interfaces *********************************************
interface App {
	taskLists: TaskList[];
}
interface TaskList {
	listID: number;
	listName: string;
	listUserID: number;
	tasks: TaskItem[];
	listElement: HTMLElement;
}
interface TaskItem {
	taskID: number;
	taskName: string;
	taskStatus: 0 | 1;
	listID: number;
	taskElement: HTMLElement;
	updateInterval: NodeJS.Timer;
	lastSaved: Date;
}

// ********************************************* create elements *********************************************
/**
 * create list element
 * @param listID id of list
 * @param listName name of list
 * @returns list element
 */
function createListElement(listID: number, listName: string) {
	const listTemplate = `
		<div class="list-cont" id="list-cont">
			<div class="list" id="list-${listID}">
				<div class="header f a row">
					<span class="list-title f20">${listName}</span>
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
 * create task element
 * @param listID id of list
 * @param taskID id of task
 * @param taskName name of task
 * @param status status of task
 * @returns task element
 */
function createTaskElement(
	listID: number,
	taskID: number,
	taskName: string,
	status: "open" | "done",
	type: "label" | "input"
) {
	let checked = "";
	if (status === "done") {
		checked = "checked";
	}
	let label = "";
	if (type === "label") {
		label = `<span for="li-${listID}-${taskID}">${taskName}</span>`;
	} else if (type === "input") {
		label = `<input type="text" class="task-edit" value="" />`;
	}

	const taskTemplate = `
		<div class="items task f a row">
			<input ${checked} type="checkbox" id="li-${listID}-${taskID}" name="li-${listID}-${taskID}" />
			${label}
		</div>`;
	return parseHTML(taskTemplate);
}

// ********************************************* build tasks *********************************************
class App {
	constructor() {
		this.buildLists();
		setEventListenerOnTasks();
	}

	/**
	 * build the tasks from localStorage and append them to the lists
	 */
	buildLists() {
		const taskList = getAllLists();
		if (taskList === null) {
			sleep(1000).then(() => {
				this.buildLists();
			});
			return;
		}

		this.taskLists = [];
		for (let i = 0; i < taskList.length; i++) {
			const list = new TaskList(taskList[i]);
			this.taskLists.push(list);
		}
	}
}

class TaskList {
	constructor(TaskList: TaskList) {
		this.listID = TaskList.listID;
		this.listName = TaskList.listName;
		this.listUserID = TaskList.listUserID;
		this.buildList();

		this.tasks = [];
		for (let i = 0; i < TaskList.tasks.length; i++) {
			const task = new TaskItem(TaskList.tasks[i], this.listID, this.listElement);
			this.tasks.push(task);
		}
	}

	/**
	 * build the list element
	 */
	buildList() {
		const listCont = document.getElementById("list-cont");
		const listElement = createListElement(this.listID, this.listName);
		listCont.appendChild(listElement);
		this.listElement = listElement;
	}

	updateList() {}
}

class TaskItem {
	constructor(TaskItem: TaskItem, listID: number, listElement: HTMLElement) {
		this.taskID = TaskItem.taskID;
		this.taskName = TaskItem.taskName;
		this.taskStatus = TaskItem.taskStatus;
		this.lastSaved = new Date(TaskItem.lastSaved);
		this.listID = listID;
		this.buildTask(listElement);
	}

	/**
	 * build the task element
	 * @param listElement list element
	 */
	buildTask(listElement: HTMLElement) {
		if (this.taskStatus === 0) {
			listElement
				.querySelector("#open-task-cont")
				.appendChild(createTaskElement(this.listID, this.taskID, this.taskName, "open", "label"));
		} else if (this.taskStatus === 1) {
			listElement
				.querySelector("#done-task-cont")
				.appendChild(createTaskElement(this.listID, this.taskID, this.taskName, "done", "label"));
		}
		this.taskElement = document.getElementById(`li-${this.listID}-${this.taskID}`);
		this.updateInterval = setInterval(this.updateTask, 5000, this);
	}

	/**
	 * connector of task updater because of setInterval
	 */
	updateTaskConnection(self: TaskItem) {
		this.updateTask(self);
	}

	/**
	 * update task
	 * @param taskItem task item
	 */
	updateTask(taskItem: TaskItem) {
		const updatedTask = taskItem.getUpdatedDateTime();

		if (updatedTask.update !== false) {
			const newTaskItem = updatedTask.newTaskItem;
			taskItem.taskName = newTaskItem.taskName;
			taskItem.lastSaved = new Date(newTaskItem.lastSaved);
			taskItem.updateTaskHTML(newTaskItem);
			console.log(`task with id ${taskItem.taskID} has to be updated`);
		} else {
			//console.log(`task with id ${taskItem.taskID} is up to date`);
		}
	}

	/**
	 * check if task needs to be updated
	 * @returns {{ update: boolean; newTaskItem: TaskItem }} update: true if task needs to be updated, false if not, newTaskItem: updated task item
	 */
	getUpdatedDateTime(): { update: boolean; newTaskItem: TaskItem } {
		const newTask = getNewTaskItem(this.taskID);
		newTask.lastSaved = new Date(newTask.lastSaved);

		if (this.lastSaved < newTask.lastSaved) {
			return { update: true, newTaskItem: newTask };
		} else {
			return { update: false, newTaskItem: newTask };
		}
	}

	/**
	 * update HTML of the current task
	 * @param taskItem updated task item
	 */
	updateTaskHTML(taskItem: TaskItem) {
		const item = this.taskElement.parentElement.children[1];
		item.innerHTML = taskItem.taskName;
	}
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
	const taskID = getTaskID(input);
	const taskName = task.children[1].innerHTML;
	const taskStatus = input.checked ? 1 : 0;
	saveTaskToDatabase(taskID, taskName, taskStatus);
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
	const taskElement = createTaskElement(listID, taskID, "", "open", "input");
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
 * get task id of current task
 * @param taskInput element of task
 * @returns id of task as number
 */
function getTaskID(taskInput: HTMLDivElement) {
	return parseInt(taskInput.getAttribute("id").split("-")[2]);
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

	// database handling
	const checkbox = task.querySelector("input") as HTMLInputElement;
	const taskID = getTaskID(checkbox);
	const taskStatus = checkbox.checked ? 1 : 0;
	saveTaskToDatabase(taskID, input.value, taskStatus);

	// update DOM
	task.removeChild(input);
	task.appendChild(span);
	span.addEventListener("click", editTask);
}

// ********************************************* save to database *********************************************
/**
 * save existing task to database
 * @param taskID id of task
 * @param taskName name of task
 * @param taskStatus status of task
 */
function saveTaskToDatabase(taskID: number, taskName: string, taskStatus: 0 | 1) {
	saveToDatabase("./app/saveTask.php", { taskID: taskID, taskName: taskName, taskStatus: taskStatus });
}

/**
 * save new task to database
 * @param listID id of list
 * @param taskName name of task
 * @param taskStatus status of task
 */
function saveNewTaskToDatabase(listID: number, taskName: string, taskStatus: 0 | 1) {
	saveToDatabase("./app/saveNewTask.php", { listID: listID, taskName: taskName, taskStatus: taskStatus });
}

/**
 * post request to database
 * @param url path to file
 * @param params object with parameters
 */
function saveToDatabase(url: string, params: any) {
	const form = document.createElement("form");
	for (const key in params) {
		if (params.hasOwnProperty(key)) {
			const hiddenField = document.createElement("input");
			hiddenField.type = "hidden";
			hiddenField.name = key;
			hiddenField.value = params[key];
			form.appendChild(hiddenField);
		}
	}
	document.body.appendChild(form);

	// request
	const request = new XMLHttpRequest();
	const data = new FormData(form);
	request.open("POST", url, true);
	request.send(data);
}

// ********************************************* get from database *********************************************
/**
 * get all tasks from database
 * @returns array with all lists
 */
function getAllLists(): TaskList[] {
	const name = "taskListArr";
	getFromDatabase("./app/getLists.php", name);
	const data = JSON.parse(window.localStorage.getItem(name)) as TaskList[];
	window.localStorage.removeItem(name);
	return data;
}

/**
 * get single task from database with id
 * @param taskID id of task
 * @returns task as json object
 */
function getNewTaskItem(taskID: number) {
	const name = `taskItem-${taskID}`;
	getFromDatabase(`./app/getTask.php?id=${taskID}`, name);
	const data = JSON.parse(window.localStorage.getItem(name)) as TaskItem;
	window.localStorage.removeItem(name);
	return data;
}

/**
 * get data from database
 * @param url path to file
 */
function getFromDatabase(url: string, name: string) {
	const request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.send();
	request.onreadystatechange = () => {
		if (request.readyState === 4 && request.status === 200) {
			window.localStorage.setItem(name, request.responseText);
		}
	};
}
