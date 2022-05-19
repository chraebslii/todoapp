window.onload = () => {
    setHeaderToDOM();
    setFooterToDOM();
    setMainSize();
    executeSite(getSiteName());
    const appConfig = { updateIntervalTime: 10000 };
    new App(appConfig);
};
const executeSite = (siteName) => {
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
