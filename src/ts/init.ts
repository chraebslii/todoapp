window.onload = () => {
	// elements.ts
	setHeaderToDOM();
	setFooterToDOM();
	setMainSize();

	executeSite(getSiteName());
	// app.ts
	const appConfig = { updateIntervalTime: 10000 };
	new App(appConfig);
};

const executeSite = (siteName: string) => {
	switch (siteName) {
		case "login":
			setEventListener("pe");
			break;
		case "register":
			setEventListener("peu");
			break;
		case "app":
			break;
		default:
			break;
	}
};
