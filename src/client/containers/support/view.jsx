import React from 'react'
import './styles.scss'
import SupportForm from './supportForm'

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	return (
		<div className="support-form">
			<div className="heading">
				<p className="page-title">Support Form</p>
				<p className="description">
					Please fill the form and we will get back to you soon.{' '}
				</p>
			</div>
			<SupportForm />
		</div>
	)
}
export default view
