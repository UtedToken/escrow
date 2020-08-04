import React from 'react'
import './styles.scss'
import { Input, Button, Form } from 'antd'
import Link from 'core-components/link'

const { TextArea } = Input

const FormItem = Form.Item
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { form } = this.props
	const { getFieldDecorator } = form
	this.setValidations()
	const { name, message, email } = this.validations
	return (
		<div className="general-form login">
			<div className="content">
				<div className="form">
					<p className="title">Support</p>
					<Form onSubmit={this.handleSubmit.bind(this)}>
						<div>
							<FormItem hasFeedback={true}>
								{getFieldDecorator(
									'name',
									name,
								)(<Input placeholder="Full Name" className="input" />)}
							</FormItem>
							<FormItem hasFeedback={true}>
								{getFieldDecorator(
									'email',
									email,
								)(<Input placeholder="Email" className="input" />)}
							</FormItem>
							<FormItem hasFeedback={true}>
								{getFieldDecorator(
									'message',
									message,
								)(
									<TextArea placeholder={'Message'} rows={4} maxLength={500} />,
								)}
							</FormItem>
						</div>
						<div className="action">
							<Button htmlType={'submit'} className="btn green-btn">
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
