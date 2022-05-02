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
        moveTaskToDoneOrOpen(task, ".content.open");
    }
}
function moveTaskToDoneOrOpen(task, selector) {
    const parentList = task.parentNode.parentNode.parentNode;
    const openTasksCont = parentList.querySelector(selector);
    openTasksCont.appendChild(task);
}
function addTask(e) {
    const listID = getListID(e.parentNode.parentNode);
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
    taskElement.querySelector(".task-edit").focus();
}
function getListID(list) {
    return parseInt(list.getAttribute("id").split("-")[1]);
}
function getNextTaskID(listID) {
    return document.querySelector(`#list-${listID}`).querySelector(".content.open").children.length + 1;
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
