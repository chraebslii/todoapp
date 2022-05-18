window.onload = () => {
	// elements.ts
	setHeaderToDOM();
	setFooterToDOM();
	setMainSize();

	// app.ts
	const appConfig = { updateIntervalTime: 10000 };
	new App(appConfig);
};
