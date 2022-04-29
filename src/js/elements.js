function getRootPath() {
    const path = window.location.pathname.split("/");
    const roots = ["auth"];
    if (roots.includes(path[path.length - 2])) {
        return "../";
    }
    else {
        return "./";
    }
}
function createHeader() {
    const r = getRootPath();
    const headerTemplate = `
        <div class="container f a col">
            <div class="fl"></div>
            <div class="fr f c">
                <a href="${r}settings.php" class="settings">
                    <img src="${r}assets/i/settings.svg" alt="settings icon" class="i" />
                </a>
                <a href="${r}account.php" class="account">
                    <img src="${r}assets/i/account.svg" alt="account icon" class="i" />
                </a>
            </div>
        </div>`;
    return new DOMParser().parseFromString(headerTemplate, "text/html").body.firstChild;
}
function setHeaderToDOM() {
    const header = document.querySelector("#header");
    header.appendChild(createHeader());
}
function createFooter() {
    const footerTemplate = `
        <div class="container f c a row">
            <a href="./impressum.php">Impressum</a>
            <a href="./kontakt.php">Kontakt</a>
            <a href="./datenschutz.php">Datenschutz</a>
        </div>`;
    return new DOMParser().parseFromString(footerTemplate, "text/html").body.firstChild;
}
function setFooterToDOM() {
    const footer = document.querySelector("#footer");
    footer.appendChild(createFooter());
}
function setMainSize() {
    const main = document.querySelector("#main");
    const header = document.querySelector("#header");
    const footer = document.querySelector("#footer");
    const headerHeight = header.offsetHeight;
    const footerHeight = footer.offsetHeight;
    const windowHeight = window.innerHeight;
    main.style.height = `${windowHeight - headerHeight - footerHeight}px`;
}
