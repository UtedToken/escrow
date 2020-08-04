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
			visible: props.visible && true,
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {
		const { onShow } = this.props
		if (onShow && onShow instanceof Function) {
			onShow()
		}
	}

	/**
	 * componentWillReceiveProps Hook
	 * @param newProps
	 */
	componentWillReceiveProps(newProps) {
		if (this.state.visible !== newProps.visible) {
			this.setState(
				{
					visible: newProps.visible,
				},
				() => {
					if (newProps.visible) {
						const { onShow } = newProps
						if (onShow && onShow instanceof Function) {
							onShow()
						}
					}
				},
			)
		}
	}

	/**
	 * Hide Modal
	 */
	hideModal() {
		this.setState(
			{
				visible: false,
			},
			() => {
				const { onHide } = this.props
				if (onHide && onHide instanceof Function) {
					onHide()
				}
			},
		)
	}

	/**
	 * Render Method
	 * @returns {*}
	 */
	render() {
		return ComponentView.bind(this)()
	}
}

Main.displayName = 'Modal'
