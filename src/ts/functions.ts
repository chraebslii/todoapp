// ********************************************* html parser *********************************************
/**
 * parse html string to element
 * @param html string of html
 * @returns html element
 */
function parseHTML(html: string) {
	return new DOMParser().parseFromString(html, "text/html").body.firstChild as HTMLElement;
}

// ********************************************* sleep *********************************************
/**
 * set timeout until next action
 * @param ms milliseconds
 * @returns promise
 */
function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// ********************************************* site name *********************************************
/**
 * get site name of page
 * @returns site name
 */
function getSiteName() {
	const url = window.location.href.split("/");
	const siteName = url[url.length - 1].split(".")[0];
	return siteName;
}
