function parseHTML(html) {
    return new DOMParser().parseFromString(html, "text/html").body.firstChild;
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function getSiteName() {
    const url = window.location.href.split("/");
    const siteName = url[url.length - 1].split(".")[0];
    return siteName;
}
