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
function buildTasks() {
    const listCont = document.getElementById("list-cont");
    const taskList = getTaskList();
    for (let i = 0; i < taskList.length; i++) {
        const listID = taskList[i].listID;
        const listName = taskList[i].listName;
        const listElement = createListElement(listID, listName);
        listCont.appendChild(listElement);
        const tasks = taskList[i].tasks;
        for (let j = 0; j < tasks.length; j++) {
            const task = tasks[j];
            const taskID = task.taskID;
            const taskName = task.taskName;
            const taskStatus = task.taskStatus;
            if (taskStatus === 0) {
                listElement
                    .querySelector("#open-task-cont")
                    .appendChild(createTaskElement(listID, taskID, taskName, "open", "label"));
            }
            else if (taskStatus === 1) {
                listElement
                    .querySelector("#done-task-cont")
                    .appendChild(createTaskElement(listID, taskID, taskName, "done", "label"));
            }
        }
    }
}
function getTaskList() {
    return JSON.parse(window.localStorage.getItem("taskList"));
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
    task.removeChild(input);
    task.appendChild(span);
    span.addEventListener("click", editTask);
}
function parseHTML(html) {
    return new DOMParser().parseFromString(html, "text/html").body.firstChild;
}
