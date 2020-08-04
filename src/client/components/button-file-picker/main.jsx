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
			value: this.props.value,
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	/**
	 * Component Will Receive props hook
	 * @param newProps
	 */
	componentWillReceiveProps(newProps) {
		//check if value has been changed, then only update in state
		if (JSON.stringify(newProps.c) !== JSON.stringify(this.props.value)) {
			this.setState({
				value: newProps.value,
			})
		}
	}

	/**
	 * On Change of checked List
	 * @param checkedList
	 */
	onChange(value) {
		this.setState({
			value,
		})
		const { onChange } = this.props
		if (onChange && onChange instanceof Function) {
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

Main.displayName = 'Sample-Component'
