import React from 'react'
import { Button } from 'antd'
import { StripeProvider, Elements } from 'react-stripe-elements'
import PaymentGateway from '../payment-gateway'
import { loadScript, getScript } from '../../utils/script'
//import './styles.scss';
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { gateway } = this.props
	return (
		<div className="payment-gateways">
			{(gateway || []).map((gateway, index) => {
				const { key, apiKey, logo, apiSecret, additionalData } = gateway
				const { CURRENCY } = additionalData || {}
				return (
					<PaymentGateway
						key={index}
						initialize={() => loadScript(getScript(key, apiKey, CURRENCY))}
						name={key}
						logo={logo}
						apiKey={apiKey}
						apiSecret={apiSecret}
						onSuccess={(data) => {
							this.onSuccess(key, data)
						}}
						onFail={(data) => {
							this.onFail(key, data)
						}}
						additionalData={additionalData}
					/>
				)
			})}
		</div>
	)
}
export default view
