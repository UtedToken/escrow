import React, { Component } from 'react'
import ComponentView from './view'

/**
 * @description Modal Trigger Component
 * @type Component
 */
export default class Main extends Component {
	/**
	 * Container
	 * @param props
	 */
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	/**
	 * On trigger press
	 */
	onClick(onClick) {
		this.setState(
			{
				visible: true,
			},
			() => {
				if (onClick instanceof Function) {
					onClick()
				}
			},
		)
	}

	/**
	 * Hide Modal
	 */
	hideModal() {
		const { onHide } = this.props
		this.setState({
			visible: false,
		})
		if (onHide && onHide instanceof Function) {
			onHide()
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

Main.displayName = 'ModalTrigger'
