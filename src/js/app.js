function toggleDoneTasks(e) {
    const toggleArrow = e.querySelector(".toggle-tasks-icon");
    if (e.dataset.toggle === "open") {
        e.dataset.toggle = "closed";
        toggleArrow.src = "./assets/i/expand-more.svg";
    }
    else {
        e.dataset.toggle = "open";
        toggleArrow.src = "./assets/i/expand-less.svg";
    }
}
function setEventListenerOnTasks() {
    const tasks = document.querySelectorAll(".task");
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        task.addEventListener("click", toggleTask);
    }
}
function toggleTask() {
    const task = this;
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
            <label for="li-${listID}-${taskID}">new Item</label>
        </div>`;
    const taskElement = new DOMParser().parseFromString(taskTemplate, "text/html").body.firstChild;
    taskElement.addEventListener("click", toggleTask);
    document.querySelector(`#list-${listID}`).querySelector(".content.open").appendChild(taskElement);
}
function getListID(list) {
    return parseInt(list.getAttribute("id").split("-")[1]);
}
function getNextTaskID(listID) {
    return document.querySelector(`#list-${listID}`).querySelector(".content.open").children.length + 1;
}
