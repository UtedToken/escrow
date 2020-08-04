import React from 'react'
import './styles.scss'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markup'
var view = function () {
	const { value } = this.state

	return (
		<Editor
			value={value}
			onValueChange={this.onChange}
			highlight={(code) => highlight(code, languages.html)}
			padding={10}
			style={{
				fontFamily: '"Fira code", "Fira Mono", monospace',
				fontSize: 12,
			}}
		/>
	)
}
export default view
