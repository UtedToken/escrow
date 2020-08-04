import React, { Component } from 'react'
import ComponentView from './view'
import { message } from 'antd'
/**
 * @description Sample Component
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
		this.onSuccess = this.onSuccess.bind(this)
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	onSuccess(key, data) {
		const { onSuccess } = this.props
		if (onSuccess instanceof Function) {
			onSuccess(key, data)
		}
	}

	onFail(key, data) {
		message.error('Payment failed for ' + key + ' due to ' + data)
	}

	/**
	 * Render Method
	 * @returns {*}
	 */
	render() {
		return ComponentView.bind(this)()
	}
}

Main.displayName = 'Sample-Component'
