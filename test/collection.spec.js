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
		assert.equal(collection.length, pos, 'values that must not be inserted')

		collection.insertMany(l)
		// console.log(pos)
		assert.equal(collection.length, pos + l.length)
	})

	after(deletedbpath)
})