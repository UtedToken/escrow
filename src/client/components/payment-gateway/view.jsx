import React from 'react'
import Paypal from './gateways/paypal'
import Stripe from './gateways/stripe'
//import './styles.scss';
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { name } = this.props
	const { sdkLoaded } = this.state
	let Component = null
	if (sdkLoaded) {
		switch (name.toLowerCase()) {
			case 'paypal': {
				Component = Paypal
				break
			}
			case 'stripe': {
				Component = Stripe
			}
		}
	}
	return (
		<div className="method">
			{sdkLoaded ? (
				<div>{Component && <Component {...this.props} />}</div>
			) : (
				<div>
					<p>Loading...</p>
				</div>
			)}
		</div>
	)
}
export default view
