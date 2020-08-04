/**
 * Handle change for a form element
 * Sets in state the value of selected dropdown
 * Usage - name of form element should be same as state property
 * @param e
 */
export function handleChange(e) {
	let state = {
		...this.state,
	}
	state[e.target.name] = e.target.value
	this.setState(state)
}

/**
 * Handle Change for Antd Select
 * Sets in state the value of selected dropdown
 * Usage - propName should be same as state property
 * @param propName
 * @param value
 * @param option
 * @param callback - Callback to be called
 */
export function handleChangeAntSelect(value, option, propName, callback) {
	console.log(value)
	let state = {
		...this.state,
	}
	state[propName] = value
	this.setState(state, callback)
}
