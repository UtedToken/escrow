import React, { Component } from 'react'
import ComponentView from './view'

/**
 * @description Sample Container
 * @type Container
 * @author Inderdeep
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

	onChange(event) {
		const { onChange } = this.props
		const value = event.editor.getData()
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
