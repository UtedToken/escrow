import { Component } from 'react'
import ComponentView from './view'
import { blobToDataURL } from '../../utils/file'

/**
 * @description File Picker Component
 * @type Component
 * @author Inderdeep
 */
export default class Main extends Component {
	/**
	 * Container
	 * @param props
	 */
	constructor(props) {
		super(props)
		let fileList = []
		if (props.value) {
			if (Array.isArray(props.value)) {
				props.value.forEach((value) => {
					fileList.push(value)
				})
			} else {
				fileList.push({
					dataUri: props.value,
				})
			}
		}
		this.state = {
			fileList,
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	componentWillReceiveProps(nextProps) {
		if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value)) {
			this.setState({
				fileList: nextProps.value ? [].concat(nextProps.value) : [],
			})
		}
	}

	/**
	 * Get Upload Props
	 * @returns {{onRemove: (function()), beforeUpload, accept: string, multiple: boolean, showUploadList: boolean}}
	 */
	getUploadProps() {
		const { uploadProps } = this.props
		return {
			onRemove: () => {},
			beforeUpload: this.beforeUpload.bind(this),
			accept: 'image/*',
			multiple: false,
			showUploadList: false,
			style: {
				cursor: 'pointer',
			},
			...uploadProps,
		}
	}

	/**
	 * Before Upload of file
	 * @param file
	 * @returns {boolean}
	 */
	beforeUpload(file) {
		const { upload, onChange } = this.props
		const multiple = this.getUploadProps().multiple
		setTimeout(() => {
			blobToDataURL(file, (dataUri) => {
				file.dataUri = dataUri
				let fileList
				if (multiple) {
					fileList = [...this.state.fileList, file]
				} else {
					fileList = [file]
				}

				this.setState(
					{
						fileList,
					},
					() => {
						if (upload && upload instanceof Function) {
							upload(file, fileList)
						}
						/**
						 * For Antd Design
						 */
						if (onChange && onChange instanceof Function) {
							if (multiple) {
								onChange(fileList, this.getUri())
							} else {
								onChange(file, this.getUri()[0])
							}
						}
					},
				)
			})
		})
		return false
	}

	/**
	 * Clear Files
	 */
	clearFiles() {
		this.setState({
			fileList: [],
		})
	}

	/**
	 * Clear File
	 * @param index
	 */
	clearFile(index) {
		const { onChange } = this.props
		const { multiple } = this.getUploadProps()
		const fileList = [].concat(this.state.fileList)
		fileList.splice(index, 1)
		this.setState(
			{
				fileList,
			},
			() => {
				/**
				 * For Antd Design
				 */
				if (onChange && onChange instanceof Function) {
					if (multiple) {
						onChange(fileList, this.getUri())
					} else {
						onChange(fileList[0], this.getUri()[0])
					}
				}
			},
		)
	}

	/**
	 * Get Uri
	 */
	getUri() {
		const { fileList } = this.state

		return fileList.map((file) => {
			return file.dataUri
		})
	}
	/**
	 * Get Uri
	 */
	getFileList() {
		const { fileList } = this.state

		return fileList
	}

	/**
	 * Configuration to be exposed to outside
	 * @returns {{getUri: (function(this:Main)), clearFiles: (function(this:Main))}}
	 */
	getExposedConfig() {
		return {
			getUri: this.getUri.bind(this),
			clearFiles: this.clearFiles.bind(this),
			clearFile: this.clearFile.bind(this),
			openDialog: this.openDialog.bind(this),
			getFileList: this.getFileList.bind(this),
		}
	}

	/**
	 * Open Upload Dialog
	 */
	openDialog() {
		if (this.uploadRef) {
			const uploadElement = this.uploadRef.querySelector("input[type='file']")
			uploadElement.click()
		}
	}

	/**
	 * Render Method
	 * @returns {*}
	 */
	render() {
		return ComponentView.bind(this)()
	}
}

Main.displayName = 'File-Picker'
