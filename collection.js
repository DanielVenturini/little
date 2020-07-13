const deepEql = require('deep-equal')
const type = require('type-detect')

class Collection {

	/**
	 * A collection class that allows to operate in it
	 * 
	 * @param {string} collection The collection name
	 * @param {Little} little several utils functions are in the Little object
	 */
	constructor (collection, little) {
		this.db = little.db
		this.collection = collection
		this.DBVALUE = little.DBVALUE
		this.little = little
	}

	/**
	 * Creates a new collection. This method must be called only from Collection.insert(), where there is warranty that there is no the `collection`.
	 * 
	 * @private
	 */
	_createCollection () {
		const newCollection = {[this.collection]: []}
		// if `db` already exists, it migth contains others collections. Then, join those with `newCollection`
		if (this.little._dbExists(this.db)) this.DBVALUE[this.db] = Object.assign(this.DBVALUE[this.db], newCollection)
		else this.DBVALUE[this.db] = newCollection
	}

	/**
	 * Verifies if collection `collection` exists in `DBVALUE`.`db`
	 * 
	 * @param {string} collection 
	 * @private
	 * @returns {boolean} indicates if the `db`.`collection` exists
	 */
	_collectionExists () {
		return this.little._dbExists(this.db) ? !!this.DBVALUE[this.db][this.collection] : false
	}

	/**
	 * Inserts the `value` in the collection
	 * 
	 * @param {any} value The value to be inserted
	 */
	insert (value) {
		if (value === undefined || value === null) return

		if (!this._collectionExists()) this._createCollection()
		this.DBVALUE[this.db][this.collection].push(value)
	}

	/**
	 * Inserts several `values` in the collection
	 * 
	 * @param {Array} values The values to be inserted.
	 */
	insertMany (values) {
		if (values instanceof Array) for (const value of values) this.insert(value)
	}

	/**
	 * Returns the number of documents in this collection
	 * 
	 * @returns number
	 */
	get length () {
		return this._collectionExists(this.collection) ? this.DBVALUE[this.db][this.collection].length : 0
	}

	/**
	 * Returns the value if it was wrapped
	 * 
	 * @param {any} value The binding that wrappes the value
	 * @example .wrappedValue (new String('brazil')) -> 'brazil'
	 * @private
	 * @returns {any} value wrapped or the object
	 */
	_wrappedValue (value) {
		return value instanceof Number
					|| value instanceof String
					|| value instanceof Boolean ? value.valueOf() : value
	}

	/**
	 * Verify if the query and document match
	 * 
	 * @param {any} query The query to search
	 * @param {any} document The document to match
	 * @param {boolean} strictList (default:false) If there are list comparations, query:[1] document:[1,2,3] will be equal, because query[0] === document[0]. If you do not want this comparation, set this param to true.
	 * @example ._match({a:10}, {a:10, b:20}) -> true
	 * @private
	 * @return {boolean}
	 */
	_match (query, document, strictList = false) {
		query = this._wrappedValue(query)
		document = this._wrappedValue(document)

		if (typeof query !== typeof document) return false
		if (deepEql(query, document)) return true	// for strict values comparations
		if (typeof query !== 'object' || type(query) === 'RegExp') return false

		// comparation with list should be strict
		if (strictList && query instanceof Array)
		/* istanbul ignore else */
			if (!(document instanceof Array) || query.length !== document.length) return false

		for (const key of Object.keys(query))
			if (!this._match(query[key], document[key], strictList)) return false

		return true	// all keys in the query match with document
	}

	/**
	 * Find one document in this collection from the `pos` position
	 * 
	 * @param {any} query The document to be searched
	 * @param {boolean} strictList (default:false) If there are list comparations, query:[1] document:[1,2,3] will be equal, because query[0] === document[0]. If you do not want this comparation, set this param to true.
	 * @param {number} pos The start position of search
	 * @returns {object} object with the position and the document
	 */
	findOne (query, strictList = false, pos = 0) {
		for (; pos < this.length; pos ++) {
			const document = this.DBVALUE[this.db][this.collection][pos]

			if (this._match(query, document, strictList)) return {pos, document}
		}
	}

	/**
	 * Find all documents that match with query
	 * 
	 * @param {object} query The document to be searched
	 * @param {boolean} strictList (default:false) If there are list comparations, query:[1] document:[1,2,3] will be equal, because query[0] === document[0]. If you do not want this comparation, set this param to true.
	 * @returns {array} array in each position one document and its position inside the collection
	 */
	find (query, strictList = false) {
		let pos = 0
		const res = []

		// eslint-disable-next-line no-constant-condition
		while (true) {
			const document = this.findOne(query, strictList, pos)
			if (!document) break

			res.push(document)
			pos = document.pos + 1
		}

		return res
	}

	/**
	 * Iterates in all documents in the collection
	 */
	[Symbol.iterator] () {
		return {
			pos: 0,
			collection: this.DBVALUE[this.db][this.collection],
			next () {
				while (this.pos < this.collection.length) return {done: false, value: this.collection[this.pos ++]}

				return {done:true}
			}
		}
	}
}

module.exports = Collection