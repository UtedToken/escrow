import React from 'react'
import './styles.scss'
import { Layout, Button, Card } from 'antd'
import Localize from '../localize'

const { Content } = Layout
var view = function () {
	return (
		<div>
			<h1>Test</h1>
			<Content>
				<Card
					className="sample-container"
					title={<Localize langKey="sample.title" />}
				>
					<code style={{ color: 'black' }}>Sample Text</code>
					<p>
						<Button type="primary">Sample button</Button>
					</p>
				</Card>
			</Content>
		</div>
	)
}
export default view
