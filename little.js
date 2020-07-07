const fs = require('fs')
const Collection = require('./collection')

class Little {
	/**
	 * A very simple non-relacional database. All content come from a file called DBVALUES.json.
	 *
	 * @example new Little().use('mydb').collection('mycollection').insertOne({key: value})
	 * 
	 * @param {string} db OPTIONAL the database you want to connect. Also, you can use later `.use('db')`.
	 * @param {string} dbpath OPTIONAL the path to DBVALUES.json, if you want a other path. (`./DBVALUES.json` default)
	 */
	constructor (db, dbpath = './DBVALUES.json') {
		this.db = db
		this.dbpath = dbpath
		this.DBVALUE = this._openDB()
	}

	/**
	 * Verify if the `dbpath` file exists
	 * 
	 * @returns boolean
	 */
	_existsFile () {
		return fs.existsSync(this.dbpath)
	}

	/**
	 * Parses the `text` as a JSON
	 * @param {string} str The string to be parsed as a JSON. Default, it will be the string file `dbpath`.
	 * @returns JSON
	 */
	_getJson (text) {
		return JSON.parse(text)
	}

	/**
	 * Parses the `DBVALUE` into a string
	 */
	_getText () {
		return JSON.stringify(this.DBVALUE)
	}

	/**
	 * This function open the `dbpath` and return as a `Buffer`
	 * @returns Buffer
	 */
	_open () {
		return fs.readFileSync(this.dbpath)
	}

	/**
	 * Convertes a buffer into a string
	 * 
	 * @param buffer The buffer object
	 * @returns string
	 */
	_getString (buffer) {
		return new String(buffer)	// eslint-disable-line
	}

	/**
	 * Open the `dbpath` and return it as a JSON. It the file `dbpath` does not exists, it will be create by the methods .save() or .close()
	 * @returns JSON
	 */
	_openDB () {
		if (this._existsFile()) {
			const buffer = this._open()
			const text = this._getString(buffer)
			return this._getJson(text)
		} else {
			return {}	// the file will be create by the methods .save() or .close()
		}
	}

	/**
	 * Creates the `dbpath`
	 * @returns WriteStream
	 */
	_createFile () {
		return fs.createWriteStream(this.dbpath)
	}
	
	/**
	 * Verifies if there is any database in the `DBVALUE`
	 * @returns boolean
	 */
	_isThereDbs () {
		return !!Object.keys(this.DBVALUE).length
	}
	
	/**
	 * Verifies if database `db` exists in `DBVALUE`
	 * @returns boolean
	 */
	_dbExists () {
		return Object.keys(this.DBVALUE).includes(this.db)
	}
	
	// eslint-disable-next-line no-unused-vars
	_isThereCollections (collection) {
		if (!this._isThereDbs()) return false
		if (!this._dbExists()) return false
		return !!Object.keys(this.DBVALUE[this.db][collection] || {}).length
	}

	/**
	 * Returns all databases in `DBVALUE`
	 * 
	 * @returns list
	 */
	_getDBs () {
		if (!this._isThereDbs()) return []
		else return Object.keys(this.DBVALUE)
	}

	/**
	 * Shows all databases
	 * @param {boolean} ret (default: false) If false, the databases will be printeds. If true, the databases will be returned as string with `\n` among them.
	 * @returns string (ret=true)
	 */
	show_dbs (ret=false) {
		let dbs = this._getDBs()

		// returns or prints
		if (!dbs.length) return ret ? '' : console.log('')

		dbs = dbs.reduce((prev, curr) => prev + '\n' + curr)

		return ret ? dbs : console.log(dbs)
	}

	/**
	 * Shows all collections for the `db`.
	 * @param {boolean} ret (default: false) If false, the collections will be printed. If true, the collections will be returned as string with `\n` among them.
	 * @returns string (ret=true)
	 */
	show_collections (ret=false) {
		if (!this._isThereCollections()) return ret ? '' : undefined

		let coll = Object.keys(this.DBVALUE[this.db])
		coll = coll.reduce((prev, curr) => prev + '\n' + curr)
		if (ret) return coll
		else console.log(coll)
	}

	/**
	 * Gets an object Collection to operates upon the collection `collection`. If the collection (or database) does not exist, it will be create when a registry will be inserted.
	 * @param {string} collection 
	 * @returns Collection
	 */
	collection (collection) {
		if (!this._validName(this.db) || !this._validName(collection)) return undefined
		return new Collection(this.db, collection, this.DBVALUE)
	}

	/**
	 * Validates a database/collection name. It must starts with a word followed by word, underline `_`, number or dot `.`
	 * @param {string} dbName
	 * @return boolean
	 */
	_validName (name) {
		if (name === undefined || name === null || name === '') return false
		return !!/^[a-zA-Z][\w._]*$/.exec(name)
	}

	/**
	 * Changes the default database that you are manipulating. It the database does not exists, then it will be created when one document will be inserted in its new collection, that will be created, too.
	 * @param {string} db The database name. It must starts with a word followed by word, underline `_`, number or dot `.`
	 */
	use (db) {
		if (this._validName(db)) this.db = db
		else this.db = undefined
	}

	save () {
		//
	}

	close () {
		//
	}

	// iterator
	[Symbol.iterator] (collection, query) {
		return {
			db: this.db,
			collection: collection,
			query: query,
			pos: 0,
			next () {}
		}
	}
}

module.exports = Little
