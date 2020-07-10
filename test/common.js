const fs = require('fs')
const {assert} = require('chai')

const dbpath = './testdbvalue'

/**
 * Creates a valid `dbpath` file to test the pbulic interfaces
 */
function createValidDbFile() {
	return new Promise(function (resolve) {
		const file = fs.createWriteStream(dbpath)
		file.on('ready', function () {
			file.write('{"names":{"city":["sao paulo","pernanbuco","rio de janeiro","curitiba","salvador"],"countries":["brazil","united states","south korea","france","kebec"]},"person":{"children":[{"name":"marcel louback","age":12,"genre":"M"},{"name":"tianha craw","age":10,"genre":"F"}],"adult":[{"name":"dan ven","age":22,"genre":"F"},{"name":"Leila Clerck","age":27,"genre":"F"},{"name":"Sin girs","age":23,"genre":"F"}]},"age":{"until":[1234,5234,5123,6422,892,1267],"after":[{"day":12},{"day":9},{"day":19},{"day":25},{"day":22}]}}')
			file.close()
			resolve()
		})
	})
}

/**
 * Deletes the `dbpath`, if it exists.
 * If not, the `fs.unlinkSync` should throws an `ENOENT`
 * 
 */
async function deletedbpath (path = dbpath) {
	try{
		await fs.unlinkSync(path)
	} catch(err) {
		assert.throw(function () {throw err}, `ENOENT: no such file or directory, unlink '${path}'`)
	}
}

module.exports = {dbpath, createValidDbFile, deletedbpath}