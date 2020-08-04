import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'
import { isSSR } from '../../utils/web'
/**
 * Firebase Config
 * @type {{}}
 */
const firebaseConfig = window.app.firebaseConfig

/**
 * react-redux-firebase config
 * @type {{userProfile: string}}
 */
const rrfConfig = {}

/**
 This file is used to add enhancers. Add Enhancers here
 */
let enhancers = !isSSR()
	? [reactReduxFirebase(firebase.initializeApp(firebaseConfig), rrfConfig)]
	: []

export default enhancers
