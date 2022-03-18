/**
 * Parse the meta string into object
 *
 * @param {string} metaString
 * @return {[key: string]: string}
 */
export function parseMeta(metaString) {
	const meta = {}

	metaString.split(' ').forEach((str) => {
		const equalIndex = str.indexOf('=')

		if (equalIndex > 0) {
			const key = str.slice(0, equalIndex)
			const value = str.slice(equalIndex + 1)

			meta[key] = value
		}
	})

	return meta
}
