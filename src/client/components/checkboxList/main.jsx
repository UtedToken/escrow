import React, { Component } from 'react'
import ComponentView from './view'

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
		this.state = {
			value: this.props.value || [],
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
		if (JSON.stringify(newProps.value) !== JSON.stringify(this.props.value)) {
			this.setState({
				value: newProps.value,
			})
		}
	}

	/**
	 * On Change of checked List
	 * @param checkedList
	 */
	onChange(checkedList) {
		this.setState({
			value: checkedList,
			indeterminate:
				!!checkedList.length && checkedList.length < this.props.options.length,
			checkAll: checkedList.length === this.props.options.length,
		})
		const { onChange } = this.props
		if (onChange && onChange instanceof Function) {
			onChange(checkedList)
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

Main.displayName = 'Checkbox-List'
