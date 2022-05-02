// ********************************************* html parser *********************************************
/**
 * parse html string to element
 * @param html string of html
 * @returns html element
 */
function parseHTML(html: string) {
	return new DOMParser().parseFromString(html, "text/html").body.firstChild as HTMLElement;
}
