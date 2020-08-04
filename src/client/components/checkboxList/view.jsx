import React from 'react'
import './styles.scss'
import { Checkbox } from 'antd'

const CheckboxGroup = Checkbox.Group
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	return (
		<CheckboxGroup
			options={this.props.options}
			value={this.state.value}
			onChange={this.onChange.bind(this)}
		/>
	)
}
export default view
