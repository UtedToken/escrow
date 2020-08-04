import React from 'react'
//import './styles.scss';
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	return (
		<div className="gateway">
			<p className="label">Pay with Paypal</p>
			<div id="payment" />
		</div>
	)
}
export default view
