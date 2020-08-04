import React from 'react'
import './styles.scss'
import { Checkbox, Avatar, Button } from 'antd'
import FilePicker from 'core-components/file-picker'

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { value } = this.state
	const getFilePickerChildren = ({ getUri, openDialog }) => {
		const uri = getUri()
		this.openDialog = openDialog
		return <Avatar src={uri.length > 0 ? uri[0] : null} />
	}
	return (
		<div className="change-image">
			<div className="image">
				<FilePicker
					getChildren={getFilePickerChildren}
					{...this.props}
					value={value}
					onChange={this.onChange.bind(this)}
				/>
			</div>
			<div className="action">
				<Button
					onClick={() => {
						this.openDialog()
					}}
				>
					Change Image
				</Button>
			</div>
		</div>
	)
}
export default view
