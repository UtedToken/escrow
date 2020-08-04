import React from 'react'
import SignaturePad from 'react-signature-pad'
import { Button } from 'antd'
import './styles.scss'
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { disabled, value } = this.props
	return (
		<div className="signature-pad">
			{disabled ? (
				<div>
					<img src={value} />
				</div>
			) : (
				<div>
					<SignaturePad {...this.props} ref="signature" onEnd={this.onEnd} />
					<Button onClick={this.clear}>Clear</Button>
				</div>
			)}
		</div>
	)
}
export default view
