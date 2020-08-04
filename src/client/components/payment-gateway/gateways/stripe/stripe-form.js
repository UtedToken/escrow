import { injectStripe, CardElement } from 'react-stripe-elements'
import React, { Component } from 'react'
import { Form, Button, message } from 'antd'
import stripe from '../../../../images/stripe.png'

class StripeForm extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	async handleSubmit(event) {
		const { stripe, onSuccess, additionalData } = this.props
		const { amount, CURRENCY } = additionalData || {}
		event.preventDefault()
		try {
			const { token, error } = await stripe.createToken({
				type: 'card',
				name: 'Piyush Sharma',
			})
			if (error) {
				message.error(error.message)
				return
			}
			if (onSuccess instanceof Function) {
				onSuccess({
					...token,
					amount,
					currency: CURRENCY.toLowerCase(),
				})
			}
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		return (
			<div className="gateway">
				<p className="label">Pay with Stripe</p>
				<Form onSubmit={this.handleSubmit}>
					<CardElement />
					<Button htmlType="submit" className="stripe">
						Pay With <img src={stripe} alt={'Stripe'} />
					</Button>
				</Form>
			</div>
		)
	}
}

export default injectStripe(StripeForm)
