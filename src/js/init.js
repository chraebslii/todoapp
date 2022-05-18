window.onload = () => {
    setHeaderToDOM();
    setFooterToDOM();
    setMainSize();
    const appConfig = { updateIntervalTime: 10000 };
    new App(appConfig);
};
