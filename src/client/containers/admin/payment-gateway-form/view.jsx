import React from 'react'
import './styles.scss'
import { Form, Input, Button } from 'antd'

const { Item } = Form
const { TextArea } = Input
var view = function () {
	const { form, hideModal, data } = this.props
	const { key, apiKey, apiSecret, additionalData } = this.validations
	const { getFieldDecorator } = form
	return (
		<Form onSubmit={this.handleSubmit.bind(this)}>
			<div className="new-form">
				<div className="form">
					<Item hasFeedback={true} label="Gateway ID">
						{getFieldDecorator(
							'key',
							key,
						)(
							<Input
								disabled={!!data}
								className="input"
								placeholder="Enter Gateway ID"
							/>,
						)}
					</Item>
					<Item label="API Key">
						{getFieldDecorator(
							'apiKey',
							apiKey,
						)(<Input className="input" placeholder="Enter API Key" />)}
					</Item>
					<Item label="API Secret">
						{getFieldDecorator(
							'apiSecret',
							apiSecret,
						)(<Input className="input" placeholder="Enter API Secret" />)}
					</Item>
					<Item label="Additional Data">
						{getFieldDecorator(
							'additionalData',
							additionalData,
						)(<TextArea placeholder="Additional Data" />)}
					</Item>
				</div>
				<div className="actions">
					<Button htmlType={'submit'} type="primary" className="btn green-btn">
						Save
					</Button>
					<Button
						htmlType={'button'}
						onClick={hideModal}
						className="btn red-btn-text"
					>
						Cancel
					</Button>
				</div>
			</div>
		</Form>
	)
}
export default view
