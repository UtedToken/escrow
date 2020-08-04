import React from 'react'
import './styles.scss'
import { Form, Input, Avatar, Button, Checkbox, Select } from 'antd'
import FilePicker from '../../../components/file-picker'

const CheckboxGroup = Checkbox.Group
const FormItem = Form.Item
const options = [
	{ label: 'Give admin rights to this user', value: 'set-admin' },
]

var view = function () {
	const { translate, form, hideModal, data, roles, prefixes } = this.props
	const { name, email, password, role, photoURL } = this.validations
	const { getFieldDecorator, getFieldValue } = form
	const roleValue = getFieldValue('role') || (data && data.role)
	const getFilePickerChildren = ({ getUri }) => {
		const uri = getUri()
		return <Avatar icon="user" src={uri.length > 0 ? uri[0] : null} />
	}

	return (
		<Form onSubmit={this.handleSubmit.bind(this)}>
			<div className="new-form user">
				<div className="form">
					<FormItem hasFeedback={true} label={'Name'}>
						{getFieldDecorator(
							'name',
							name,
						)(
							<Input
								type={'text'}
								placeholder={translate('common.firstName.placeholder')}
								className="input"
							/>,
						)}
					</FormItem>
					<FormItem hasFeedback={true} label={'Email Address'}>
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
					<FormItem hasFeedback={true} label={'Password'}>
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
			</div>
		</Form>
	)
}
export default view
