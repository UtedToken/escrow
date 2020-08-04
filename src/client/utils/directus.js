/**
 * Get Thumbnail
 * @param file
 * @returns {*}
 */
export function getThumbnailUrl(file) {
	return file.thumbnail_url //window.app.host+file.thumbnail_url;
}

/**
 * Get image url
 * @param file
 * @returns {string}
 */
export function getImage(file) {
	return file.url //window.app.host+file.url;
}
