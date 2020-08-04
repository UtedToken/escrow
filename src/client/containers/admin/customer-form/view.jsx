import React from 'react'
import './styles.scss'
import { Form, Input, Button } from 'antd'
const { Item } = Form
var view = function () {
	const { form, hideModal, disabled } = this.props
	const {
		customerName,
		address,
		homeNumber,
		key,
		officeNumber,
		email,
	} = this.validations
	const { getFieldDecorator } = form

	return (
		<div className="new-form form">
			<Form onSubmit={this.handleSubmit.bind(this)}>
				<div className="inline">
					<Item hasFeedback={true} label="Customer Name">
						{getFieldDecorator(
							'customerName',
							customerName,
						)(
							<Input
								disabled={disabled}
								className="input"
								placeholder="Enter Customer Name"
							/>,
						)}
					</Item>
					<Item hasFeedback={true} label="Address">
						{getFieldDecorator(
							'address',
							address,
						)(
							<Input
								disabled={disabled}
								className="input"
								placeholder="Enter Address"
							/>,
						)}
					</Item>
					<Item hasFeedback={true} label="Email">
						{getFieldDecorator(
							'email',
							email,
						)(
							<Input
								disabled={disabled}
								className="input"
								placeholder="Enter Email"
							/>,
						)}
					</Item>
				</div>
				<div className="inline">
					<Item hasFeedback={true} label="Home Phone Number">
						{getFieldDecorator(
							'homeNumber',
							homeNumber,
						)(
							<Input
								disabled={disabled}
								className="input"
								placeholder="Enter Home Number"
							/>,
						)}
					</Item>
					<Item hasFeedback={true} label="Mobile Number">
						{getFieldDecorator(
							'key',
							key,
						)(
							<Input
								disabled={disabled}
								className="input"
								placeholder="Enter Mobile Number"
							/>,
						)}
					</Item>
					<Item hasFeedback={true} label="Office Phone Number">
						{getFieldDecorator(
							'officeNumber',
							officeNumber,
						)(
							<Input
								disabled={disabled}
								className="input"
								placeholder="Enter Office Number"
							/>,
						)}
					</Item>
				</div>

				<div className="actions">
					<Button htmlType={'submit'} className="btn green-btn save">
						Save
					</Button>
					<Button
						htmlType={'button'}
						className="btn cancel"
						onClick={hideModal}
					>
						Cancel
					</Button>
				</div>
			</Form>
		</div>
	)
}
export default view
