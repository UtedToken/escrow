import React from 'react'
import './styles.scss'
import { Input, Button, Form } from 'antd'
import Link from '../../../components/link'

const FormItem = Form.Item
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { translate, form, ui } = this.props
	const { getFieldDecorator } = form
	this.setValidations()
	const { password, email } = this.validations
	return (
		<div className="general-form login">
			<div className="content">
				<div className="form">
					<p className="title">Log In</p>
					<Form onSubmit={this.handleSubmit.bind(this)}>
						<div>
							<FormItem hasFeedback={true}>
								{getFieldDecorator(
									'email',
									email,
								)(<Input placeholder="Email" className="input" />)}
							</FormItem>
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
							<div className="forgot">
								<Link
									onClick={
										ui.activeTab ? this.toggleForm.bind(this, 'forgot') : null
									}
									routeKey={ui.activeTab ? null : 'forgotPassword'}
								>
									Forgot Password ?
								</Link>
							</div>
						</div>
						<div className="action">
							<Button
								htmlType={'submit'}
								className="btn green-btn"
								id="sign-in-btn"
							>
								Login
							</Button>
						</div>
					</Form>
					<Link className="registerLink" routeKey={'support'}>
						Need Support ?
					</Link>
					{/*<Link
                        className="registerLink"
                        onClick={ui.activeTab ? this.toggleForm.bind(this, 'Register') : null}
                        routeKey={ui.activeTab ? null : 'Register'}
                    > Create New Account
                    </Link>*/}
				</div>
			</div>
		</div>
	)
}
export default view
