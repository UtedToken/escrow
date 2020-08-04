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
			selectedFilter: 0,
			value: '',
			isSubmitted: false,
		}
		this.searchValue = null
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {
		const { selectedFilter, value, isSubmitted, onChange, filters } = this.props
		if (selectedFilter && value && isSubmitted) {
			this.setState({
				selectedFilter,
				value,
				isSubmitted,
			})
			if (onChange instanceof Function) {
				onChange(value, filters && filters[selectedFilter])
			}
		}
	}

	/**
	 * On Filter Select change
	 * @param {*} selectedFilter
	 */
	onFilterChange(selectedFilter) {
		this.setState({
			selectedFilter,
		})
	}

	/**
	 * on Specific Search change
	 * @param  value
	 */
	onSearchChange(value) {
		const { onChange, filters, searchOnSubmit } = this.props
		if (searchOnSubmit) {
			this.setState({
				value,
			})
		} else {
			if (onChange instanceof Function) {
				onChange(
					value,
					filters ? filters[this.state.selectedFilter] : undefined,
				)
			}
		}
	}

	onSubmit() {
		const { value } = this.state
		if (value) {
			this.setState({
				isSubmitted: true,
			})
		}
		const { onChange, filters } = this.props
		if (onChange instanceof Function) {
			onChange(value, filters ? filters[this.state.selectedFilter] : undefined)
		}
	}

	/**
	 * clear Search
	 */
	clearSearch() {
		const { onChange, filters } = this.props
		this.setState({
			isSubmitted: false,
			selectedFilter: 0,
			value: '',
		})
		onChange('', filters && filters[0])
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
