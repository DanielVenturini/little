const {assert} = require('chai')
const Little = require('../little')

const {createValidDbFile, dbpath, deletedbpath} = require('./common')
var db	// eslint-disable-line no-var
var collection	// eslint-disable-line no-var

describe('Collection specifications', function () {
	before(function () {
		createValidDbFile()
		.then(function () {
			db = new Little(dbpath)
			db.use('names')
			collection = db.collection('city')	// eslint-disable-line no-unused-vars
		})
	})

	it('`._createCollection` should create a new collection', function () {
		
		let col1 = 'coll1'
		db.use('db')
		db.collection(col1)._createCollection()
		assert.deepNestedInclude(db.DBVALUE, {['db.'+col1]: []}, 'db exists and collection not')

		let col2 = 'coll2'
		db.collection(col2)._createCollection()
		assert.deepNestedInclude(db.DBVALUE, {['db.'+col1]: []}, 'db exists and there is collection there')
		assert.deepNestedInclude(db.DBVALUE, {['db.'+col2]: []}, 'db exists and there is collection there')

		db.use('dbnotexists0')
		db.collection('coll1')._createCollection()
		assert.deepNestedInclude(db.DBVALUE, {'dbnotexists0.coll1': []}, 'should creates a db and a collection')
	})

	it('`._collectionExists` should verifies corectly if `collections` exists in `db`', function () {
		db.use('names')
		assert.isTrue(db.collection('city')._collectionExists(), '`db` exists and `collection` too')
		assert.isFalse(db.collection('colnotexists')._collectionExists(), '`db` exists but `collection` not')

		db.use('dbnotexists10')
		assert.isFalse(db.collection('x')._collectionExists(), '`db` does not exist and `collection` does not mean')
	})

	it('`.length` should return the number of documents', function () {
		db.use('names')
		assert.equal(db.collection('city').length, 5)
		assert.equal(db.collection('countries').length, 5)

		db.use('person')
		assert.equal(db.collection('children').length, 2)
		assert.equal(db.collection('adult').length, 3)

		db.use('age')
		assert.equal(db.collection('colnotexists').length, 0, 'db exists but collection not')
		db.use('dbnotexists')
		assert.equal(db.collection('colnotexists').length, 0, 'db not exists')

		db.use('names')	// default db in the test
	})

	it('`.insert` should insert new values and create new collection, if it needs', function () {
		const pos = collection.length
		const obj = {key: 'map'}

		collection.insert()
		collection.insert(null)
		assert.equal(collection.length, pos, 'should not insert those values')

		collection.insert(obj)
		assert.equal(collection.length, pos + 1, 'must have a new length')

		const keyNested = 'names.city[' + pos + ']'
		assert.deepNestedInclude(db.DBVALUE, {[keyNested]: obj}, 'must insert correctly')

		db.use('person')
		db.collection('newcol1').insert(obj)
		assert.equal(db.collection('newcol1').length, 1)
		assert.deepNestedInclude(db.DBVALUE, {'person.newcol1[0]': obj}, 'collection does not exists')

		db.use('dbnotexists1')
		db.collection('colnotexists').insert(obj)
		assert.equal(db.collection('colnotexists').length, 1)
		assert.deepNestedInclude(db.DBVALUE, {'dbnotexists1.colnotexists[0]': obj}, 'db and collection does not exists')
	})

	it('`.insertMany` should insert several values', function () {

		const pos = collection.length
		const obj1 = {key: 'map1'}
		const l = [1,2,3,obj1,'brazil']

		collection.insertMany(obj1)
		collection.insertMany()
		collection.insertMany(null)
		collection.insertMany(123)
		collection.insertMany([])
		assert.equal(collection.length, pos, 'those values must not be inserted')

		collection.insertMany(l)
		assert.equal(collection.length, pos + l.length)
	})

	it('`._wrappedValue` should get the value wrapped, if it really was wrapped', function () {
		/* eslint-disable no-new-wrappers */
		assert.notEqual(/ap+o/, collection._wrappedValue(new RegExp(/ap+o/)), 'regexp always will be not equals')
		assert.equal('apo', collection._wrappedValue(new String('apo')))
		assert.equal(true, collection._wrappedValue(new Boolean(true)))
		assert.equal(12, collection._wrappedValue(new Number(12)))
		/* eslint-enable no-new-wrappers */

		// ._wrappedValue must do nothing here
		const obj = {a: 12, b: 'str'}
		const list = [1,2,3,obj]
		assert.equal(obj, collection._wrappedValue(obj))
		assert.equal(list, collection._wrappedValue(list))
	})

	it('`._match` should verify if two values match', function () {
		// should pass
		assert.isTrue(collection._match(1, 1))
		assert.isTrue(collection._match('1', '1'))
		assert.isTrue(collection._match('brazil', 'brazil'))
		assert.isTrue(collection._match([1,2], [1,2]))
		assert.isTrue(collection._match([1,2], [1,2,3]), 'document contains all query values')	// it should be false with strictList:true
		assert.isTrue(collection._match([1,'2'], [1,'2',3]))	// it should be false with strictList:true
		assert.isTrue(collection._match({a: 10}, {a:10}))
		assert.isTrue(collection._match({a: 10}, {a:10, b: 12}), 'document with more values than query')
		assert.isTrue(collection._match([{a: 10}], [{a:10}, 12]))
		assert.isTrue(collection._match({a: [1,2]}, {a:[1,2,3], b:12}))
		assert.isTrue(collection._match({a: {b: {c: {d: [12, {b: 12}, 25]}}}}, {a: {b: {c: {d: [12, {b: 12}, 25]}}}}), 'object a little bit more complex')
		assert.isTrue(collection._match({a: {b: {c: {d: [12, {b: 12}]}}}}, {a: {b: {c: {d: [12, {b: 12}, 25]}}}}), 'object a little bit more complex with different list')

		// should fail
		assert.isFalse(collection._match(1, 2))
		assert.isFalse(collection._match('1', 1))
		assert.isFalse(collection._match('bra', 'zil'))
		assert.isFalse(collection._match([1,2], [1,3]))
		assert.isFalse(collection._match([1,2], [1,2,3], true))
		assert.isFalse(collection._match([1,'2'], [1,'2',3], true))
		assert.isFalse(collection._match({a: 10}, {a:11}))
		assert.isFalse(collection._match({a: 10, c:12}, {a:10, b: 12}), 'query should not match because has a value that document does not have')
		assert.isFalse(collection._match({a: [1,2]}, {a:[1,2,3], b:12}, true))
		assert.isFalse(collection._match([{a: 10}], [{a:10}, 12], true))
		assert.isFalse(collection._match({a: {b: {c: {d: [12, {b: 12}, 25]}}}}, {a: {b: {c: {d: [12, {d: 12}, 25]}}}}), 'object a little bit more complex')
		assert.isFalse(collection._match({a: {b: {c: {d: [12, {b: 12}]}}}}, {a: {b: {c: {d: [12, {b: 12}, 25]}}}}, true), 'object a little bit more complex with different list')
	})

	it('`.findOne` should correctly find the values', function () {
		const n = 1e10
		const str = 'stringValue'
		const regexp = /^[A-Za-z][\w._]*$/
		const list = [1,n,str,2,3]
		const obj = {n, str, regexp, list}
		collection.insertMany([n, str, regexp, list, obj])

		assert.deepPropertyVal(collection.findOne(n), 'document', n)

		// eslint-disable-next-line no-new-wrappers
		assert.propertyVal(collection.findOne(new String(str)), 'document', str, 'wrapper creates a new object')
		assert.propertyVal(collection.findOne(str), 'document', str)

		let resp = collection.findOne(regexp)
		assert.exists(resp)
		assert.propertyVal(resp, 'document', regexp)

		assert.propertyVal(collection.findOne(list), 'document', list)
		assert.propertyVal(collection.findOne(new Array(1, n, str, 2, 3)), 'document', list, 'array from wrapper')
		assert.propertyVal(collection.findOne([1, n, str]), 'document', list, 'a piece of array')
		assert.propertyVal(collection.findOne(obj), 'document', obj)
		assert.propertyVal(collection.findOne({n, list}), 'document', obj, 'a piece of object')
	})

	it('`.find` should correctly find the values inserted previously', function () {
		collection.insert({name:'brazil', age:10, money:20})
		collection.insert({name:'brazil', age:20, money:20})
		collection.insert({name:'korea', age:34, money:29})
		collection.insert({name:'kingdom', age:20, money:29})
		collection.insert({name:'kingdom', age:23, money:23})
		collection.insert({name:'peru', age:20, money:32})
		collection.insert({name:'peru', age:20, money:30})
		collection.insert({name:'peru', age:21, money:32})

		assert.lengthOf(collection.find('sao paulo'), 1)
		assert.lengthOf(collection.find({name:'brazil'}), 2)
		assert.lengthOf(collection.find({name:'brazil', money:20}), 2)
		assert.lengthOf(collection.find({name:'peru', money:32}), 2)
		assert.lengthOf(collection.find({age: 20}), 4)
		assert.lengthOf(collection.find({age: 20, name:'peru'}), 2)
		assert.lengthOf(collection.find({name:'notexists'}), 0)
	})

	it('`iterator` should creates an iterator function', function () {
		const length = collection.length
		const iterator = collection[Symbol.iterator]()

		for (let i = 0; i < length; i ++) {
			const value = iterator.next()
			assert.propertyVal(value, 'done', false)
			assert.exists(value.value)
		}

		const theLastValue = {last: 'itshouldcontains'}
		collection.insert(theLastValue)

		assert.lengthOf(iterator.collection, length + 1, 'a new document was inserted')
		db.use('names')
		assert.lengthOf(db.collection('city'), length + 1)

		// theLastValue
		let value = iterator.next()
		assert.propertyVal(value, 'done', false)
		assert.exists(value.value)

		value = iterator.next()
		assert.propertyVal(value, 'done', true, 'there are no more values in iterator')
		assert.notExists(value.value)
	})

	after(deletedbpath)
})