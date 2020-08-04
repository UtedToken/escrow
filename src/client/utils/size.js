export function readableSize(bytes) {
	const i = Math.floor(Math.log(bytes) / Math.log(1024))
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i]
}