import React from 'react'
import './styles.css'

var view = function () {
	const { translate, langKey } = this.props
	if (!langKey) {
		return null
	}
	return <span>{translate(langKey)}</span>
}
export default view
