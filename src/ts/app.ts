/**
 * toggle the visibility of the 'done' list
 * @param e toggle element
 */
function toggleDoneTasks(e: HTMLDivElement) {
	const toggleArrow = e.querySelector(".toggle-tasks-icon") as HTMLImageElement;
	if (e.dataset.toggle === "open") {
		e.dataset.toggle = "closed";
		toggleArrow.src = "./assets/i/expand-more.svg";
	} else {
		e.dataset.toggle = "open";
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
		task.addEventListener("click", toggleTask);
	}
}

/**
 * move task to done list or open list depending on the current checked state
 */
function toggleTask() {
	const task = this as HTMLDivElement;
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
            <label for="li-${listID}-${taskID}">new Item</label>
        </div>`;
	const taskElement = new DOMParser().parseFromString(taskTemplate, "text/html").body.firstChild as HTMLElement;
	taskElement.addEventListener("click", toggleTask);
	document.querySelector(`#list-${listID}`).querySelector(".content.open").appendChild(taskElement);
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
