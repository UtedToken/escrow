import React from 'react'
import './styles.scss'
import { Input, Button, Form } from 'antd'
import Link from '../../components/link'

const FormItem = Form.Item
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { translate, form, ui } = this.props
	const { getFieldDecorator } = form
	const { email } = this.validations
	return (
		<div className="page">
			<div className="general-form forgetPassword">
				<div className="content">
					<div className="form">
						<div className="fields">
							<p className="title">Forgot Password</p>
							<p className="description">
								Please verify your email for us. Once you do, we'll send
								instructions to reset your password.
							</p>
							<Form onSubmit={this.handleSubmit.bind(this)}>
								<FormItem hasFeedback={true}>
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
								<div className="action">
									<Button htmlType={'submit'} className="btn green-btn">
										Submit
									</Button>
								</div>
							</Form>
						</div>
						<div className="options shared">
							<div className="option">
								<p className="optionLabel">Clicked by mistake?</p>
								<Link
									className="textLink"
									onClick={
										ui.activeTab ? this.toggleForm.bind(this, 'login') : null
									}
									routeKey={ui.activeTab ? null : 'login'}
								>
									Login
								</Link>
							</div>
							<div className="option">
								<p className="optionLabel">Need Support?</p>
								<Link className="textLink" routeKey={'support'}>
									Support
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default view
