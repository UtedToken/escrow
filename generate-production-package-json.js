'use strict'

const fs = require('fs')
function removeLocalDependencies(obj) {
	Object.keys(obj).map((key) => {
		if (obj[key].startsWith('file:')) {
			delete obj[key]
		}
	})
}
let rawdata = fs.readFileSync('package.json')
let config = JSON.parse(rawdata)
removeLocalDependencies(config.dependencies)
//removeLocalDependencies(config.devDependencies);
delete config.devDependencies
config.scripts = {}
config.scripts.start = 'node server.js'
fs.writeFileSync('build/package.json', JSON.stringify(config))
