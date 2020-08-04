import React, { Component } from 'react'
import ComponentView from './view'
import { connect } from 'react-redux'
import { message } from 'antd'
import { createAction, ActionNames } from 'app-redux/actions'
const spinningSelector = 'body'
/**
 * @description Sample Component
 * @type Component
 */
class Main extends Component {
	/**
	 * Container
	 * @param props
	 */
	constructor(props) {
		super(props)
		this.print = this.print.bind(this)
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	async print() {
		const { getMarkUp } = this.props
		window.startSpinning(spinningSelector)
		try {
			const { error, payload } = await getMarkUp()
			if (error) {
				throw payload.response
			}
			const { name, html } = payload.data
			const mywindow = window.open('', '_blank', 'height=400,width=600')
			mywindow.document.write(html)
			mywindow.document.title = name
			mywindow.document.close() // necessary for IE >= 10
			mywindow.onload = mywindow.print
			// setTimeout(() => {
			//     mywindow.print();
			// })
		} catch (e) {
			console.log(e)
			message.error('Error while fetching PDF Template')
		}
		window.stopSpinning(spinningSelector)
		return true
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
const mapStateToProps = ({ config }) => {
	const { configuration } = config || {}
	const { CURRENCY, INVOICELOGO } = configuration || {}
	return {
		currency: CURRENCY,
		invoiceLogo: INVOICELOGO,
	}
}
Main.displayName = 'Sample-Component'
export default connect(
	mapStateToProps,
	null,
	(stateProps, dispatchProps, ownProps) => {
		return {
			...stateProps,
			...dispatchProps,
			...ownProps,
			getMarkUp: () => {
				const { data, template } = ownProps
				const { currency, invoiceLogo } = stateProps
				const { dispatch } = dispatchProps
				return dispatch(
					createAction(ActionNames.CREATE_ENTITY, {
						entityName: 'pdf-template',
						entityId: 'getMarkup',
						id: template,
						data: {
							...data,
							invoiceLogo,
							currency: currency,
						},
					}),
				)
			},
		}
	},
)(Main)
