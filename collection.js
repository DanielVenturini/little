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
	 * Inserts the `value` in the collection
	 * 
	 * @param {any} value The value to be inserted
	 */
	insert (value) {
		if (value === undefined || value === null) return

		if (!this.little._collectionExists(this.collection)) this.little._createCollection(this.collection)
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
		if (!this.little._collectionExists(this.collection)) return 0
		else return this.DBVALUE[this.db][this.collection].length
	}

	find (query) {

	}

	findOne (query) {

	}
}

module.exports = Collection