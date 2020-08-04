/**
 * Get Current Route
 */
export function getCurrentRoute() {
	const { routes } = this.props
	const currentRoute = routes ? routes[routes.length - 1] : null
	return currentRoute
}
