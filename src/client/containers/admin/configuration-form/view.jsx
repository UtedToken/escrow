import React from 'react'
import './styles.scss'
import { Form, Input, Button, Select, Icon, Tooltip } from 'antd'
import FilePicker from '../../../components/file-picker'
import CKEditor from '../../../components/CKEditorComponent'
import Link from 'core-components/link'

const { Item } = Form
const { Option } = Select
const { TextArea } = Input
const types = ['file', 'text', 'html']
const imageExtensions = ['png', 'jpg', 'jpeg']
var view = function () {
	const { form, hideModal, data } = this.props
	const { key, type, value, description, file } = this.validations
	const { getFieldDecorator, getFieldValue } = form
	const typeValue = getFieldValue('type') || (data && data.type) || 'text'
	return (
		<Form onSubmit={this.handleSubmit.bind(this)}>
			<div className="new-form configuration-form">
				<div className="form">
					<Item hasFeedback={true} label="Key">
						{getFieldDecorator(
							'key',
							key,
						)(
							<Input
								disabled={!!data}
								className="input"
								placeholder="Enter Key"
							/>,
						)}
					</Item>
					<Item hasFeedback={true} label="Type">
						{getFieldDecorator(
							'type',
							type,
						)(
							<Select
								className="select"
								disabled={!!data}
								placeholder="Select Type"
							>
								{types.map((type, index) => {
									return (
										<Option key={index} value={type}>
											{type}
										</Option>
									)
								})}
							</Select>,
						)}
					</Item>
					{typeValue === 'text' && (
						<Item hasFeedback={true} label="Value">
							{getFieldDecorator(
								'value',
								value,
							)(<TextArea placeholder="Enter Value" className="input" />)}
						</Item>
					)}
					{typeValue === 'html' && (
						<Item hasFeedback={true} label="Value">
							{getFieldDecorator('value', value)(<CKEditor />)}
						</Item>
					)}
					{typeValue === 'file' && (
						<Item hasFeedback={true} label="Media">
							{getFieldDecorator(
								'file',
								file,
							)(
								<FilePicker
									uploadProps={{
										accept: '*/*',
										multiple: false,
									}}
									getChildren={({ getFileList }) => {
										const files = getFileList()
										const [file] = files
										let { dataUri, name, type } = file || {}
										if (dataUri) {
											setTimeout(() => {
												document
													.querySelector('.ant-upload')
													.parentNode.append(
														document.querySelector('.file-list'),
													)
											})
											if (
												imageExtensions.find((extension) =>
													dataUri.endsWith(extension),
												)
											) {
												type = 'image'
											}
										}
										return (
											<div>
												<div className="upload-container">
													<Icon type="plus" />
												</div>
												{dataUri ? (
													<div className="file-list">
														<div className="file">
															<div className="data">
																<div className="image">
																	<img
																		style={{
																			width: '100%',
																		}}
																		src={dataUri}
																		alt="list"
																		rel="noreferrer"
																	/>
																</div>
																<p className="name">{name}</p>
															</div>
															<Link className="remove">
																<Icon type="close" />
															</Link>
															{dataUri && (
																<a
																	className="download"
																	href={dataUri}
																	target="_blank"
																	rel="noreferrer"
																>
																	<Tooltip title="Download File">
																		<Icon type="download" />
																	</Tooltip>
																</a>
															)}
														</div>
													</div>
												) : null}
											</div>
										)
									}}
								></FilePicker>,
							)}
						</Item>
					)}
					<Item hasFeedback={true} label="Description">
						{getFieldDecorator(
							'description',
							description,
						)(<TextArea placeholder="Enter Description" className="input" />)}
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
