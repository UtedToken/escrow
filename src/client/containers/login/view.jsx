import React from 'react'
import './styles.scss'
import LoginForm from './loginForm'

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	return (
		<div className="page">
			<LoginForm />
		</div>
	)
}
export default view
