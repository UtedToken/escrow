import React from 'react'
import './styles.scss'
import { Input, Button, Form } from 'antd'

const FormItem = Form.Item
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { translate, form } = this.props
	const { getFieldDecorator } = form
	const { password, confirmPassword } = this.validations
	return (
		<div className="general-form resetPassword">
			<div className="content">
				<div className="form">
					<p className="title">Reset Password</p>
					<p className="description">
						Please enter your new password in the fields below.
					</p>
					<Form onSubmit={this.handleSubmit.bind(this)}>
						<FormItem hasFeedback={true}>
							{getFieldDecorator(
								'password',
								password,
							)(
								<Input
									type={'password'}
									placeholder={translate('common.password.placeholder')}
									className="input"
								/>,
							)}
						</FormItem>
						<FormItem hasFeedback={true}>
							{getFieldDecorator(
								'confirmPassword',
								confirmPassword,
							)(
								<Input
									type={'password'}
									placeholder={translate('common.confirm-password.placeholder')}
									className="input"
								/>,
							)}
						</FormItem>
						<div className="action">
							<Button
								htmlType={'submit'}
								size="large"
								className="btn green-btn"
							>
								Submit
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
}
export default view
