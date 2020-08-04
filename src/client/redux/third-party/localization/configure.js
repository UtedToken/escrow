/**
 * Configure all the changes related  to store
 */
import { setLanguages, addTranslation } from 'react-localize-redux'
import { supportedLanguages } from './config'
import { isSSR } from '../../../utils/web'
//Check for server side rendering
let isClientLoaded = !isSSR()
/**
 * Get Language from browser
 * @returns {*}
 */
const getLanguage = () => {
	let language = null
	if (isClientLoaded) {
		language = (navigator.language || navigator.userLanguage).substr(0, 2)
	} else {
		//TO DO : We should actually read the language present in request from client and then use that
		language = supportedLanguages[0]
	}
	if (supportedLanguages.indexOf(language) === -1) {
		language = 'en'
	}

	return language
}
/**
 * Configure localization by dispatching neccesary actions
 * @param dispatch
 */
export default function (dispatch, translations) {
	dispatch(setLanguages(supportedLanguages, getLanguage()))
	for (var key in translations) {
		dispatch(addTranslation(translations[key] || []))
	}
}
