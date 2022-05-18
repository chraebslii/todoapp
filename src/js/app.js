function createListElement(listID, listName) {
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
function createTaskElement(listID, taskID, taskName, status, type) {
    let checked = "";
    if (status === "done") {
        checked = "checked";
    }
    let label = "";
    if (type === "label") {
        label = `<span for="li-${listID}-${taskID}">${taskName}</span>`;
    }
    else if (type === "input") {
        label = `<input type="text" class="task-edit" value="" />`;
    }
    const taskTemplate = `
		<div class="items task f a row">
			<input ${checked} type="checkbox" id="li-${listID}-${taskID}" name="li-${listID}-${taskID}" />
			${label}
		</div>`;
    return parseHTML(taskTemplate);
}
class App {
    constructor() {
        this.buildLists();
        setEventListenerOnTasks();
    }
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
    constructor(TaskList) {
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
    buildList() {
        const listCont = document.getElementById("list-cont");
        const listElement = createListElement(this.listID, this.listName);
        listCont.appendChild(listElement);
        this.listElement = listElement;
    }
    updateList() { }
}
class TaskItem {
    constructor(TaskItem, listID, listElement) {
        this.taskID = TaskItem.taskID;
        this.taskName = TaskItem.taskName;
        this.taskStatus = TaskItem.taskStatus;
        this.lastSaved = new Date(TaskItem.lastSaved);
        this.listID = listID;
        this.buildTask(listElement);
    }
    buildTask(listElement) {
        if (this.taskStatus === 0) {
            listElement
                .querySelector("#open-task-cont")
                .appendChild(createTaskElement(this.listID, this.taskID, this.taskName, "open", "label"));
        }
        else if (this.taskStatus === 1) {
            listElement
                .querySelector("#done-task-cont")
                .appendChild(createTaskElement(this.listID, this.taskID, this.taskName, "done", "label"));
        }
        this.taskElement = document.getElementById(`li-${this.listID}-${this.taskID}`);
        this.updateInterval = setInterval(this.updateTask, 5000, this);
    }
    updateTaskConnection(self) {
        this.updateTask(self);
    }
    updateTask(taskItem) {
        const updatedTask = taskItem.getUpdatedDateTime();
        if (updatedTask.update !== false) {
            const newTaskItem = updatedTask.newTaskItem;
            taskItem.taskName = newTaskItem.taskName;
            taskItem.lastSaved = new Date(newTaskItem.lastSaved);
            taskItem.updateTaskHTML(newTaskItem);
            console.log(`task with id ${taskItem.taskID} has to be updated`);
        }
        else {
        }
    }
    getUpdatedDateTime() {
        const newTask = getNewTaskItem(this.taskID);
        newTask.lastSaved = new Date(newTask.lastSaved);
        if (this.lastSaved < newTask.lastSaved) {
            return { update: true, newTaskItem: newTask };
        }
        else {
            return { update: false, newTaskItem: newTask };
        }
    }
    updateTaskHTML(taskItem) {
        const item = this.taskElement.parentElement.children[1];
        item.innerHTML = taskItem.taskName;
    }
}
function toggleDoneTasks(element) {
    element = element.parentNode;
    const toggleArrow = element.querySelector(".toggle-tasks-icon");
    if (element.dataset.toggle === "open") {
        element.dataset.toggle = "closed";
        toggleArrow.src = "./assets/i/expand-more.svg";
    }
    else {
        element.dataset.toggle = "open";
        toggleArrow.src = "./assets/i/expand-less.svg";
    }
}
function setEventListenerOnTasks() {
    const tasks = document.querySelectorAll(".task");
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        task.querySelector("input").addEventListener("input", toggleTask);
        task.querySelector("span").addEventListener("click", editTask);
    }
}
function toggleTask() {
    const task = this.parentNode;
    const input = task.children[0];
    if (input.checked) {
        moveTaskToDoneOrOpen(task, ".items-cont-done");
    }
    else {
        moveTaskToDoneOrOpen(task, ".items-cont-open");
    }
    const taskID = getTaskID(input);
    const taskName = task.children[1].innerHTML;
    const taskStatus = input.checked ? 1 : 0;
    saveTaskToDatabase(taskID, taskName, taskStatus);
}
function moveTaskToDoneOrOpen(task, selector) {
    const parentList = task.parentNode.parentNode.parentNode;
    const openTasksCont = parentList.querySelector(selector);
    openTasksCont.appendChild(task);
}
function addTask(plusImg) {
    const listID = getListID(plusImg.parentNode.parentNode);
    const taskID = getNextTaskID(listID);
    const taskElement = createTaskElement(listID, taskID, "", "open", "input");
    taskElement.querySelector("input").addEventListener("click", toggleTask);
    taskElement.querySelector(".task-edit").addEventListener("focusout", saveTask);
    document.querySelector(`#list-${listID}`).querySelector(".items-cont-open").appendChild(taskElement);
    taskElement.querySelector(".task-edit").focus();
}
function getListID(list) {
    return parseInt(list.getAttribute("id").split("-")[1]);
}
function getTaskID(taskInput) {
    return parseInt(taskInput.getAttribute("id").split("-")[2]);
}
function getNextTaskID(listID) {
    return document.querySelector(`#list-${listID}`).querySelector(".items-cont-open").children.length + 1;
}
function editTask() {
    const task = this.parentNode;
    const span = task.querySelector("span");
    const inputTemplate = `
    <input type="text" class="task-edit"value="${span.innerHTML}" />`;
    const input = parseHTML(inputTemplate);
    input.addEventListener("focusout", saveTask);
    task.removeChild(span);
    task.appendChild(input);
    input.focus();
}
function saveTask() {
    const task = this.parentNode;
    const input = task.querySelector(".task-edit");
    const spanTemplate = `
        <span>${input.value}</span>`;
    const span = parseHTML(spanTemplate);
    const checkbox = task.querySelector("input");
    const taskID = getTaskID(checkbox);
    const taskStatus = checkbox.checked ? 1 : 0;
    saveTaskToDatabase(taskID, input.value, taskStatus);
    task.removeChild(input);
    task.appendChild(span);
    span.addEventListener("click", editTask);
}
function saveTaskToDatabase(taskID, taskName, taskStatus) {
    saveToDatabase("./app/saveTask.php", { taskID: taskID, taskName: taskName, taskStatus: taskStatus });
}
function saveNewTaskToDatabase(listID, taskName, taskStatus) {
    saveToDatabase("./app/saveNewTask.php", { listID: listID, taskName: taskName, taskStatus: taskStatus });
}
function saveToDatabase(url, params) {
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
    const request = new XMLHttpRequest();
    const data = new FormData(form);
    request.open("POST", url, true);
    request.send(data);
}
function getAllLists() {
    const name = "taskListArr";
    getFromDatabase("./app/getLists.php", name);
    const data = JSON.parse(window.localStorage.getItem(name));
    window.localStorage.removeItem(name);
    return data;
}
function getNewTaskItem(taskID) {
    const name = `taskItem-${taskID}`;
    getFromDatabase(`./app/getTask.php?id=${taskID}`, name);
    const data = JSON.parse(window.localStorage.getItem(name));
    window.localStorage.removeItem(name);
    return data;
}
function getFromDatabase(url, name) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            window.localStorage.setItem(name, request.responseText);
        }
    };
}
