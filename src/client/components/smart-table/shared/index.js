import Lang from './lang.json'
import _ from 'lodash'

/**
 * Get Localized Label
 * @param key
 * @param extra
 * @returns {*}
 */
export function getLocalizedLabel(key, extra) {
	let { localization } = this.props
	localization = localization || {}
	return localization[key]
		? localization[key]
		: Lang[key] + (extra ? ' ' + extra : '')
}

/**
 * Compare if a array is equal
 * @param arr1
 * @param arr2
 */
export function isArrayEqual(arr1, arr2) {
	return _(arr1).differenceWith(arr2, _.isEqual).isEmpty()
}
