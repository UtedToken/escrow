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
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {
		const { onSuccess, additionalData } = this.props
		const { amount, CURRENCY } = additionalData || {}
		if (window.paypal) {
			window.paypal
				.Buttons({
					createOrder: (data, actions) => {
						return actions.order.create({
							purchase_units: [
								{
									amount: {
										value: amount.toFixed(2),
										currency_code: CURRENCY,
									},
								},
							],
						})
					},
					onApprove: onSuccess,
				})
				.render('#payment')
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
