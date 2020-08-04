import React, { Component } from 'react'
import ComponentView from './view'

/**
 * @description Sample Component
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
			value: '',
		}
		this.clear = this.clear.bind(this)
		this.onEnd = this.onEnd.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {
		const { value } = this.props
		if (this.refs.signature) {
			if (value) {
				this.refs.signature.fromDataURL(value)
				this.onChange(value)
			}
		}
	}

	onEnd() {
		const value = this.refs.signature.toDataURL()
		this.onChange(value)
	}

	clear() {
		if (this.refs.signature) {
			this.refs.signature.clear()
			this.onChange('')
		}
	}

	onChange(value) {
		const { onChange } = this.props
		if (onChange instanceof Function) {
			onChange(value)
		}
		this.setState({
			value,
		})
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
