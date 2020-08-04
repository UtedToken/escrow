import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from 'containers/preprocess'
import { ActionNames, createAction } from 'app-redux/actions'
import { message } from 'antd'
const spinningSelector = '.smart-table'
/**
 * @description Sample Container
 * @type Container
 */
class Main extends Component {
	/**
	 * Container
	 * @param props
	 */
	constructor(props) {
		super(props)
		this.pageSize = 10
		this.currentPagination = {}
		this.initialize = this.initialize.bind(this)
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {
		const { polling } = this.props
		this.initialize().catch(console.log)
	}

	/**
	 * componentWillUnmount Hook
	 */
	componentWillUnmount() {
		if (this.polling) {
			clearInterval(this.polling)
		}
	}

	async initialize() {
		const { initialize, getOtherEntities, polling } = this.props
		if (polling) {
			const { time } = polling
			this.polling = setInterval(async () => {
				try {
					await this.getTableData({})
				} catch (e) {
					console.log(e)
				}
			}, 1000 * time)
		}
		window.startSpinning(spinningSelector)
		try {
			;(initialize || []).forEach(async (request) => {
				const { entity, data } = request
				const { error, payload } = await getOtherEntities(entity, data)
				if (error) {
					throw payload.response
				}
			})
		} catch (e) {
			console.log(e)
		}
		window.stopSpinning(spinningSelector)
	}

	/**
	 * Get Table Data
	 * @returns {Promise<void>}
	 */
	async getTableData(config) {
		const { pagination } = this.props
		let {
			entity,
			getEntities,
			getUrl,
			translate,
			defaultSort,
			getRequestParams,
		} = this.props
		try {
			let requestConfig = {}
			/**
			 * Merge Request params
			 */
			if (getRequestParams instanceof Function) {
				requestConfig = {
					...getRequestParams(this.props),
				}
			}
			/**
			 * Merge Request URL
			 */
			if (getUrl instanceof Function) {
				getUrl = getUrl(this.props)
				requestConfig.url = getUrl
			}
			if (defaultSort) {
				requestConfig.sort = defaultSort.sort
				requestConfig.sortType = defaultSort.sortType
			}
			if (pagination && pagination.type === 'server') {
				let { page, pageSize, search } = config || {}
				this.currentPagination.page = typeof page === 'undefined' ? 1 : page
				this.currentPagination.pageSize =
					typeof pageSize === 'undefined' ? 10 : pageSize
				this.currentPagination.search = search
				requestConfig = {
					...requestConfig,
					from:
						(this.currentPagination.page - 1) * this.currentPagination.pageSize,
					size: this.currentPagination.pageSize,
				}
				if (search && search.text !== '') {
					requestConfig.search = search.text

					if (search.field) {
						requestConfig.searchField = search.field.key
					}
				}
			} else {
				requestConfig = {
					sort: defaultSort,
					...requestConfig,
				}
			}
			await getEntities(entity, requestConfig)
		} catch (e) {
			console.error(e)
			message.error(translate('common.data.json.get.error'))
		}
	}

	/**
	 * Remove the entity
	 * @param entityId
	 * @returns {Promise<void>}
	 */
	async deleteRecord(entityId) {
		let { deleteEntity, translate, entity } = this.props
		try {
			await deleteEntity(entity, entityId)
		} catch (e) {
			console.error(e)
			message.error(translate('common.data.json.delete.error'))
		}
	}

	/**
	 * Sort
	 */
	getSorter() {
		const { defaultSort } = this.props
		if (defaultSort) {
			const { sort, sortType } = defaultSort
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

/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = (state, ownProps) => {
	let reducerEntityName = ownProps.reducer && ownProps.reducer.entity
	reducerEntityName = reducerEntityName || ownProps.entity
	const data = state[reducerEntityName].data || []
	let output = {
		data,
		from: state[reducerEntityName].from || null,
		total: state[reducerEntityName].total || data.length,
	}
	ownProps.reducer &&
		(ownProps.reducer.stateKeys || []).map((key) => {
			output[key] = state[key]
		})
	return output
}
/**
 * Bind Redux Actions
 * @param dispatch
 * @returns {{Object}}
 */
const bindAction = (dispatch, ownProps) => {
	let reducerEntityName = ownProps.reducer && ownProps.reducer.entity
	reducerEntityName = reducerEntityName || ownProps.entity
	return {
		getEntities: (entity, data) => {
			const action = createAction(ActionNames.GET_ENTITIES, {
				entityName: entity,
				...data,
			})
			action.type = action.type + '_' + reducerEntityName
			return dispatch(action)
		},
		getOtherEntities: (entity, data) => {
			const action = createAction(ActionNames.GET_ENTITIES, {
				entityName: entity,
				...data,
			})
			action.type = action.type + '_' + entity
			return dispatch(action)
		},
		deleteEntity: (entity, entityId) => {
			const action = createAction(ActionNames.DELETE_ENTITY, {
				entityName: entity,
				entityId,
			})
			action.type = action.type + '_' + reducerEntityName
			return dispatch(action)
		},
	}
}
Main.displayName = 'Crud-Container'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
