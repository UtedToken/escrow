import React from 'react'
import { ModalTrigger } from '../modal'
import Link from '../link'
//import './styles.scss';
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { text, title, limit } = this.props
	return (
		<div>
			<p>{(text || '').slice(0, limit || 25)}</p>
			{(text || '').length > (limit || 25) && (
				<ModalTrigger
					modalProps={{
						title: title || 'Message',
						footer: null,
					}}
					content={
						<div>
							<span>{text || ''}</span>
							<span>...</span>
						</div>
					}
				>
					<Link>Read More</Link>
				</ModalTrigger>
			)}
		</div>
	)
}
export default view
