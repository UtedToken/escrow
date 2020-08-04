import React from 'react'
import { Modal } from 'antd'
import './styles.scss'
import ModalUtils from '../modal-utils'

/**
 * View
 * @returns {XML}
 */
var view = function () {
	const { children, modalId, contentProps } = this.props
	const { visible } = this.state

	let content
	if (modalId) {
		/**
		 * contentProps -> When modal Id is passed
		 * @type {*}
		 */
		let ModalScene = ModalUtils.getModalScene(modalId)
		content = ModalScene ? (
			<ModalScene
				{...contentProps}
				hideModal={this.props.hideModal || this.hideModal.bind(this)}
			/>
		) : null
	} else {
		content = children
	}

	const props = {
		visible,
		mask: true,
		closable: true,
		maskClosable: false,
		destroyOnClose: true,
		afterClose: () => {},
		onCancel: this.hideModal.bind(this),
		...this.props,
	}
	//delete props.children;
	delete props.modalId

	return <Modal {...props}>{content}</Modal>
}
export default view
