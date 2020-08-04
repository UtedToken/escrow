import React from 'react'
import Modal from '../modal-component'
import './styles.scss'

/**
 * View
 * @returns {XML}
 */
var view = function () {
	const { children, content, modalId } = this.props
	const { visible } = this.state

	/**
	 * Modal Props are the actual Modal Properties supported by modal component
	 */
	let { style, modalProps } = this.props
	style = style || {}
	modalProps = modalProps || {}
	/**
	 * This modal implementation will work for a single child based mode
	 * and the child should contactUs the onClick event
	 */
	let modifiedChildren = React.cloneElement(children, {
		onClick: (event) => {
			this.onClick(children.props.onClick)
		},
	})
	let modifiedContent = content
	if (content) {
		modifiedContent = React.cloneElement(content, {
			hideModal: this.hideModal.bind(this),
		})
	}
	return (
		<span>
			{modifiedChildren}
			<Modal
				hideModal={this.hideModal.bind(this)}
				visible={visible}
				modalId={modalId}
				{...modalProps}
				onCancel={this.hideModal.bind(this)}
			>
				{modifiedContent}
			</Modal>
		</span>
	)
}
export default view
