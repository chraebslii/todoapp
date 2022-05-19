// ********************************************* root path *********************************************
/**
 * get path of the website for out-public folders
 * @returns path for items
 */
function getRootPath() {
	const path = window.location.pathname.split("/");
	const roots = ["auth"];
	if (roots.includes(path[path.length - 2])) {
		return "../../";
	} else {
		return "../";
	}
}

/**
 * get path of the website for in-public folders
 * @returns path for pages
 */
function getLocalRootPath() {
	const path = window.location.pathname.split("/");
	const roots = ["auth"];
	if (roots.includes(path[path.length - 2])) {
		return "../../";
	} else {
		return "../";
	}
}

// ********************************************* header element *********************************************
/**
 * set header to DOM
 */
function setHeaderToDOM() {
	const header = document.querySelector("#header") as HTMLElement;
	header.appendChild(createHeaderElement());
}

/**
 * create header element
 * @returns header element
 */
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

// ********************************************* footer element *********************************************
/**
 * set footer to DOM
 */
function setFooterToDOM() {
	const footer = document.querySelector("#footer") as HTMLElement;
	footer.appendChild(createFooterElement());
}

/**
 * create footer element
 * @returns footer element
 */
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

// ********************************************* main element *********************************************
/**
 * set size of main element depending on window size, header and footer
 */
function setMainSize() {
	const main = document.querySelector("#main") as HTMLElement;
	const header = document.querySelector("#header") as HTMLElement;
	const footer = document.querySelector("#footer") as HTMLElement;
	const headerHeight = header.offsetHeight;
	const footerHeight = footer.offsetHeight;
	const windowHeight = window.innerHeight;
	main.style.height = `${windowHeight - headerHeight - footerHeight}px`;
}
