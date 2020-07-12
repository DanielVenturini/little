/* eslint-disable max-classes-per-file */

const {assert} = require('chai')

describe('Assert', function () {
	describe('base', function () {
		it('this case should be pending')
		it('`assert` function', function () {
			const first = 1
			const second = first + 2
			assert(first !== second, `${first} should be different from ${second}`)
		})

		it('`.fail` should  throws and `.throw` should catch it', function () {
			const message = 'It should throws a failure'
			assert.throw(function () {throw new Error(message)}, message)
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
			assert.deepEqual({daniel}, {daniel: daniel})
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
			class MyErr {constructor () {}}	// eslint-disable-line no-empty-function
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
			const f = () => arguments
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
			assert.isNumber(parseInt('100', 2))
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

	describe('#is* to numbers', function () {
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

		it('`.instanceOf` should verifies the constructor instance', function () {
			class Ventu extends Error {constructor () {super()}}
			assert.instanceOf(new Ventu(), Error)
			assert.instanceOf(new String('brazil'), Object)	// eslint-disable-line
			// assert.instanceOf('brazil', String)	// it does not work
			assert.instanceOf(new Number(Infinity), Number)	// eslint-disable-line
			assert.instanceOf(new Number(23), Number)	// eslint-disable-line
		})

		it('`.notInstanceOf` should verifies with others constructor instance', function () {
			assert.notInstanceOf('brazil', String)
			assert.notInstanceOf('brazil', Object)
			assert.notInstanceOf(12, Number)
			assert.notInstanceOf(12, Object)
			assert.notInstanceOf(true, Boolean)
		})

		it('`.include` should verifies the values inside an object', function () {
			// it is different from `.property` because it works with string and list
			const l = [1,2,3, {a: 12}]
			const str = 'brazil'
			const obj = {prop1: 'val1', prop2: 'val2'}
			assert.include(l, 3)
			assert.include(str, 'bra')
			assert.include(obj, {prop1: 'val1'})
			assert.include(obj, {toString: obj.toString})
		})

		it('`.notInclude` should verifies if the values are not in the object', function () {
			const l = [1,2,3, {a: 12}]
			const str = 'brazil'
			const obj = {prop1: 'val1', prop2: 'val2', l: l[3]}
			assert.notInclude(l, [1,2,3])
			assert.notInclude(str, 'liz')
			assert.notInclude(obj, {pro1: 'val2'})
			assert.notInclude(l, {a: 12})
			assert.notInclude(obj, {l: {a: 12}})
		})

		it('`.deepInclude` should verifies deeply the values inside an object', function () {
			const l = [1,2,3, {b: 2}]
			const obj = {prop1: 'val1', prop2: 'val2'}
			assert.deepInclude(l, {b: 2})
			assert.deepInclude(obj, {prop1: 'val1'})
		})

		it('`.notDeepInclude` should verifies if the values are not in the object', function () {
			const l = [1,2,3, {b: 2}]
			const obj = {prop1: 'val1', prop2: 'val2', l: l[3]}
			assert.notDeepInclude(l, [2, {b: 2}])
			assert.notDeepInclude(obj, {l: {b: 12}})
		})

		it('`.nestedInclude` should verifies the nested property of an object', function () {
			// properties with `.` or `[]` can be escaped using double backslashes `\\`
			const obj = {countries: {name: 'brazil', population: 1024}, '.bin': {mocha: 'mocha', '[nyc': '.nyc'}}
			assert.nestedInclude(obj, {'countries.name': 'brazil'})
			assert.nestedInclude(obj, {'\\.bin.\\[nyc': '.nyc'})
		})

		it('`.notNestedInclude` should verifies nested if the values are not in the object', function () {
			const obj = {c: {'.bin': {false: [1,2,3], true: [1,2,3], 'back]': 12}}}
			assert.notNestedInclude(obj, {'c.\\.bin.back\\]': 122})
		})

		it('`.deepNestedInclude` should verifies nested deeply if the values are on object', function () {
			const obj = {c: {'.bin': {false: [1,2,3], true: [1,2,3], 'back]': {a: 12}}}}
			assert.deepNestedInclude(obj, {'c.\\.bin.false': [1,2,3]})
			assert.deepNestedInclude(obj, {'c.\\.bin.back\\]': {a: 12}})
		})

		it('`.notDeepNestedInclude` should verifies nested deeply if the values are not in the object', function () {
			const obj = {c: {'.bin': {false: [1,2,3], true: [1,2,3], 'back]': {a: 12}}}}
			assert.notDeepNestedInclude(obj, {'c.\\.bin.back\\]': {a: 13}})
		})

		it('`.ownInclude` should verifies values in object but ignores inherited', function () {
			const obj = {c: {'.bin': {false: [1,2,3], true: 123, 'back]': {a: 12}}}}
			assert.ownInclude(obj.c['.bin'], {true: 123})
		})

		it('`.notOwnInclude` should verifies values that are not in an object or is inherited', function () {
			const obj = {c: {'.bin': {false: [1,2,3], true: 123, 'back]': {a: 12}}}}
			assert.notOwnInclude(obj, {toString: obj.toString})	// obj contains `toString`, but it is inherited
			assert.notOwnInclude(obj, {c: {'.bin': {true: 123}}})	// keys `false` and `back]` are missing, thus are not own included
		})

		it('`.deepOwnInclude` should verifies deeply the values that are in object', function () {
			const obj = {c: {'.bin': {false: [1,2,3], true: 123, 'back]': {a: 12}}}}
			assert.deepOwnInclude(obj.c, {'.bin': {false: [1,2,3], true:123, 'back]': {a: 12}}})
		})

		it('`.notDeepOwnInclude` should verifies deeply the properties that are not in an object', function () {
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

		it('`.property` should verifies a direct or inherited property', function () {
			// it is different from `.includes` because it just works with properties
			const obj = {tea: {chai: true}}
			assert.property(obj, 'tea')
			assert.property(obj, 'toString')
			assert.include(obj, {toString: obj.toString})	// the same, i think
		})

		it('`.notProperty` should verifies if a property is not in the obj', function () {
			const obj = {tea: {chai: true}}
			const l = [1,2,3, 'obj']
			assert.notProperty(obj, 'brazil')
			assert.notProperty(l, 'obj')	// `.includes` works with list
		})

		it('`.propertyVal` should verifies the property values', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.propertyVal(obj, 'str', 'str')
			assert.propertyVal(obj, 'n', 123)
		})

		it('`.notPropertyVal` should verifies if the value of a property is not a specified value', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.notPropertyVal(obj.tea, 'chai', false)
			assert.notPropertyVal(obj, 'n', undefined)
		})

		it('`.deepPropertyVal` should verifies deeply the property values', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.deepPropertyVal(obj, 'tea', {chai: true})
		})

		it('`.noDeepPropertyVal` should verifies deeply if the value of a properfy is not a specified value', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.notDeepPropertyVal(obj, 'tea', {chai: false})
		})

		it('`.nestedProperty` should verifies nested if an object has a property', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.nestedProperty(obj, 'tea.chai')
			assert.nestedProperty(obj, 'n')
		})

		it('`.notNestedProperty` should verifies nested if an object has no a specified property', function () {
			assert.notNestedProperty({a: {b: {c: {d: 1}}}}, 'a.b.c.d.e')
		})

		it('`.nestedPropertyVal` should verifies nested if an object has a specified property', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.nestedPropertyVal({a: {b: {c: {d: 1}}}}, 'a.b.c.d', 1)
			assert.nestedPropertyVal(obj, 'tea.chai', true)
			assert.nestedPropertyVal(obj, 'str[0]', 's')
		})

		it('`.notNestedPropertyVal` should verifies nested if a property has no a specified val', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.notNestedPropertyVal(obj, 'str[0]', 'g')
			assert.notNestedPropertyVal(obj, 'tea.chai', false)
		})

		it('`.deepNestedPropertyVal` should verifies deeply nested if a property has a val', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.deepNestedPropertyVal(obj, 'tea', {chai: true})
		})

		it('`.notDeepNestedPropertyVal` should verifies if a property has no a specified value', function () {
			const obj = {tea: {chai: true}, str: 'str', n: 123}
			assert.notDeepNestedPropertyVal(obj, 'n', '123')
		})

		it('`.lengthOf` should verifies the length of an object', function () {
			const obj = {a: 10, b:'k'}
			obj.length = 10
			assert.lengthOf(obj, 10, '.lengthOf verifies the `length` property')

			assert.lengthOf([1,2,3,4], 4)
			assert.lengthOf('daniel', 6)
			assert.lengthOf(new Set([1,2,3]), 3)
		})

		it('`.hasAnyKeys` should verifies if the obj has some of those keys', function () {
			assert.hasAnyKeys({a: 10, b:'k'}, ['a', 'k', 'j'])
			assert.hasAnyKeys(new Map([['a', 'value'], ['b', 12]]), ['a', 'j'])
		})

		it('`.hasAllKeys` should verifies all keys in the object', function () {
			const obj = {obj: 'key', map: 12, three: 3}
			assert.hasAllKeys(obj, ['obj', 'map', 'three'])
			// THE NEXT DOES NOT WORK, BUT IN `CONTAINS`, IT DOES
			// assert.hasAllKeys(obj, ['obj', 'map'], 'obj has more than those keys')
		})

		it('`.containsAllKeys` should verifies if the object has AT LEAST all keys', function () {
			const obj = {obj: 'key', map: 12, three: 3}
			assert.containsAllKeys(obj, ['obj', 'map', 'three'])
			assert.containsAllKeys(obj, ['obj', 'map'], 'obj should has at least all these keys')
		})

		it('`.doesNotHaveAnyKeys` should verifies if object has none of those keys', function () {
			const obj = {obj: 'key', map: 12, three: 3}
			assert.doesNotHaveAnyKeys(obj, ['object', 'mapped', 'two'], 'at least `two` is not in the `obj`')
			assert.doesNotHaveAnyKeys(obj, {objj: 12, mapped: 'three', two: 2})
		})

		it('`.doesNotHaveAnyDeepKeys` should verifies deeply if the object has none of the keys provider', function () {
			const obj = {obj: 'key', map: 12, three: 3}
			assert.doesNotHaveAnyDeepKeys(obj, ['objj', 'maped', 'two'])
			assert.doesNotHaveAnyDeepKeys(new Map([[{a:'b'}, 'kvalo']]), {a:'a'})
		})

		it('`.doesNotHaveAllKeys` should verifies if object does not have at least one of those keys', function () {
			const obj = {obj: 'key', map: 12, three: 3}
			assert.doesNotHaveAllKeys(obj, {obj: 'key', map: 12, three: 3, two: 3}, 'at least `two` is not in the obj')
			assert.doesNotHaveAllKeys(obj, ['obj', 'three'], '`map` is key but is not expected')
		})

		it('`.doesNotHaveAllDeepKeys` should verifies if the object has no at least one of the keys', function () {
			const obj = {obj: 'key', map: 12, three: 3}
			assert.doesNotHaveAllDeepKeys(obj, ['obj', 'map', 'two'])
			assert.doesNotHaveAllDeepKeys(new Map([[{a: '1'}, 12]]), {a: 1})
		})

		it('`.hasAllDeepKeys` should verifies if object has all keys deeply', function () {
			const obj = {obj: 'key', map: 12, three: 3}
			const obj2 = {[obj]: 'key', day: 7}

			assert.hasAllDeepKeys(obj, ['obj', 'map', 'three'])
			assert.hasAllDeepKeys(obj2, ['day', obj])
		})

		it('`.containsAllDeepKeys` should verifies that object contains all of the keys deeply provided', function () {
			const obj = {obj: 'key', map: 12, three: 3}
			assert.containsAllDeepKeys(obj, ['obj', 'map', 'three'])
			assert.containsAllDeepKeys(obj, ['obj', 'map'], 'obj contains at least all keys provided, but it may contains more')
			assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1,2]]), {one:'one'})
		})

	})
})