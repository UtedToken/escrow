import React from 'react'
import './styles.scss'
import { Icon } from 'antd'

var view = function () {
	return (
		<div className="error-page 404 content-center">
			<div className="error">
				<p className="graphics">
					<Icon type="frown-o" />
				</p>
				<p className="error-name">500</p>
				<p className="small-msg">Something went wrong</p>
				<p className="descriptive-msg">
					Sorry, we had me technical problems during your last operation.
				</p>
			</div>
		</div>
	)
}
export default view
