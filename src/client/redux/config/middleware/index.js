/**
 This file is used to add middlewares. Add middlewares here
 */
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import { browserHistory } from 'react-router'
import socketIO, { configureSocketListeners } from './socket-io'

const history = browserHistory
/**
 * Configure socket-io middleware
 */
const socket = null //null;io.connect(HOST);
export { configureSocketListeners, socket, history }
const socketIoMiddleware = socketIO(socket)
/*
 Create History
 */
const middleware = [
	thunk,
	promise,
	routerMiddleware(history),
	socketIoMiddleware,
]
export default middleware
