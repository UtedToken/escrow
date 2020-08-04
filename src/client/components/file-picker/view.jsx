import React from 'react'
import classnames from 'classnames'
import { Upload } from 'antd'
//import './styles.scss';
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { children, getChildren } = this.props
	if (getChildren) {
		if (!getChildren instanceof Function) {
			console.error('getChildren should be of type function')
			return null
		}
		return (
			<span
				ref={(ref) => {
					this.uploadRef = ref
				}}
			>
				<Upload {...this.getUploadProps()}>
					{getChildren(this.getExposedConfig())}
				</Upload>
			</span>
		)
	} else {
		return (
			<span
				ref={(ref) => {
					this.uploadRef = ref
				}}
			>
				<Upload {...this.getUploadProps()}>{children}</Upload>
			</span>
		)
	}
}
export default view
