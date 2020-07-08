const fs = require('fs')
const {assert} = require('chai')
const Little = require('../little')
const {dbpath, createValidDbFile, deletedbpath} = require('./common')
const Collection = require('../collection')

const dbpathtestopen = './testdbvaluetestopen'
var db	// eslint-disable-line no-var

/**
 * Creates a JSON object to test the `._openDB` function
 */
function createTestFile () {
	return new Promise(function (resolve) {
		const file = fs.createWriteStream(dbpathtestopen)
		file.on('ready', function () {
			file.write('{"a":10,"b":[1,2,3],"c":"brazil"}')
			file.close()
			resolve()
		})
	})
}

describe('Little specification', function () {
	before(function () {
		deletedbpath()
		createTestFile()
		db = new Little(dbpath)	// eslint-disable-line
	})

	describe('private interfaces', function () {

		it('`new` should return a Little object', function () {
			assert.isObject(db)
			assert.instanceOf(db, Little)
		})

		it('`._existsFile` should only returns a boolean value', function () {
			const resp1 = db._existsFile()	// testing to `dbpath`, and it should does not exist
			assert.isBoolean(resp1)
			assert.isFalse(resp1)

			const resp2 = db._existsFile.call({dbpath: '/dev/null'})	// this file should exists
			assert.isBoolean(resp2)
			assert.isTrue(resp2, 'Probably, you should run the test script from the parent dir (../)')
		})

		it('`._getJson` should return a JSON object from a string', function () {
			const string = '{"a": 10, "b": [1,2,3], "c":"brazil"}'
			const obj = {a: 10, b: [1,2,3], c:"brazil"}
			const resp = db._getJson(string)

			assert.isObject(resp)
			assert.deepEqual(resp, obj)
		})

		it('`._getText` should return a string from an object', function () {
			const string = '{"a":10,"b":[1,2,3],"c":"brazil"}'
			const obj = {a: 10, b: [1,2,3], c:"brazil"}
			const resp = db._getText.call({DBVALUE: obj})

			assert.exists(resp)
			assert.isString(resp)
			assert.equal(resp, string)
		})

		it('`._open` should open an file and return its content as a Buffer', function () {
			const resp = db._open.call({dbpath: '/dev/null'})

			assert.exists(resp)
			assert.instanceOf(resp, Buffer)	// eslint-disable-line no-undef
		})

		it('`._getString` should return a string from a Buffer', function () {
			const str = 'brazil'
			const buffer = Buffer.from(str)	// eslint-disable-line no-undef
			const resp = db._getString(buffer)

			assert.exists(resp)
			assert.isString(resp)
			assert.equal(str, resp)
		})

		it('`._isThereDbs` should return if there is any dbs', function () {
			assert.isFalse(db._isThereDbs())
			assert.isTrue(db._isThereDbs.call({DBVALUE: {'1': 1}}))
		})

		it('`._dbExists` should verifies if `db` exists', function () {
			const DBVALUE = {'dbtest': 123}
			assert.isFalse(db._dbExists.call({db: 'brazil', DBVALUE}))
			assert.isTrue(db._dbExists.call({db: 'dbtest', DBVALUE}))
		})

		it('`._isThereCollections` should verifies if there is any collections in `db`', function () {
			const DBVALUE = {'dbtest': {'collection1': [123]}}
			assert.isFalse(db._isThereCollections.call(Object.assign(db, {db: 'dbtest', DBVALUE: {}})), 'there is not database')
			assert.isFalse(db._isThereCollections.call(Object.assign(db, {db: 'dbnotexists', DBVALUE})), 'database does not exist')
			assert.isTrue(db._isThereCollections.call(Object.assign(db, {db: 'dbtest', DBVALUE})))
		})

		it('`._getDBs` should returns a list of databases', function () {
			const DBVALUE = {'dbtest': {'collection1': [123]}}
			assert.isArray(db._getDBs.call(Object.assign(db, {DBVALUE: {}})))
			assert.isEmpty(db._getDBs.call(Object.assign(db, {DBVALUE: {}})))

			assert.isArray(db._getDBs.call(Object.assign(db, {DBVALUE})))
			assert.deepEqual(db._getDBs.call(Object.assign(db, {DBVALUE})), ['dbtest'])
		})

		it('`._validName` should validates correctly a name', function () {
			assert.isFalse(db._validName(''))
			assert.isFalse(db._validName('1brazil'))
			assert.isFalse(db._validName('_brazil'))
			assert.isFalse(db._validName('.brazil'))
			assert.isTrue(db._validName('b'))
			assert.isTrue(db._validName('b1234_.'))
			assert.isTrue(db._validName('b_____.'))
			assert.isTrue(db._validName('BRA__ZIL...'))
		})

		describe('`#._openDB` method', function () {
			it('`._openDB` should open a file and return a JSON', function () {
				const obj = {a: 10, b: [1,2,3], c:"brazil"}
				const changedThis = Object.assign(db, {dbpath: dbpathtestopen})
				const resp = db._openDB.call(changedThis)
				assert.exists(resp)
				assert.deepEqual(resp, obj)
			})

			it('`._openDB` should return a JSON when the file does not exist', function () {
				const changedThis = Object.assign(db, {dbpath: dbpathtestopen + 'doesnotexist'})
				const resp = db._openDB.call(changedThis)

				assert.exists(resp)
				assert.isObject(resp)
				assert.deepEqual(resp, {})
			})

			it('`._openDB` should throws an error for a non-json file', function () {
				const changedThis = Object.assign(db, {dbpath: '/dev/null'})
				assert.throw(function () {db._openDB.call(changedThis)}, 'Unexpected end of JSON input')
			})
		})

		after(function () {deletedbpath(dbpathtestopen)})
	})

	describe('create the DBVALUE', function () {
		beforeEach(function () {
			// delete the dbpath
			deletedbpath()
		})

		it('`_createFile` should create the `dbpath` and return a WriteStream', function () {
			const resp = db._createFile.call({dbpath})
			assert.exists(resp)
			assert.instanceOf(resp, fs.WriteStream)
			assert.isTrue(fs.existsSync(dbpath))
		})

		it('`.close` should create the `dbpath` file')
		it('`.save` should create the `dbpath` file')
	})

	describe('public interfaces', function () {
		before(function () {
			deletedbpath()
			createValidDbFile()
			.then(function () {
				db = new Little(dbpath)	// creates a new instance
			})
		})

		it('`.use` should changes to a database (the database may exists or not)', function () {
			const notexists = 'dbnotexists'
			const exists = 'names'

			db.use(notexists)
			assert.equal(db.db, notexists)

			db.use(exists)
			assert.equal(db.db, exists)
		})

		it('`.use` to a new database should not create it until a new document will be inserted', function () {
			const notexists = 'dbnotexists'
			db.use('dbnotexists')
			assert.notInclude(db._getDBs(), notexists)
		})

		it('`.show_dbs` should print something or return a string', function () {
			const resp1 = db.show_dbs()
			const resp2 = db.show_dbs(true)

			assert.notExists(resp1)
			assert.equal(resp2, 'names\nperson\nage')
			assert.equal(db.show_dbs.call(Object.assign(db, {DBVALUE: {dbunique: ''}}), true), 'dbunique', 'when there is only one db')
		})

		it('`.show_collections` should prints something or returns a string', function () {
			assert.notExists(db.show_collections())
			assert.equal(db.show_collections(true), '')
			assert.equal(db.show_collections.call(Object.assign(db, {db: 'names', DBVALUE: {names: {col1: [1]}}}), true), 'col1')
			assert.equal(db.show_collections.call(Object.assign(db, {db: 'names', DBVALUE: {names: {col1:[1],col2:[1]}}}), true), 'col1\ncol2')
		})

		it('`.collection` should return undefined when the `db` is not setted', function () {
			assert.isUndefined(db.collection.call(Object.assign(db, {db: undefined})))
		})

		it('`.collection` should return a Collection object even when there is not that collection or database', function () {
			db.use('dbnotexists')
			assert.instanceOf(db.collection('collectionnotexists'), Collection)

			db.use('names')
			assert.instanceOf(db.collection('collectionnotexists'), Collection)
			assert.instanceOf(db.collection('city'), Collection)
		})
	})

	after(function () {
		deletedbpath()
		deletedbpath(dbpathtestopen)
	})
})