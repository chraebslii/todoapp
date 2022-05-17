function parseHTML(html) {
    return new DOMParser().parseFromString(html, "text/html").body.firstChild;
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
