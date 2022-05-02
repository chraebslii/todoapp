window.onload = () => {
	// elements.ts
	setHeaderToDOM();
	setFooterToDOM();
	setMainSize();

	// app.ts
	buildTasks();
	setEventListenerOnTasks();
};
