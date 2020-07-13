const MAX_CHAIR = 23

/**
 * @deprecated
 * 
 * Returns a string with length `digits` with a left zero pad. If the `number` lengths is the same as `digits`, it returns the `number` as string
 *
 * @param {int} number The number to be padded
 * @param {int} digits The length of a returned string
 *
 * @example number = 12 and digits = 4 should returns '0012'
 * 
 * @return {string} The `number` with left zero pad
 */
function zeroPad (number, digits = 0) {
	if (typeof number != 'number' || typeof digits != 'number') return number
	if (digits < number.toString().length) return number

	let res = number.toString()
	for (digits -= number.toString().length; digits > 0; digits --) res = `0${res}`

	return res
}

/**
 * Computes your war name and number to get your jungle course.
 *
 * @param {string} fname Your real first name
 * @param {string} lname Your real last name
 * @param {int} number Your real previous war number
 *
 * @return {string} Your new number followed your jungle name
 */
function jungleName (fname, lname, number) {
	const newNumber = number % MAX_CHAIR
	return `${zeroPad(newNumber, 3)} ${lname}`
}

/**
 * @exports jungleName The main function in this module.
 * @exports zeroPad Just for test propose
 */
module.exports = {jungleName, zeroPad}
