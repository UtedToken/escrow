import React from 'react'
import './styles.scss'
import { Form, Input, Button, Select, Row, Col } from 'antd'
import CodeEditor from '../../../components/CodeEditor'
const { TextArea } = Input
const { Item } = Form
const { Option } = Select
var view = function () {
	const { form, hideModal, data } = this.props
	const { data: templates } = this.state
	const {
		from,
		subject,
		template,
		key,
		pdfTemplate,
		templateVariables,
	} = this.validations
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
								<Item hasFeedback={true} label="From Email">
									{getFieldDecorator(
										'from',
										from,
									)(<Input className="input" placeholder="From Email" />)}
								</Item>
								<Item hasFeedback={true} label="Subject">
									{getFieldDecorator(
										'subject',
										subject,
									)(<Input className="input" placeholder="Enter Subject" />)}
								</Item>
							</div>
							<div className="inline">
								<Item hasFeedback={true} label="Template Variables">
									{getFieldDecorator(
										'templateVariables',
										templateVariables,
									)(<TextArea style={{ resize: 'none' }} rows={4} />)}
								</Item>
								<Item label="PDF Template">
									{getFieldDecorator(
										'pdfTemplate',
										pdfTemplate,
									)(
										<Select
											placeholder="Select PDF Template"
											className="select"
										>
											{(templates || []).map((template, index) => {
												const { key } = template
												return (
													<Option key={index} value={key}>
														{key}
													</Option>
												)
											})}
											<Option key="empty">Select PDF Template</Option>
										</Select>,
									)}
								</Item>
							</div>
							<div className="editor">
								<Item hasFeedback={true} label="Template">
									{getFieldDecorator('template', template)(<CodeEditor />)}
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
							<iframe className="iframe" srcDoc={templateValue} title="frame" />
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}
export default view
