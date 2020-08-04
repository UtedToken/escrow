import React from 'react'
import './styles.scss'
import ProfileInformation from './profile-information'
import SecuritySettings from './security'

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	return (
		<div className="settings">
			<div className="content">
				<p className="page-title">Account Settings</p>
				<div className="form">
					<ProfileInformation />
					<SecuritySettings />
				</div>
			</div>
		</div>
	)
}
export default view
