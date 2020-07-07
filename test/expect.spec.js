const {expect} = require('chai')
const googol = Math.pow(10, 100)
const googolplex = Math.pow(10, googol)

const small = [{a:'b'}]
const smallcopy = [{a:'b'}]	// just another reference

const foo = 'bar', beverages = {tea: ['chai', 'match', 'oolong', {'ame[rica': ['south', 'america']}], bra: 'zilll', num: [1,2,3]}

describe('Expect test', function () {
	it('just to have some idea about the `expect` interface', function () {
		expect(foo).to.be.a('string')
		expect(foo).to.be.equal('bar')
		expect(googol).to.be.a('number')
		expect(googolplex).not.to.be.lessThan(Infinity)
		expect(foo).to.have.lengthOf(3)
		expect(beverages).to.have.property('bra').with.lengthOf(5)
	})

	it('`.not` should negates all assertions in the following chain', function () {
		expect(4).not.to.be.a('string')
		expect(beverages).not.to.have.property('brazil')
		expect(googol).not.be.greaterThan(googolplex)
		expect(() => {return 'phantom'}).to.not.throws()
	})

	it('`.deep` should changes the evaluates to a strict the methods `.equal`, `.include`, `.members`, `.keys` and `.property` without strict', function () {
		const thr = function () {expect(beverages.num).to.be.equal([1,2,3])}
		expect(thr).to.throws()
		expect(beverages.num).to.be.deep.equal([1,2,3])

		const obj = {a: {c: 'd'}, [small]: 'reallysmall'}
		expect(function () {expect(obj).to.include({a: {c: 'd'}})}).to.throws()
		expect(obj).to.deep.include({a: {c: 'd'}})

		// `.to.have.members` is so awkward
		expect(function () {expect([1,2,3,small]).to.have.members([smallcopy,1,3,2])}).to.throws()
		expect([1,2,3,small]).to.have.deep.members([smallcopy,1,3,2])

		expect({x: small}).to.have.deep.property('x', smallcopy)
		expect(new Set([{a: 1}])).to.have.deep.keys([{a: 1}])	// i have no idea
	})

	it('`.nested` should enables dot and bracket-notation in all `.property` and `.include`', function () {
		expect(beverages.tea).to.be.an('array').that.have.lengthOf(4)

		expect(beverages).to.nested.include({'tea[3].ame\\[rica[1]': 'america'})
		expect(beverages).to.have.nested.property('tea[3].ame\\[rica')
	})

	it('`.own` forces the `.property` and `.include` to ignore inherited values', function () {
		const obj = {a: 1, [small]: 3}

		expect(obj).to.have.own.property('a')
		expect(obj).to.have.property('toString')
		expect(function () {expect(obj).to.have.own.property('toString')}).to.throws()	// nice
	})

	it('`.ordered` forces the `.members` to requires in the same order', function () {
		const obj = ['a',1,small,3,2,1]
		expect(obj).to.have.ordered.members(['a',1,small,3,2,1]).but.not.have.ordered.members([1,3,2,1])
		expect(obj).to.include.ordered.members([1,2,1])
	})
})