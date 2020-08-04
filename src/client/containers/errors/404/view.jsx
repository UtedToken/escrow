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
				<p className="error-name">404</p>
				<p className="small-msg">Page not found</p>
				<p className="descriptive-msg">
					The page you are looking for does not exist or an other error occured.
					Go to our Home page.
				</p>
			</div>
		</div>
	)
}
export default view
