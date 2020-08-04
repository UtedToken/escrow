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
				<p className="error-name">401</p>
				<p className="small-msg">Unauthorized</p>
				<p className="descriptive-msg">
					You are not authorized for this operation
				</p>
			</div>
		</div>
	)
}
export default view
