import React from 'react'
import './styles.scss'
import { Form, Input, Avatar, Button } from 'antd'

const { TextArea } = Input

const FormItem = Form.Item
var view = function () {
	const { form, hideModal } = this.props
	const { title, body } = this.validations
	const { getFieldDecorator } = form
	return (
		<Form onSubmit={this.handleSubmit.bind(this)}>
			<div className="new-form">
				<div className="form">
					<FormItem hasFeedback={true} label={'Message Title'}>
						{getFieldDecorator(
							'title',
							title,
						)(
							<Input
								type={'text'}
								placeholder="Enter message title"
								className="input"
							/>,
						)}
					</FormItem>
					<FormItem hasFeedback={true} label={'Enter Message'}>
						{getFieldDecorator(
							'body',
							body,
						)(
							<TextArea
								placeholder="Enter message here"
								autosize={{ minRows: 5, maxRows: 10 }}
							/>,
						)}
					</FormItem>
				</div>
				<div className="actions">
					<Button htmlType={'submit'} type="primary">
						Send Notification
					</Button>
					<Button htmlType={'button'} onClick={hideModal}>
						Cancel
					</Button>
				</div>
			</div>
		</Form>
	)
}
export default view
