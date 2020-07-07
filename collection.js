class Collection {

	/**
	 * A collection class that allows to operate in it
	 * @param {string} collection The collection name
	 * @param {Object} DBVALUE The database value
	 */
	constructor (db, collection, DBVALUE) {
		this.db = db
		this.collection = collection
		this.DBVALUE = DBVALUE
	}

	insert (value) {

	}

	insertMany (values) {

	}

	find (query) {

	}

	findOne (query) {

	}
}

module.exports = Collection