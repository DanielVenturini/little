class Collection {

	/**
	 * A collection class that allows to operate in it
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
	 */
	_createCollection () {
		const newCollection = {[this.collection]: []}
		// if `db` already exists, it migth contains others collections. Then, join those with `newCollection`
		if (this.little._dbExists(this.db)) this.DBVALUE[this.db] = Object.assign(this.DBVALUE[this.db], newCollection)
		else this.DBVALUE[this.db] = newCollection
	}

	/**
	 * Verifies if collection `collection` exists in `DBVALUE`.`db`
	 * @param {string} collection 
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
		if (!this._collectionExists(this.collection)) return 0
		else return this.DBVALUE[this.db][this.collection].length
	}

	/**
	 * 
	 * @param {*} query 
	 * @param {*} document 
	 */
	_match (query, document) {
		if (query === document) return true // for numbers, string and hole object comparations
	}

	/**
	 * Find one document in this collection from the `pos` position
	 * @param {any} query The document to be searched
	 * @param {number} pos The start position of search
	 * @returns {object} object with the position and the document
	 */
	findOne (query, pos = 0) {
		for (; pos < this.length; pos ++) {

			const document = this.DBVALUE[this.db][this.collection][pos]
			if (typeof query !== typeof document) continue

			if (this._match(query, document)) return {pos, document}
		}
	}

	/**
	 * Find all documents that match with query
	 * 
	 * @param {object} query The document to be searched
	 * @returns {array} array in each position one document and its position inside the collection
	 */
	find (query) {
		let pos = 0
		const res = []

		// eslint-disable-next-line no-constant-condition
		while (true) {
			const document = this.findOne(query, pos)
			if (document) break

			res.push(document)
			pos = document ? document.pos : pos
		}

		return res
	}

	/**
	 * Iterates in all documents in the collection
	 */
	[Symbol.iterator] () {
		return {
			next () {}
		}
	}
}

module.exports = Collection