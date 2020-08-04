import React from 'react'
import './styles.scss'
import { Button, Input, Form } from 'antd'

const { TextArea } = Input
const { Item } = Form
var view = function () {
	const { form } = this.props
	const { getFieldDecorator } = form
	const { billTo, email } = this.validations
	return (
		<div className="billto">
			<div className="form">
				<Form onSubmit={this.handleSubmit}>
					<Item hasFeedback={true} label="Bill To">
						{getFieldDecorator(
							'billTo',
							billTo,
						)(<TextArea placeholder="Bill To" />)}
					</Item>
					<Item hasFeedback={true} label="Email">
						{getFieldDecorator(
							'email',
							email,
						)(<Input className={'input'} placeholder="Email" />)}
					</Item>
					<div className="actions">
						<Button type="primary" className="btn green-btn" htmlType="submit">
							Send
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}
export default view
