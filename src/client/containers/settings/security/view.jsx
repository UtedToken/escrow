import React from 'react'
import './styles.scss'
import { Input, Button, Form, Row, Col, Icon } from 'antd'

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
	const { email, password, confirmPassword, oldPassword } = this.validations
	return (
		<div className="section setting security">
			<div className="security-form">
				<Form onSubmit={this.handleSubmit.bind(this)}>
					<FormItem hasFeedback={true} label="Change Email">
						{getFieldDecorator(
							'email',
							email,
						)(
							<Input
								placeholder={translate('common.email.placeholder')}
								className="input"
							/>,
						)}
					</FormItem>
					<FormItem hasFeedback={true} label="Current Password">
						{getFieldDecorator(
							'oldPassword',
							oldPassword,
						)(
							<Input
								type={passwordState.oldPassword ? 'text' : 'password'}
								prefix={
									<a
										onClick={this.togglePasswordVisible.bind(
											this,
											'oldPassword',
										)}
									>
										<Icon type={passwordState.oldPassword ? 'eye' : 'eye-o'} />
									</a>
								}
								placeholder={translate('common.currentPassword.placeholder')}
								className="input"
							/>,
						)}
					</FormItem>
					<FormItem hasFeedback={true} label="New Password">
						{getFieldDecorator(
							'password',
							password,
						)(
							<Input
								type={passwordState.newPassword ? 'text' : 'password'}
								prefix={
									<a
										onClick={this.togglePasswordVisible.bind(
											this,
											'newPassword',
										)}
									>
										<Icon type={passwordState.newPassword ? 'eye' : 'eye-o'} />
									</a>
								}
								placeholder={translate('common.newPassword.placeholder')}
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
