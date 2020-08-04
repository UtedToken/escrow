import React from 'react'
import './styles.scss'
import { Button, Form, Input } from 'antd'
const { Item } = Form
var view = function () {
	const { record, form } = this.props
	const { email } = record || {}
	const { getFieldDecorator } = form
	return (
		<div className="send" onSubmit={this.send}>
			<Form>
				<Item hasFeedback={true} label="Email">
					{getFieldDecorator('email', {
						rules: [{ required: true, message: 'Email is Required' }],
						initialValue: email,
					})(<Input className="input" />)}
				</Item>
				<Button htmlType="submit" className="btn green-btn">
					Send
				</Button>
			</Form>
		</div>
	)
}
export default view
