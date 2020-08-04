import React from 'react'
import './styles.scss'
import { Input, Button, Form, Row, Col, Avatar } from 'antd'
import FilePicker from '../../../components/file-picker'

const FormItem = Form.Item

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { translate, form, auth } = this.props
	const { passwordState } = this.state
	const { getFieldDecorator } = form
	this.setValidations()
	const getFilePickerChildren = ({ getUri }) => {
		const uri = getUri()
		return <Avatar src={uri.length > 0 ? uri[0] : null} />
	}
	const { firstName, photoURL, lastName } = this.validations
	return (
		<div className="setting user-information">
			<div className="user-form">
				<Form onSubmit={this.handleSubmit.bind(this)}>
					<FormItem hasFeedback={true} label="Change Image">
						{getFieldDecorator(
							'photoURL',
							photoURL,
						)(<FilePicker getChildren={getFilePickerChildren} />)}
					</FormItem>
					<FormItem hasFeedback={true} label="User Information">
						{getFieldDecorator(
							'name',
							firstName,
						)(
							<Input
								type={'text'}
								placeholder={translate('common.name.title')}
								className="input"
							/>,
						)}
					</FormItem>
					<div className="action">
						<Button htmlType={'submit'} className="btn green-btn">
							Save Changes
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}
export default view
