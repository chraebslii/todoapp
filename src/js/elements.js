function getRootPath() {
    const path = window.location.pathname.split("/");
    const roots = ["auth"];
    if (roots.includes(path[path.length - 2])) {
        return "../../";
    }
    else {
        return "../";
    }
}
function getLocalRootPath() {
    const path = window.location.pathname.split("/");
    const roots = ["auth"];
    if (roots.includes(path[path.length - 2])) {
        return "../../";
    }
    else {
        return "../";
    }
}
function setHeaderToDOM() {
    const header = document.querySelector("#header");
    header.appendChild(createHeaderElement());
}
function createHeaderElement() {
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
    return parseHTML(headerTemplate);
}
function setFooterToDOM() {
    const footer = document.querySelector("#footer");
    footer.appendChild(createFooterElement());
}
function createFooterElement() {
    const r = getLocalRootPath();
    const footerTemplate = `
	<div class="container f c a row">
	<a href="${r}impressum.php">Impressum</a>
	<a href="${r}kontakt.php">Kontakt</a>
	<a href="${r}datenschutz.php">Datenschutz</a>
	</div>`;
    return parseHTML(footerTemplate);
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
