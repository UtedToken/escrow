import React from 'react'
import './styles.scss'
import { Input, DatePicker, Select, Button } from 'antd'
import _ from 'lodash'
import moment from 'moment'
const Search = Input.Search
const { Option } = Select

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { filters, searchOnSubmit } = this.props
	let { selectedFilter, value, isSubmitted } = this.state
	let filter = null
	let modifiedProps = {
		...this.props,
	}
	delete modifiedProps.filters
	delete modifiedProps.searchOnSubmit
	if (filters) {
		const filterObj = filters[selectedFilter]
		filterObj.props = filterObj.props || {}
		filterObj.props.value = value
		switch ((filterObj.type || 'input').toLowerCase()) {
			case 'input':
				if (!searchOnSubmit) {
					filterObj.props.onChange = _.debounce((e) => {
						this.onSearchChange(e.target.value)
					}, 500)
				} else {
					filterObj.props.onChange = (e) => {
						this.onSearchChange(e.target.value)
					}
				}
				filter = (
					<Input
						onPressEnter={this.onSubmit.bind(this)}
						className="input"
						placeholder={filterObj.title}
						{...filterObj.props}
					/>
				)
				break
			case 'date':
				filterObj.props.format = filterObj.props.format || 'MM/DD/YYYY'
				filterObj.props.value = filterObj.props.value || new Date()
				filterObj.props.value = moment(
					filterObj.props.value,
					filterObj.props.format,
				)
				filterObj.props.onChange = (value) => {
					if (value) {
						this.onSearchChange(value.format(filterObj.props.format))
					} else {
						this.onSearchChange(null)
					}
				}
				filter = (
					<DatePicker placeholder={filterObj.title} {...filterObj.props} />
				)

				break
			case 'select':
				filterObj.props.onChange = this.onSearchChange.bind(this)
				if (!filterObj.props.value) {
					delete filterObj.props.value
				}
				filter = (
					<Select
						className="select"
						placeholder={filterObj.title}
						{...filterObj.props}
					>
						{filterObj.options || null}
					</Select>
				)

				break
		}
	}
	{
		delete modifiedProps.onChange
	}
	return (
		<div className="search">
			{filters ? (
				<div className="filters">
					<Select
						value={selectedFilter}
						placeholder="Select Filter"
						className="select"
						onSelect={this.onFilterChange.bind(this)}
					>
						{filters.map((field, index) => {
							return (
								<Option key={field.key} value={index}>
									{field.title}
								</Option>
							)
						})}
					</Select>
					{filter}
				</div>
			) : (
				<Search
					placeholder="Search"
					style={{ width: 200 }}
					onSearch={(value) => {
						this.onSearchChange(value)
					}}
					{...modifiedProps}
				/>
			)}
			{searchOnSubmit && (
				<Button
					onClick={this.onSubmit.bind(this)}
					htmlType="button"
					className="btn green-btn-text search-btn"
				>
					Search
				</Button>
			)}
			{isSubmitted && (
				<Button
					className="btn red-btn-text clear-btn"
					onClick={this.clearSearch.bind(this)}
					htmlType="button"
				>
					Clear Search
				</Button>
			)}
		</div>
	)
}
export default view
