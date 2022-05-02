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
            }
            else if (task.taskStatus === 1) {
                listElement.querySelector("#done-task-cont").appendChild(getDoneTaskElement(task, taskList[i].listID));
            }
        }
    }
}
function getTaskList() {
    return JSON.parse(window.localStorage.getItem("taskList"));
}
function getListElement(list) {
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
function getOpenTaskElement(task, listID) {
    const ID = task.taskID;
    const name = task.taskName;
    const taskTemplate = `
		<div class="items task f a row">
			<input type="checkbox" id="li-${listID}-${ID}" name="li-${listID}-${ID}" />
			<span for="li-${listID}-${ID}">${name}</span>
		</div>`;
    return parseHTML(taskTemplate);
}
function getDoneTaskElement(task, listID) {
    const ID = task.taskID;
    const name = task.taskName;
    const taskTemplate = `
		<div class="items task f a row">
			<input checked type="checkbox" id="li-${listID}-${ID}" name="li-${listID}-${ID}" />
			<span for="li-${listID}-${ID}">${name}</span>
		</div>`;
    return parseHTML(taskTemplate);
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
    const taskTemplate = `
        <div class="items task f a row">
            <input type="checkbox" id="li-${listID}-${taskID}" name="li-${listID}-${taskID}" />
            <input type="text" class="task-edit" value="" />
        </div>`;
    const taskElement = parseHTML(taskTemplate);
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
