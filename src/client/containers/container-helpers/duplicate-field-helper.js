/**
 * These are helper functions for antd-forms
 */

/**
 * For Checking duplicate via server -> Use below 3 functions
 * Mandatory - define a property loading in state and bind checkDuplicateProperty
 * action in container
 */
/**
 * Set Loading icon for the corresponding field
 * @param field
 * @param flag
 * @param callback
 */
export function setLoadingForField(field, flag, callback) {
	let loading = this.state.loading
	loading[field] = flag
	this.setState(
		{
			loading,
		},
		callback,
	)
}

/**
 * Antd Validator for checking duplicates
 * @param rule
 * @param value
 * @param callback
 */
export function checkDuplicateValidator(rule, value, callback) {
	const { translate } = this.props

	/**
	 * If already a request is sent, don't send it since it can hang the field
	 */
	value = value ? value : ''
	if (this.state.loading[rule.name] || value === '') {
		callback()
	} else {
		if (
			typeof this.state.previous !== 'undefined' &&
			this.state.previous[rule.name] === value
		) {
			callback()
			return
		}
		/**
		 * Check if duplicate exists in system
		 */
		this.setLoadingForField(rule.name, true, () => {
			this.checkDuplicate(rule.name, value).then((action) => {
				this.setLoadingForField(rule.name, false, () => {
					if (action.error) {
						callback(translate('signUp.duplicate.' + rule.name))
					} else {
						callback()
					}
				})
			})
		})
	}
}

/**
 * Check if the property is duplicate
 * @param property
 * @param value
 * @returns {*}
 */
export function checkDuplicate(property, value) {
	return this.props.checkDuplicateProperty(property, value)
}
