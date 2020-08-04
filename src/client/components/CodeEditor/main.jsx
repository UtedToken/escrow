import React, { Component } from 'react'
import ComponentView from './view'

/**
 * @description Sample Container
 * @type Container
 */
export default class Main extends Component {
	/**
	 * Container
	 * @param props
	 */
	constructor(props) {
		super(props)
		this.state = {
			value: props.value || '',
		}
		this.onChange = this.onChange.bind(this)
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	onChange(value) {
		const { onChange } = this.props
		this.setState({ value })
		if (onChange instanceof Function) {
			onChange(value)
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
