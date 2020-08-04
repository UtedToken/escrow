import Flat from 'flat'
import * as translations from '../../../config/translations'
import { supportedLanguages } from './config'
import { isSSR } from '../../../utils/web'

/**
 * Create Translations - Logic is taken from react-redux-localize/lib/locale.js - translations method
 * @returns {{}}
 */
const createTranslations = function () {
	let obj = {}
	Object.values(translations).map((value) => {
		obj = {
			...obj,
			...Flat.flatten(value, { safe: true }),
		}
	})
	return obj
}

/**
 * This is initial state used for server side rendering
 * Its format should be same what is expected by react-redux-localize
 */
export default function (req) {
	let isClientLoaded = !isSSR()
	if (isClientLoaded) {
		//If Client is already loaded we dont need initial state
		return {}
	}

	let lang = null
	if (!req) {
		lang = 'en'
	} else {
		//Get Language from Request Headers
		const header = req.headers['accept-language']
		if (header) {
			lang = header.substr(0, 2)
		} else {
			lang = 'en'
		}
	}
	let languages = null
	/**
	 * Check if language from accept-language is present in supported languages
	 * @type {null}
	 */
	if (supportedLanguages.indexOf(lang) !== -1) {
		languages = supportedLanguages.map((language) => {
			return {
				code: language,
				active: language === lang,
			}
		})
	} else {
		languages = supportedLanguages.map((language, index) => {
			return {
				code: language,
				active: index === 0,
			}
		})
	}

	return {
		languages: languages,
		translations: createTranslations(),
	}
}
