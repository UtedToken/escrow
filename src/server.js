import React from 'react'
import express from 'express'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { routes } from './client/routes'
import createStore, { configureActions } from './client/redux'
import { Provider } from 'react-redux'
import Axios from 'axios'
/**
 * The reason why browser has to be imported here
 * is because during production environment - App is started via this file
 */
if (typeof window === 'undefined') {
	require('./browser/index')
}
//require("@babel/polyfill");
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

server
	.disable('x-powered-by')
	//In production it should use the build's public directory
	.use(
		express.static(
			process.env.NODE_ENV === 'production'
				? __dirname + '/public'
				: process.env.RAZZLE_PUBLIC_DIR,
		),
	)
/**
 * Configure custom routes
 */

server.use(async (req, res, next) => {
	let serverState = {}
	let config = {}
	window.app.config = config
	try {
		if (!window.app.firebaseConfig) {
			console.log(window.app.server + 'web-client-config/firebaseConfig')
			const response = await Axios.get(
				window.app.server + 'web-client-config/firebaseConfig',
			)
			if (response.status === 200) {
				window.app.firebaseConfig = (
					await Axios.get(
						window.app.server + 'web-client-config/firebaseConfig',
					)
				).data
			} else {
				throw response
			}
		}
	} catch (e) {
		console.log('Error while fetching firebase config', e)
	}

	match(
		{ routes: routes(), location: req.url },
		async (error, redirectLocation, renderProps) => {
			if (error) {
				res.status(500).send(error.message)
			} else if (redirectLocation) {
				res.redirect(302, redirectLocation.pathname + redirectLocation.search)
			} else if (renderProps) {
				const store = createStore(serverState)
				configureActions(store.dispatch)
				// Grab the initial state from our Redux store
				const finalState = store.getState()

				// You can also check renderProps.components or renderProps.routes for
				// your "not found" component or route respectively, and send a 404 as
				// below, if you're using a catch-all route.
				const context = {}
				const markup = renderToString(
					<Provider store={store}>
						<RouterContext {...renderProps} />
					</Provider>,
				)

				if (context.url) {
					res.redirect(context.url)
				} else {
					res.status(200).send(
						`<!doctype html>
                <html lang="">
                <head>
                    <link rel="icon" type="image/png" href="fevicon.png" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta charset="utf-8" />
                    <title>CMS</title
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    ${
											assets.client.css
												? `<link rel="stylesheet" href="${assets.client.css}">`
												: ''
										}
                    ${
											process.env.NODE_ENV === 'production'
												? `<script src="${assets.client.js}" defer></script>`
												: `<script src="${assets.client.js}" defer crossorigin></script>`
										}
                    <script>
                    window.app = {}
                    ${Object.keys(window.app)
											.map((key) => {
												return `
                            window.app["${key}"] = ${JSON.stringify(
													window.app[key],
												)};
                            `
											})
											.join('\n')} 
                     </script>
                </head>
                <body>
                    <div id="root">${markup}</div>
                     <script>
                      window.__PRELOADED_STATE__ = ${JSON.stringify(finalState)}
                    </script>
                </body>
            </html>`,
					)
				}
			} else {
				res.status(404).send('Not found')
			}
		},
	)
})
process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
	// application specific logging, throwing an error, or other logic here
})
export default server
