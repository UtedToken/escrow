import React, { Component } from 'react'
import ComponentView from './view'
import Fuse from 'fuse.js'

/**
 * @description Smart Table
 * @type Component
 */
export default class Main extends Component {
	/**
	 * Container
	 * @param props
	 */
	constructor(props) {
		super(props)
		const dataSource = this.getDataSource(props)
		this.state = {
			dataSource,
			loading: false,
			selection: null,
		}
		this.searchText = ''
		this.onSearchChange = this.onSearchChange.bind(this) // _.debounce(this.onSearchChange.bind(this), 500);
		this.getData = this.getData.bind(this)
		this.setUpFuzzySearch(dataSource, this.getColumns(props))
	}

	/**
	 * ComponentDidMount Hook
	 */
	async componentDidMount() {
		try {
			await this.getData()
		} catch (e) {
			console.error('Error while calling getData', e)
		}
	}

	/**
	 * Component Will Receive Props
	 */
	componentWillReceiveProps(newProps) {
		const dataSource = this.getDataSource(newProps)
		this.setUpFuzzySearch(dataSource, this.getColumns(newProps))
		this.setState({
			dataSource,
		})
	}

	/**
	 * Get Data
	 */
	async getData(obj) {
		obj = obj || {}
		const { page } = obj
		const { getData } = this.props
		if (getData instanceof Function) {
			this.setState({
				loading: true,
			})
			/**
			 * If more pagination Types are to be supported put here
			 */
			if (this.getPaginationType() === 'client') {
				await getData()
			} else {
				/**
				 * Fetch the current request page
				 * @type {*}
				 */
				const paginationConfig = this.getPaginationConfig()
				await getData({
					...paginationConfig,
					page: page || 1,
					search: {
						text: this.searchText,
						field: this.searchField,
					},
				})
			}
			this.setState({
				loading: false,
			})
		}
	}

	/**
	 * To Fetch Next or Previous Page
	 * Pass previous as true if fetching next page
	 * @param previous
	 */
	onPageChange({ pageSize, current }) {
		//For Server Side Pagination Pass Pagination Config
		this.getData({
			page: current,
			pageSize,
		})
	}

	/**
	 * On Search Change
	 * @param value
	 */
	onSearchChange(value, fieldData) {
		if (value === undefined || value === null) {
			value = ''
		}
		if (typeof value === 'string') {
			value = value.trim()
		}
		if (this.getPaginationType() === 'client') {
			if (value === '') {
				/**
				 * If Previous search was also empty, Don't make another hit
				 */
				if (this.searchText !== value) {
					this.setState({
						dataSource: this.getDataSource(this.props),
					})
				}
				return
			}

			this.searchText = value
			this.searchField = fieldData
			const results = this.fuse.search(value)
			this.setState({
				dataSource: results,
			})
		} else {
			this.searchText = value
			this.searchField = fieldData
			this.getData({
				search: value,
			})
		}
	}

	/**
	 * Get Data Source
	 * @param props
	 * @returns {Array}
	 */
	getDataSource(props) {
		let { listConfig } = props
		listConfig = listConfig || {}
		return [].concat(listConfig.dataSource || [])
	}

	/**
	 * Get Columns
	 * @param props
	 * @returns {Array}
	 */
	getColumns(props) {
		let { listConfig } = props
		listConfig = listConfig || {}
		return (listConfig.columns || []).map((col) => {
			return col.dataIndex
		})
	}

	/**
	 * Get Current Page
	 * @returns Number
	 */
	getCurrentPage() {
		let { listConfig } = this.props
		listConfig = listConfig || {}
		return listConfig.current || 1
	}

	/**
	 * Get Pagination Config
	 * @returns Object
	 */
	getPaginationConfig() {
		let { current, pageSize } = this.getListConfig()
		const currentPage = current || 1
		pageSize = pageSize || 10
		return {
			page: currentPage,
			pageSize,
		}
	}

	/**
	 * Get Pagination Type
	 * @returns String
	 */
	getPaginationType() {
		let { paginationType } = this.props
		paginationType = (paginationType || '').toLowerCase()
		if (paginationType !== 'client' && paginationType !== 'server') {
			console.warn(
				'Pagination Type not specified for Smart Table. Taking default as client',
			)
			paginationType = 'client'
		}
		return paginationType
	}

	/**
	 * Setup the Fuzzy Search
	 * @param dataSource
	 * @param columns
	 */
	setUpFuzzySearch(dataSource, columns) {
		const options = {
			keys: (columns || []).filter((column) => {
				return typeof column === 'string'
			}),
			// tokenize: true,
			// findAllMatches: true,
			// threshold: NaN,
			// location: NaN,
			// distance: NaN,
			// maxPatternLength: NaN,
			// minMatchCharLength: NaN,
			// matchAllTokens: true,
		}
		this.fuse = new Fuse(dataSource, options)
	}

	/**
	 * Get On Delete of record
	 * @param record
	 */
	getOnDelete() {
		const { onDelete } = this.getListConfig()
		return async (record) => {
			if (onDelete instanceof Function) {
				this.setState({
					loading: true,
				})
				await onDelete(record)
				await this.getData()
			}
			return true
		}
	}

	/**
	 * Get On Batch Delete of record
	 * @param record
	 */
	getOnDeleteSelected() {
		const { onDeleteSelected } = this.getHeaderConfig()
		return async (record) => {
			if (onDeleteSelected instanceof Function) {
				this.setState({
					loading: true,
				})

				await onDeleteSelected(record)
				await this.getData()
				this.setState({
					selection: null,
				})
			}
			this.tableViewRef.clearSelection()
			return true
		}
	}

	/**
	 * On Row Selection Change
	 */
	onRowSelectionChange(keys, rows) {
		const { onRowSelectionChange } = this.getListConfig()
		if (keys.length > 0) {
			this.setState({
				selection: {
					keys,
					rows,
				},
			})
		} else {
			this.setState({
				selection: null,
			})
		}
		if (onRowSelectionChange instanceof Function) {
			onRowSelectionChange(keys, rows)
		}
	}

	/**
	 * Get Exposed Config to be passed outside component
	 * @returns {{getData: (function(this:Main))}}
	 */
	getExposedConfig() {
		return {
			getData: this.getData.bind(this),
		}
	}

	/**
	 * Get List Config
	 * @returns {Main.props.listConfig}
	 */
	getListConfig() {
		let { listConfig } = this.props
		listConfig = listConfig || {}
		return listConfig
	}

	/**
	 * Get publicHeader config
	 * @returns {Main.props.listConfig}
	 */
	getHeaderConfig() {
		let { headerConfig } = this.props
		headerConfig = headerConfig || {}
		return headerConfig
	}

	/**
	 * Render Method
	 * @returns {*}
	 */
	render() {
		return ComponentView.bind(this)()
	}
}

Main.displayName = 'Smart-Table'
