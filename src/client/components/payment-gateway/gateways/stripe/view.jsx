import React from 'react'
import StripeForm from './stripe-form'
import { StripeProvider, Elements } from 'react-stripe-elements'
//import './styles.scss';
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { onSuccess, apiKey, additionalData } = this.props
	return (
		<StripeProvider apiKey={apiKey}>
			<Elements>
				<StripeForm onSuccess={onSuccess} additionalData={additionalData} />
			</Elements>
		</StripeProvider>
	)
}
export default view
