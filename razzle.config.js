/**
 * This helper is used to convert json object into sass variable syntax
 * https://github.com/electrode-io/electrode/issues/333#issuecomment-311553600
 */
function jsonToSassVars(obj) {
	// Make object root properties into sass variables
	var sass = ''
	for (var key in obj) {
		//sass += "$" + key + ":" + JSON.stringify(obj[key], null, indent) + ";\n";
		sass += '$' + key + ':' + obj[key] + ';\n'
	}

	// Store string values (so they remain unaffected)
	var storedStrings = []
	sass = sass.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, function (str) {
		var id = '___JTS' + storedStrings.length
		storedStrings.push({ id: id, value: str })
		return id
	})

	// Convert js lists and objects into sass lists and maps
	sass = sass.replace(/[{\[]/g, '(').replace(/[}\]]/g, ')')

	// Put string values back (now that we're done converting)
	storedStrings.forEach(function (str) {
		sass = sass.replace(str.id, str.value)
	})

	return sass
}
const lessToJs = require('less-vars-to-js')
const path = require('path')
const fs = require('fs')
//Convert less to js
const lessVariables = lessToJs(
	fs.readFileSync(
		path.join(__dirname, './src/client/styles/theme/index.less'),
		'utf8',
	),
)
let sassVariables = {}
let value = ''
//Replace less @ by ''
for (var key in lessVariables) {
	value = lessVariables[key]
	key = key.replace('@', '')
	sassVariables[key] = value
}
//Convert Sass variable object to json string which can be passed to sass loader
sassVariables = jsonToSassVars(sassVariables)
//./razzle.config.js
module.exports = {
	modify: require('razzle-heroku'),
	plugins: [
		'antdesign',
		{
			name: 'less',
			options: {
				theme: lessVariables,
			},
		},
		{
			name: 'scss',
			options: {
				sass: {
					dev: {
						data: sassVariables,
					},
					prod: {
						data: sassVariables,
					},
				},
			},
		},
	],
}
