const {jungleName, zeroPad} = require('../app')
const { assert } = require('chai')

describe('#zeroPad()', function () {
	it('should return a string', function () {
		assert.isString(zeroPad(12, 4))
	})

	it('should return a correctly string size', function () {
		assert.lengthOf(zeroPad(2, 4), 4)
	})

	it('should return a correctly value', function () {
		const rep = '00010'
		assert.equal(zeroPad(10, 5), rep)
	})

	it('should return just a string value when the length is the same as `max`', function () {
		const n = 12
		const ret = zeroPad(n, n.toString().length)
		assert.isString(ret)
		assert.equal(ret, n.toString())
	})

	it('should do nothing with non-numbers values', function () {
		const obj1 = {a: 1}
		const obj2 = 'string'

		const ret = zeroPad(obj1, obj2)
		assert.deepEqual(ret, obj1)
	})

	it('should do nothing with smaller digits', function () {
		const rep = 12
		assert.deepEqual(zeroPad(rep, rep.toString().length - 1), rep)
	})
})

describe('#jungleName()', function () {
	it('should return the jungle name', function () {
		const rep = '021 Venturini'
		const ret = jungleName('Daniel', 'Venturini', 21)
		assert.equal(ret, rep)
	})
})
