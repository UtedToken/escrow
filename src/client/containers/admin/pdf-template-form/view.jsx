import React from 'react'
import './styles.scss'
import { Form, Input, Button, Row, Col } from 'antd'
import Editor from 'core-components/CodeEditor'

const { Item } = Form
const { TextArea } = Input

var view = function () {
	const { form, hideModal, data } = this.props
	const { name, template, key, templateVariables } = this.validations
	const { getFieldDecorator, getFieldValue } = form
	const templateValue = getFieldValue('template') || (data && data.template)
	return (
		<div className="new-form form pdf-template-form">
			<Row>
				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<div className="build">
						<Form onSubmit={this.handleSubmit.bind(this)}>
							<div className="inline">
								<Item hasFeedback={true} label="Code">
									{getFieldDecorator(
										'key',
										key,
									)(
										<Input
											disabled={!!data}
											className="input"
											placeholder="Enter Code"
										/>,
									)}
								</Item>
								<Item hasFeedback={true} label="File Name">
									{getFieldDecorator(
										'name',
										name,
									)(<Input className="input" placeholder="From Email" />)}
								</Item>
							</div>
							<div className="variables">
								<Item hasFeedback={true} label="Template Variables">
									{getFieldDecorator(
										'templateVariables',
										templateVariables,
									)(<TextArea rows={4} style={{ resize: 'none' }} />)}
								</Item>
							</div>
							<div className="editor">
								<Item hasFeedback={true} label="Template">
									{getFieldDecorator('template', template)(<Editor />)}
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
				</Col>
				<Col xs={0} sm={0} md={12} lg={12} xl={12}>
					<div className="preview">
						<p className="title">Preview</p>
						<div className="content">
							<iframe className="iframe" srcDoc={templateValue} title="iframe"/>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}
export default view
