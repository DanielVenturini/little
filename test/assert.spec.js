/* eslint-disable max-classes-per-file */

const {assert, AssertionError} = require('chai')

describe('Assert', function () {
	describe('base', function () {
		it('this case should be pending')
		it('`assert` function', function () {
			const first = 1
			const second = first + 2
			assert(first !== second, `${first} should be different from ${second}`)
		})
	})

	describe('#equal', function () {
		it('`.equal` should computes only a non-strict equality', function () {
			assert.equal(1, '1')
			assert.equal(false, 0)
			assert.equal(true, 1)
			assert.equal(undefined, null)
			/* IT JUST WORKS IN THE .deepEqual
			const daniel = 'bra'
			assert.equal({daniel}, {daniel})
			assert.equal([1,2,3,4,5], [1,2,3,4,5])
			*/
		})

		it('`.strictEqual` should computes a strict equality', function () {
			const daniel = 'brazil'
			// assert.throw(strictEqual, '`.strictEqual` should throws an error when evalutes `1` and `\'1\'`')
			// assert.throw(function () {strictEqual({daniel}, {daniel})}, '`.strictEqual` should throws an error when evalutes `1` and `\'1\'`')
			assert.strictEqual(1, 1)
			assert.strictEqual(daniel, 'brazil')
		})

		it('`.deepEqual` should computes an equality by reference', function () {
			const daniel = 'brazil'
			assert.deepEqual({daniel}, {daniel: daniel})	// eslint-disable-line object-shorthand
			assert.deepEqual(daniel, 'brazil')
			assert.deepEqual(1, 1)
			assert.deepEqual([1,2,3,4,5], [1,2,3,4,5])
		})

		it('`.notEqual` should computes only a non-strict difference', function () {
			assert.notEqual(1, 2)
			assert.notEqual(true, false)
			assert.notEqual([], {})
			assert.notEqual(undefined, NaN)
		})

		it('`.notStrictEqual` should computes a strict difference', function () {
			// !==
			assert.notStrictEqual(undefined, null)
			assert.notStrictEqual(1, 2)
			assert.notStrictEqual(1, '1')
			assert.notStrictEqual(1, true)
		})

		it('`.notDeepEqual` should computes a deep diference', function () {
			const daniel = 'brazil'
			assert.notDeepEqual({daniel}, {daniel: 'daniel'})
			assert.notDeepEqual(1, '1')
			assert.notDeepEqual([1,2,3], [1,2,3, 4])
		})
	})

	describe('#is* to objects properties', function () {
		it('`.isOk` should be true for several truly objects', function () {
			assert.isOk('My string')
			assert.isOk([], 'I think that `[]` should be ok')
			assert.isOk(123)
			assert.isOk({})
			assert.isOk(() => false)
		})

		it('`.isNotOk` should be true for falsy values', function () {
			assert.isNotOk('', 'I guess that an empty string would be truly')
			assert.isNotOk(undefined)
			assert.isNotOk(null)
			assert.isNotOk(NaN)
			assert.isNotOk(0)
			assert.isNotOk(false)
		})

		it('`.isTrue` should works only with true values', function () {
			assert.isTrue(true)
			assert.isTrue(!!18)
		})

		it('`.isNotTrue` should works with any value except true', function () {
			assert.isNotTrue('brazil')
			assert.isNotTrue(1)
			assert.isNotTrue(false)
			assert.isNotTrue(null)
		})

		it('`.isFalse` should works only with false values', function () {
			assert.isFalse(false)
			assert.isFalse(!!undefined)
			assert.isFalse(!!0)
			assert.isFalse(!true)
		})

		it('`.isNotFalse` should works with any non-false value', function () {
			assert.isNotFalse(true)
			assert.isNotFalse(1)
			assert.isNotFalse(0)
			assert.isNotFalse(undefined)
			assert.isNotFalse('')
			assert.isNotFalse(null)
		})

		it('`.isNull` should works only with null values', function () {
			let daniel = null
			assert.isNull(null)
			assert.isNull(daniel)
			// assert.isNull(undefined) // does not work
			// assert.isNull([]) // does not work
		})

		it('`.isNotNull` should works with any not null values', function () {
			let daniel
			assert.isNotNull(!null)
			assert.isNotNull(0)
			assert.isNotNull(daniel)	// in really, it is undefined
			// eslint-disable-next-line no-empty-function
			assert.isNotNull((function () {})())	// it is undefined, too
		})

		it('`.isNaN` should works only with NaN', function () {
			assert.isNaN(0 / 0)
			assert.isNaN(Infinity / Infinity)
			assert.isNaN(Infinity - Infinity)
			assert.isNaN(undefined / 23)
			assert.isNaN('brazil' / 3)
		})

		it('`.isNotNaN` should works with any non-nan values', function () {
			assert.isNotNaN(0 / 3)
			assert.isNotNaN(Infinity / 7)
			assert.isNotNaN(undefined)
			assert.isNotNaN('brazil')
		})

		it('`.exists` should works with non `null` or `undefined` values', function () {
			const v = null
			assert.exists(undefined + 3)
			assert.exists(!v)
			assert.exists('')
		})

		it('`.notExists` should works only with `null` or `undefined` values', function () {
			let b
			const c = 'brazil'
			assert.notExists(b)
			assert.notExists(c.err)
		})

		it('`.isUndefined` should works only with `undefined` values', function () {
			let b = 'brazil'
			assert.isUndefined(b.value)
			assert.isUndefined(undefined)
			// eslint-disable-next-line no-empty-function
			assert.isUndefined((function () {})())
			assert.isUndefined()
		})

		it('`.isDefined` should works with any non-undefined value', function () {
			assert.isDefined(false)
			assert.isDefined(assert)
			assert.isDefined(null)
		})
	})

	describe('#is* to object types', function () {
		it('`.isFunction` should works only with functions', function () {
			const b = () => b	// trolll
			// eslint-disable-next-line no-empty-function
			assert.isFunction(function () {})
			assert.isFunction(() => 3)
			assert.isFunction(assert.isFunction)			// trolll again
			assert.isFunction(require('chai').should) // the great question of humanity
			assert.isFunction(require('chai').assert)	// it is also a function and an object
			assert.isFunction(b)
		})

		it('`.isNotFunction` should works with non-function', function () {
			const b = function () {return 12}
			assert.isNotFunction((() => 23)())
			assert.isNotFunction(b())
			assert.isNotFunction(false)
		})

		it('`.isObject` should works only with `Object`s like', function () {
			class MyErr {}
			assert.isObject(new MyErr())
			assert.isObject({0:'b',1:'r',2:'a',3:'z',4:'i',5:'l'})
			assert.isObject({d: 2})
		})

		it('`.isNotObject` should works only with non `Object`s like', function () {
			assert.isNotObject(12)
			assert.isNotObject('brazil')
			assert.isNotObject(true)
			assert.isNotObject(null)
			assert.isNotObject([1,2,3])
			assert.isNotObject(new Array(3))
			assert.isNotObject(new Array(1,2,3))
			/* eslint-disable no-new-wrappers*/
			assert.isNotObject(new String('this still is not an object'))
			assert.isNotObject(new Boolean([]))
			assert.isNotObject(new Error('This is an object, bro'))
			/* eslint-enable no-new-wrappers*/
		})

		it('`.isArray` should works only with arrays', function () {
			const f = (...values) => values
			assert.isArray([])
			assert.isArray([1,2,3])
			assert.isArray(f(1,2,3))
			assert.isArray(new Array(1,2,3,4,5))
		})

		it('`.isNotArray` should works only with non array values', function () {
			const f = () => arguments	// eslint-disable-line prefer-rest-params
			assert.isNotArray(f(1,2,3))
			assert.isNotArray()
			assert.isNotArray('string')
		})

		it('`.isString` should works only with string values', function () {
			assert.isString(new String(false))	// eslint-disable-line
			assert.isString('1')
			assert.isString(typeof undefined)
			assert.isString('brazil'.charAt(1))
		})

		it('`.isNotString` should work with non string values', function () {
			assert.isNotString(('daniel', [1,2,3]))
		})

		it('`.isNumber` should works only with number values', function () {
			assert.isNumber(123)
			assert.isNumber(-0)
			assert.isNumber(0.82)
			assert.isNumber(Infinity)
			assert.isNumber(NaN)	// i have no idea
			assert.isNumber(072)	// eslint-disable-line
			assert.isNumber(new Number('1'))	// eslint-disable-line
			assert.isNumber(new Number('072'))	// eslint-disable-line
			assert.isNumber(parseInt('100', 2))	// eslint-disable-line prefer-numeric-literals
			assert.isNumber(0b100)
			assert.isNumber(0x100)
			assert.isNumber(0o100)
			assert.isNumber(parseFloat('12342.234234'))
		})

		it('`.isNotNumber` should works only with non number values', function () {
			assert.isNotNumber('123')
			// assert.isNotNumber(NaN) // it does not work
			assert.isNotNumber(false)
		})

		it('`.isBoolean` should works only with boolean values', function () {
			assert.isBoolean(true)
			assert.isBoolean(!1)
			assert.isBoolean(!!0)
			assert.isBoolean(new Boolean('brazil'))	// eslint-disable-line
		})

		it('`.isNotBoolean` should works with any value except boolean', function () {
			assert.isNotBoolean('brazil')
			assert.isNotBoolean(undefined)
			assert.isNotBoolean(0)
		})
	})

	describe('Utils to numbers', function () {
		it('`.isAbove` should calculates a value greater than other', function () {
			const throwMessage = '`.isAbove` should throws an error when the first value is smaller or equal than the second'
			assert.throws(function () {assert.isAbove(1, 1, throwMessage)}, throwMessage)

			assert.isAbove(2, 1)
			assert.isAbove(0, -0.999999)
		})

		it('`.isAtLeast` should calculates an inclusive floor', function () {
			const throwMessage = '`.isAtLeast` should thrown an error when the first is less than the second'
			assert.throw(function () {assert.isAtLeast(1, 1.0000001, throwMessage)}, throwMessage)

			assert.isAtLeast(1, 1)
			assert.isAtLeast(2, 1)
		})

		it('`.isBelow` should calculates a ceil', function () {
			const throwMessage = '`.isBelow` should thrown an error when the first is greater or major than second'
			assert.throw(function () {assert.isBelow(1, 1, throwMessage)}, throwMessage)

			assert.isBelow(1, 2)
			assert.isBelow(1, 1.00000001)
		})

		it('`.isAtMost` should calculates an inclusive ceil', function () {
			assert.isAtMost(12, 28)
			assert.isAtMost(12, 12)
			assert.isAtMost(12, 12.000000001)
		})

		it('`.isFinite` should works with numeric valuable', function () {
			const googol = 10 ^ 100
			const googolplex = 10 ^ googol
			assert.isFinite(1)
			assert.isFinite(googol)
			assert.isFinite(googolplex)
		})

		it('`.operator` should compares two numbers with an operator', function () {
			assert.operator(127, '<=', 128)
			assert.operator(new Date(), '>', new Date('2020-02-14'), 'it also compares objects')
			assert.operator('1000', '==', 1e3, 'it also coerces')
		})

		it('`.closeTo` should creates a range to a value', function () {
			assert.closeTo(630, 500, 150, 'is 630 major or less than 150 unity from 500?')
			assert.closeTo(1.028, 1, 0.1)
			assert.closeTo(1.028, 1, 0.03)
		})

		it('`.approximately` should verify if the number is approximately from other by a range value', function () {
			// THE SAME VALUES AS .closeTo
			assert.approximately(630, 500, 150)
			assert.approximately(1.028, 1, 0.1)
			assert.approximately(1.028, 1, 0.03)
		})

		it('`.oneOf` should verify a non-object and non-array value appears in the list', function () {
			// it works pretty well to non-object values, that is, to numbers and strings
			assert.oneOf(1, [2, 1])
			assert.oneOf('str', [1,2,'str',3])
		})
	})

	describe('Utils operations', function () {
		it('`.typeOf` should returns the typeof based in the `Object.prototype.toString`', function () {
			assert.typeOf('brazil', 'string')
			assert.typeOf(1, 'number')
			assert.typeOf(NaN, 'number')
			assert.typeOf(Infinity, 'number')
			assert.typeOf(true, 'boolean')
			assert.typeOf([1,2,3], 'array')
			assert.typeOf({dan: 'brazil'}, 'object')
			assert.typeOf(null, 'null')
			assert.typeOf(undefined, 'undefined')
			assert.typeOf(/[ab]/, 'regexp')
		})

		it('`.notTypeOf` should evaluates a non type based in the `Object.prototype.toString`', function () {
			assert.notTypeOf('brazil', 'number')
			assert.notTypeOf(null, 'undefined')
			assert.notTypeOf([1,2,3], 'object')
		})

		it('`.instanceOf` should verify the constructor instance', function () {
			class Ventu extends Error {}
			assert.instanceOf(new Ventu(), Error)
			assert.instanceOf(new String('brazil'), Object)	// eslint-disable-line
			// assert.instanceOf('brazil', String)	// it does not work
			assert.instanceOf(new Number(Infinity), Number)	// eslint-disable-line
			assert.instanceOf(new Number(23), Number)	// eslint-disable-line
		})

		it('`.notInstanceOf` should verify with others constructor instance', function () {
			assert.notInstanceOf('brazil', String)
			assert.notInstanceOf('brazil', Object)
			assert.notInstanceOf(12, Number)
			assert.notInstanceOf(12, Object)
			assert.notInstanceOf(true, Boolean)
		})

		it('`.include` should verify the values inside an object', function () {
			// it is different from `.property` because it works with string and list
			const l = [1,2,3, {a: 12}]
			const str = 'brazil'
			const obj = {prop1: 'val1', prop2: 'val2'}
			assert.include(l, 3)
			assert.include(str, 'bra')
			assert.include(obj, {prop1: 'val1'})
			assert.include(obj, {toString: obj.toString})
		})

		it('`.notInclude` should verify if the values are not in the object', function () {
			const l = [1,2,3, {a: 12}]
			const str = 'brazil'
			const obj = {prop1: 'val1', prop2: 'val2', l: l[3]}
			assert.notInclude(l, [1,2,3])
			assert.notInclude(str, 'liz')
			assert.notInclude(obj, {pro1: 'val2'})
			assert.notInclude(l, {a: 12})
			assert.notInclude(obj, {l: {a: 12}})
		})

		it('`.deepInclude` should verify deeply the values inside an object', function () {
			const l = [1,2,3, {b: 2}]
			const obj = {prop1: 'val1', prop2: 'val2'}
			assert.deepInclude(l, {b: 2})
			assert.deepInclude(obj, {prop1: 'val1'})
		})

		it('`.notDeepInclude` should verify if the values are not in the object', function () {
			const l = [1,2,3, {b: 2}]
			const obj = {prop1: 'val1', prop2: 'val2', l: l[3]}
			assert.notDeepInclude(l, [2, {b: 2}])
			assert.notDeepInclude(obj, {l: {b: 12}})
		})

		it('`.nestedInclude` should verify the nested property of an object', function () {
			// properties with `.` or `[]` can be escaped using double backslashes `\\`
			const obj = {countries: {name: 'brazil', population: 1024}, '.bin': {mocha: 'mocha', '[nyc': '.nyc'}}
			assert.nestedInclude(obj, {'countries.name': 'brazil'})
			assert.nestedInclude(obj, {'\\.bin.\\[nyc': '.nyc'})
		})

		it('`.notNestedInclude` should verify nested if the values are not in the object', function () {
			const obj = {c: {'.bin': {false: [1,2,3], true: [1,2,3], 'back]': 12}}}
			assert.notNestedInclude(obj, {'c.\\.bin.back\\]': 122})
		})

		it('`.deepNestedInclude` should verify nested deeply if the values are on object', function () {
			const obj = {c: {'.bin': {false: [1,2,3], true: [1,2,3], 'back]': {a: 12}}}}
			assert.deepNestedInclude(obj, {'c.\\.bin.false': [1,2,3]})
			assert.deepNestedInclude(obj, {'c.\\.bin.back\\]': {a: 12}})
		})

		it('`.notDeepNestedInclude` should verify nested deeply if the values are not in the object', function () {
			const obj = {c: {'.bin': {false: [1,2,3], true: [1,2,3], 'back]': {a: 12}}}}
			assert.notDeepNestedInclude(obj, {'c.\\.bin.back\\]': {a: 13}})
		})

		it('`.ownInclude` should verify values in object but ignores inherited', function () {
			const obj = {c: {'.bin': {false: [1,2,3], true: 123, 'back]': {a: 12}}}}
			assert.ownInclude(obj.c['.bin'], {true: 123})
		})

		it('`.notOwnInclude` should verify values that are not in an object or is inherited', function () {
			const obj = {c: {'.bin': {false: [1,2,3], true: 123, 'back]': {a: 12}}}}
			assert.notOwnInclude(obj, {toString: obj.toString})	// obj contains `toString`, but it is inherited
			assert.notOwnInclude(obj, {c: {'.bin': {true: 123}}})	// keys `false` and `back]` are missing, thus are not own included
		})

		it('`.deepOwnInclude` should verify deeply the values that are in object', function () {
			const obj = {c: {'.bin': {false: [1,2,3], true: 123, 'back]': {a: 12}}}}
			assert.deepOwnInclude(obj.c, {'.bin': {false: [1,2,3], true:123, 'back]': {a: 12}}})
		})

		it('`.notDeepOwnInclude` should verify deeply the properties that are not in an object', function () {
			const obj = {c: {'.bin': {false: [1,2,3], true: 123, 'back]': {a: 12}}}}
			assert.notDeepOwnInclude(obj.c['.bin'], {false: [1,2,3,4]})
		})

		it('`.match` should match a `regexp`', function () {
			assert.match('foobar', /^foo/)
			assert.match('foobar', /bar$/)
			assert.match('as12Kdfjl_las.j', /^[a-zA-Z][\w._]*$/)
		})

		it('`.notMatch` should not match a `regexp`', function () {
			assert.notMatch('12daniel_ventu.rni', /^[a-zA-Z][\w._]*$/)
		})

		it('`.property` should verify a direct or inherited property', function () {
			// it is different from `.includes` because it just works with properties
			const obj = {tea: {chai: true}}
			assert.property(obj, 'tea')
			assert.property(obj, 'toString')
			assert.include(obj, {toString: obj.toString})	// the same, i think
		})

		it('`.notProperty` should verify if a property is not in the obj', function () {
			const obj = {tea: {chai: true}}
			const l = [1,2,3, 'obj']
			assert.notProperty(obj, 'brazil')
			assert.notProperty(l, 'obj')	// `.includes` works with list
		})

		it('`.propertyVal` should verify the property values', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.propertyVal(obj, 'str', 'str')
			assert.propertyVal(obj, 'n', 123)
		})

		it('`.notPropertyVal` should verify if the value of a property is not a specified value', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.notPropertyVal(obj.tea, 'chai', false)
			assert.notPropertyVal(obj, 'n', undefined)
		})

		it('`.deepPropertyVal` should verify deeply the property values', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.deepPropertyVal(obj, 'tea', {chai: true})
		})

		it('`.noDeepPropertyVal` should verify deeply if the value of a properfy is not a specified value', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.notDeepPropertyVal(obj, 'tea', {chai: false})
		})

		it('`.nestedProperty` should verify nested if an object has a property', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.nestedProperty(obj, 'tea.chai')
			assert.nestedProperty(obj, 'n')
		})

		it('`.notNestedProperty` should verify nested if an object has no a specified property', function () {
			assert.notNestedProperty({a: {b: {c: {d: 1}}}}, 'a.b.c.d.e')
		})

		it('`.nestedPropertyVal` should verify nested if an object has a specified property', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.nestedPropertyVal({a: {b: {c: {d: 1}}}}, 'a.b.c.d', 1)
			assert.nestedPropertyVal(obj, 'tea.chai', true)
			assert.nestedPropertyVal(obj, 'str[0]', 's')
		})

		it('`.notNestedPropertyVal` should verify nested if a property has no a specified val', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.notNestedPropertyVal(obj, 'str[0]', 'g')
			assert.notNestedPropertyVal(obj, 'tea.chai', false)
		})

		it('`.deepNestedPropertyVal` should verify deeply nested if a property has a val', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.deepNestedPropertyVal(obj, 'tea', {chai: true})
		})

		it('`.notDeepNestedPropertyVal` should verify if a property has no a specified value', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.notDeepNestedPropertyVal(obj, 'n', '123')
		})

		it('`.lengthOf` should verify the length of an object', function () {
			const obj = {a: 10, b:'k'}
			obj.length = 10
			assert.lengthOf(obj, 10, '.lengthOf verifies the `length` property')

			assert.lengthOf([1,2,3,4], 4)
			assert.lengthOf('daniel', 6)
			assert.lengthOf(new Set([1,2,3]), 3)
		})

		it('`.hasAnyKeys` should verify if the obj has some of those keys', function () {
			assert.hasAnyKeys({a: 10, b:'k'}, ['a', 'k', 'j'])
			assert.hasAnyKeys(new Map([['a', 'value'], ['b', 12]]), ['a', 'j'])
		})

		it('`.hasAllKeys` should verify all keys in the object', function () {
			const obj = {obj: 'key', map: 12, three: 3}
			assert.hasAllKeys(obj, ['obj', 'map', 'three'])
			// THE NEXT DOES NOT WORK, BUT IN `CONTAINS`, IT DOES
			// assert.hasAllKeys(obj, ['obj', 'map'], 'obj has more than those keys')
		})

		it('`.hasAllDeepKeys` should verify if object has all keys deeply', function () {
			const obj = {obj: 'key', map: 12, three: 3}
			const obj2 = {[obj]: 'key', day: 7}

			assert.hasAllDeepKeys(obj, ['obj', 'map', 'three'])
			assert.hasAllDeepKeys(obj2, ['day', obj])
		})

		it('`.containsAllKeys` should verify if the object has AT LEAST all keys provided', function () {
			// a single match key will validated the test
			const obj = {obj: 'key', map: 12, three: 3}
			assert.containsAllKeys(obj, ['obj', 'map', 'three'])
			assert.containsAllKeys(obj, ['obj', 'map'], 'obj should has at least all these keys')
		})

		it('`.containsAllDeepKeys` should verify that object contains all of the keys deeply provided', function () {
			const obj = {obj: 'key', map: 12, three: 3}
			assert.containsAllDeepKeys(obj, ['obj', 'map', 'three'])
			assert.containsAllDeepKeys(obj, ['obj', 'map'], 'obj contains at least all keys provided, but it may contains more')
			assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1,2]]), {one:'one'})
		})

		it('`.doesNotHaveAnyKeys` should verify if object has NONE of those keys', function () {
			// a single matched key will fail the test
			const obj = {obj: 'key', map: 12, three: 3}
			assert.doesNotHaveAnyKeys(obj, ['object', 'mapped', 'two'], 'at least `two` is not in the `obj`')
			assert.doesNotHaveAnyKeys(obj, {objj: 12, mapped: 'three', two: 2})
			assert.doesNotHaveAnyKeys([0,1,2,3,4], ['33', 'kvalue', 'jvalue', 'money'])
		})

		it('`.doesNotHaveAnyDeepKeys` should verify deeply if the object has none of the keys provider', function () {
			const obj = {obj: 'key', map: 12, three: 3}
			assert.doesNotHaveAnyDeepKeys(obj, ['objj', 'maped', 'two'])
			assert.doesNotHaveAnyDeepKeys(new Map([[{a:'b'}, 'kvalo']]), {a:'a'})
		})

		it('`.doesNotHaveAllKeys` should verify if object does not have at least one of those keys', function () {
			// a single missing or unbound key will pass the test
			const obj = {obj: 'key', map: 12, three: 3}
			assert.doesNotHaveAllKeys(obj, {obj: 'key', map: 12, three: 3, two: 3}, 'at least `two` is not in the obj')
			assert.doesNotHaveAllKeys(obj, ['obj', 'three'], '`map` is key but is not expected')
			assert.doesNotHaveAllKeys([1,2,3,4], ['0', '1', '2', '3', '4'], 'unbound key `4` is not in the obj')
			assert.doesNotHaveAllKeys([1,2,3,4], ['0', '1', '2'], 'missing key `3` is in the obj')
		})

		it('`.doesNotHaveAllDeepKeys` should verify if the object has no at least one of the keys', function () {
			const obj = {obj: 'key', map: 12, three: 3}
			assert.doesNotHaveAllDeepKeys(obj, ['obj', 'map', 'two'])
			assert.doesNotHaveAllDeepKeys(new Map([[{a: '1'}, 12]]), {a: 1})
		})

		it('`.throws` verifies if the callback throws an error, its instance and its message', function () {
			class MyUnexpectedError extends Error {}
			const msg = 'There is no one waiting for this'
			const fn = () => {throw new MyUnexpectedError(msg)}

			assert.throws(fn)
			assert.throws(fn, msg, 'The error should thrown with that message')
			assert.throws(fn, /waiting/, 'The error should thrown that match `waiting`')
			assert.throws(fn, MyUnexpectedError) // The error should be an instance of `MyUnexpectedError`
			assert.throws(fn, Error) // The error should be an instance of `Error`
		})

		it('`.doesNotThrow` should verify if the callback does not throws any error', function () {
			class MyUnexpectedError extends Error {}
			const msg = 'There is no one waiting for this'
			const fn = () => {throw new MyUnexpectedError(msg)}
			class MyUnexpectedError2 extends AssertionError {}

			assert.doesNotThrow(fn, `if throws, should not have the message ${msg}`)
			assert.doesNotThrow(fn, /error/, 'if throws, should not match the given pattern')
			assert.doesNotThrow(fn, MyUnexpectedError2, 'if throws, should not be an instance of MyUnexpectedError2')
		})

		it('`.sameMembers` should verify if both arrays have the same members', function () {
			assert.sameMembers([1,2,3], [3,2,1], 'it works in any order')
			assert.sameMembers(['k1', 1, 'k2', 2], ['k1', 'k2', 2, 1])
		})

		it('`.notSameMembers` should verify if arrays have at least one different value', function () {
			assert.notSameMembers([1,2,3], [1,3,2,4], '4 is not in the first array')
			assert.notSameMembers([1,2,3,'str'], [1,3,2,4])
		})

		it('`.sameDeepMembers` should verify deeply if both arrays have the same values', function () {
			assert.sameDeepMembers([1,2,{a: 12},'str'], [2,{a:12},'str',1])
			assert.sameDeepMembers([{a:1},{b:2},{c:3}], [{b:2},{a:1},{c:3}])
		})

		it('`.notSameDeepMembers` should verify deeply at least one value different in arrays', function () {
			assert.notSameDeepMembers([1,2,{a: {b: [1,2]}}], [{a: {b: [1,2]}},1,3], '3 is not in the first array')
			assert.notSameDeepMembers([1,2,{a: {b: [1,2]}}], [{a: {b: [1,2,3]}},1,2], '3 is not in the first array.array')
			assert.notSameDeepMembers([1,2,{a: {b: [3,2,1]}}], [{a: {b: [1,2,3]}},1,2], '3 is not in the first array.array')
		})

		it('`.sameOrderedMembers` should verify if two object has the same members in the same order', function () {
			assert.sameOrderedMembers([1,2,'three', 3], [1,2,'three', 3], '3 is not in the first array')
			// assert.sameOrderedMembers(new Map([[1, 'one'], [2, 'two'], [3, 'three']]), [[1, 'one'],[2, 'two'],[3, 'three']])
		})

		it('`.notSameOrderedMembers` should verify if the members is not in the same order', function () {
			// the same examples from sameMembers
			assert.notSameOrderedMembers([1,2,3], [3,2,1])
			assert.notSameOrderedMembers(['k1', 1, 'k2', 2], ['k1', 'k2', 2, 1])
		})

		it('`.sameDeepOrderedMembers` should verify deeply if the members are the same in the same order', function () {
			assert.sameDeepOrderedMembers([1,2,{a: 12},'str'], [1,2,{a:12},'str'])
			assert.sameDeepOrderedMembers([{a:1},{b:2},{c:3}], [{a:1},{b:2},{c:3}])
		})

		it('`.notSameDeepOrderedMembers` should verify if both object have no all members in the same order', function () {
			assert.notSameDeepOrderedMembers([1,2,{3:4},5],[1,2,{3: 'four'},5])
		})

		it('`.includeMembers` should verify a superset in any order', function () {
			// duplicates are ignored
			assert.includeMembers([1,2,{a: 12},'str'], [1,2,'str',1])
		})

		it('`.notIncludeMembers` should verify a not superset for all values in any order', function () {
			assert.notIncludeMembers([1,2,3,{a:12}], [3,{a:12},4,'five'], '3 is in the superset, but the other ones are not')
			assert.notIncludeMembers([1,2,3], [5,1], '1 is in the superset, but the other ones are not')
		})

		it('`.includeDeepMembers` should verify deeply a superset in any order', function () {
			assert.includeDeepMembers([1,2,{a:12}], [{a:12},2])
			assert.includeDeepMembers([{key:['str',1,2,3]}, {obj: 'map'}], [{obj: 'map'}, {key:['str',1,2,3]}])
		})

		it('`.notIncludeDeepMembers` should not verify a superset in any order', function () {
			assert.notIncludeDeepMembers([{a: 12}, 'kvalo', {b:{c: 3}}], [{a: 12}, {b:{c: 'three'}}])
		})

		it('`.includeOrderedMembers` should verify a superset in the same order begginning with the first element', function () {
			// THE VERIFICATION STARTS AT THE FIRST ELEMENT
			assert.includeOrderedMembers([1,2,3,'four'], [1,2,3], 'four is not in the subset, but all other values are in the same order')
			// assert.includeOrderedMembers([1,'str',3], ['str',3]) // will not work, because 'str' is not the first element in the superset
		})

		it('`.notIncludeOrderedMembers` should verify a not superset in any order by the first element', function () {
			assert.notIncludeOrderedMembers([1,2,'str'], [2,'str'], '2 is not the beginning at superset')
			assert.notIncludeOrderedMembers([1,2,3,'str'], [1,2,'str'])
			assert.notIncludeOrderedMembers([1,2,3,'str'], [1,3,2])
		})

		it('`.includeDeepOrderedMembers` should verify deeply an ordered subset', function () {
			assert.includeDeepOrderedMembers([1,2,{a:'k'},2,3,1], [1,2,{a:'k'}])
		})

		it('`.notIncludeDeepOrderedMembers` should verify a not subset deeply ordered', function () {
			assert.notIncludeDeepOrderedMembers([{a:{b: ['one']}}, {b:['one']}], [{a:{b:['one']}}, {b:[1]}])
		})

		it('`.ifError` should rethrow an error', function () {
			const msg = 'I am a custom error'
			const err = new Error(msg)
			assert.throws(() => {assert.ifError(err)}, Error, msg)
		})

		it('`.isExtensible` should verify if the object is extensible', function () {
			const obj = {a: 12, b: 'str'}
			assert.isExtensible(obj)
			assert.isExtensible({})
			assert.isExtensible(new String('brazil'))	// eslint-disable-line no-new-wrappers
			assert.isExtensible(new Error('brazil has gone well'))
		})

		it('`.isNotExtensible` should verify if the object is not extensible', function () {
			const obj = Object.preventExtensions({a: 12, b: 'str'})
			assert.isNotExtensible(obj)
			assert.isNotExtensible(1)
			assert.isNotExtensible(true)
		})

		it('`.isSealed` should verify if the object is sealable', function () {
			const obj = Object.seal({a: 12, b: 'str'})
			assert.isSealed(obj)
			assert.isSealed(123)
			assert.isSealed(false)
		})

		it('`.isNotSealed` should verify if the object is not sealable', function () {
			const obj = {a: 12, b: 'str'}
			assert.isNotSealed(obj)
			assert.isNotSealed({})
			assert.isNotSealed(new Error('custom error'))
		})

		it('`.isFrozen` should verify if the object is frozen', function () {
			const obj = Object.freeze({a:12, b:'str'})
			assert.isFrozen(obj)
			assert.isFrozen(123)
		})

		it('`.isNotFrozen` should verify if the object is frozen', function () {
			const obj = {a:12, b:'str'}
			assert.isNotFrozen(obj)
			assert.isNotFrozen({})
			assert.isNotFrozen(new Error('An unfrozen error'))
		})

		it('`.isEmpty` should verify if the object is empty, that is, has no elements', function () {
			assert.isEmpty({})
			assert.isEmpty([])
			assert.isEmpty('')
			assert.isEmpty(new Map([]))
		})

		it('`.isNotEmpty` should verify if the object is not empty, that is, has elements', function () {
			assert.isNotEmpty({a: 12})
			assert.isNotEmpty([1,2,3,'four'])
			assert.isNotEmpty('brazil')
			assert.isNotEmpty(new Map([['place', 'brazil']]))
		})
	})

	describe('Functions utils', function () {
		it('`.fail` should throw and `.throw` should catch it', function () {
			assert.throw(() => assert.fail('errored'), 'errored')
			const message = 'It should throws a failure'
			assert.throw(function () {throw new Error(message)}, message)
		})

		it('`.changes` should verify if a function changes an object property', function () {
			let obj = {a: 12, b: 'unchangeble'}
			const fn = () => {obj.b = 'brazil'}

			assert.changes(fn, obj, 'b')

			obj = {b: 'doze'}
			assert.changes(fn, obj, 'b')
		})

		it('`.changesBy` should verify if a function changed an object property by a delta', function () {
			let obj = {a: 12, b: 'unchangeble'}
			const sub2 = () => {obj.a -= 2}

			assert.changesBy(sub2, obj, 'a', -2)	// delta value
		})

		it('`.doesNotChange` should verify if a function does not change an object property', function () {
			let obj = {a: 12, b: 'unchangeble'}
			const sub2 = () => {obj.a -= 2}

			assert.doesNotChange(sub2, obj, 'b')	// `a` was changed, but `b` not
		})

		it('`.changesButNotBy` should verify if a function does not change an object property to a specific delta', function () {
			const obj = {a: 12, b: 'unchangeble', c: 127}
			const sub2 = () => {obj.a -= 2}
			const plusAndRet = () => {obj.c += 3; return obj.c + 1}

			// that is, the `obj.a` changed 2 amounts, but not 3 amounts
			assert.changesButNotBy(sub2, obj, 'a', 3)	// delta value
			assert.changesButNotBy(plusAndRet, obj, 'c', 4)
		})

		it('`.increases` should verify if a function increases a numeric property', function () {
			const obj = {str: 'brazil', b: 127}
			const plus = () => {obj.b += 2}

			assert.increases(plus, obj, 'b')
		})

		it('`.increasesBy` should verify if a function increases a numeric value to a delta', function () {
			const obj = {str: 'brazil', b: 126}
			const plus = () => {obj.b += 2}

			assert.increasesBy(plus, obj, 'b', 2)
		})

		it('`.doesNotIncrease` should verify if a function does not increase a value', function () {
			const obj = {str: 'brazil', b: 126}
			const plus = () => {obj.str = 'string'; return obj.b + 3}

			assert.doesNotIncrease(plus, obj, 'b')
		})

		it('`.increasesButNotBy` should verify if the function increases a value, but not to a delta', function () {
			const obj = {str: 'brazil', b: 126, k: 12}
			const plus = () => {obj.b += 3}

			assert.increasesButNotBy(plus, obj, 'b', 2)
		})

		it('`.decreases` should verify if the function decreases a numeric property', function () {
			const obj = {str: 'brazil', b: 126, k: 12}
			const dec = () => {obj.b -= 3}

			assert.decreases(dec, obj, 'b')
		})

		it('`.decreasesBy` should verify if the function decreases a numeric property to a delta', function () {
			const obj = {str: 'brazil', b: 126, k: 12}
			const dec = () => {obj.b -= 3}

			assert.decreasesBy(dec, obj, 'b', 3)
		})

		it('`.doesNotDecrease` should verify if the function does not decrease a numeric property', function () {
			const obj = {str: 'brazil', b: 126, k: 12}
			const dec = () => {obj.str += 'other'}

			assert.doesNotDecrease(dec, obj, 'b')
		})

		it('`.doesNotDecreaseBy` should verify if the function does not decrease a numeric property a certain delta', function () {
			this.retries(3)
			const obj = {str: 'brazil', b: 126, k: 12}
			const dec = () => {Math.random () > 0.9 ? obj.b -= 7 : obj.b += 7}

			assert.doesNotDecrease(dec, obj, 'b', 7)
		})

		it('`.decreasesButNotBy` should verify if the function decreases a numeric property but not to a certain delta', function () {
			this.retries(3)
			const obj = {str: 'brazil', b: 126, k: 12}
			const dec = () => {Math.random () > 0.95 ? obj.b -= 7 : obj.b -= 6}

			assert.decreasesButNotBy(dec, obj, 'b', 7)
		})
	})
})