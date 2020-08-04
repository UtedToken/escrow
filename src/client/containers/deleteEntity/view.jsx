import React from 'react'
import './styles.scss'
import { Button } from 'antd'

var view = function () {
	const { className, buttonText } = this.props
	return (
		<Button
			className={className || 'red-btn-text'}
			onClick={this.deleteEntity.bind(this)}
		>
			{buttonText || 'Remove'}
		</Button>
	)
}
export default view
