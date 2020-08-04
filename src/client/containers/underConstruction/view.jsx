import React from 'react'
import './styles.scss'
import { Icon } from 'antd'

var view = function () {
	return (
		<div className="error-page 404 content-center">
			<div className="error">
				<p className="graphics">
					<Icon type="tool" />
				</p>
				<p className="error-name">Under Construction</p>
				<p className="descriptive-msg">
					Sorry, we are down for maintenance. Website is coming back very soon.
					Please try after sometime.
				</p>
			</div>
		</div>
	)
}
export default view
