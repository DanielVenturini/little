const {expect} = require('chai')
const googol = 10 ** 100
const googolplex = 10 ** googol

const small = [{a:'b'}]
const smallcopy = [{a:'b'}]	// just another reference
const obj = {a: 12, b: small, c: {key:'value', googol}, [small]: 'small'}
const list = [1,2,3,'str', small, obj]

const foo = 'bar', beverages = {tea: ['chai', 'match', 'oolong', {'ame[rica': ['south', 'america']}], bra: 'zilll', num: [1,2,3]}

describe('Expect', function () {
	describe('functions', function () {
		it('#a or #an should verifies the type of a binding', function () {
			expect(32).to.be.a('number').that.is.a('Number')
			expect({}).to.be.an('Object')
			expect([1,2,3]).to.be.a('array').that.is.not.an('object')
			expect(NaN).to.be.a('number')
			expect(null).to.be.a('null').that.is.not.a('undefined')
		})

		it('#equal should compare the value', function () {
			expect('str').to.be.equal('str')
			expect(list).to.be.deep.equal(new Array(...list), 'array should be deep equal to its wrapper')
			expect(googolplex).to.not.be.equal(googol)
			expect('str').to.be.not.equal('str2')
		})

		it('#lessThan should verifies a ceil', function () {
			expect(12).to.be.lessThan(googol).but.to.not.be.lessThan(-googol)
			expect(new Date('2020-02-14')).to.be.lessThan(new Date())
			expect(googolplex).to.not.be.lessThan(Infinity, 'JS consider a googolplex as an infinity number')
		})

		it('#lengthOf should verifies the property length of an value', function () {
			expect('daniel').to.have.lengthOf(6).but.not.have.lengthOf(12)
			expect([1,2,3,4,5]).to.have.length(5)

			const obj = {a: 12}
			Object.setPrototypeOf(obj, {length: 4})
			expect(obj).to.have.lengthOf(4)
		})

		it('#property should verifies a property objects and its value', function () {
			// OVERLOAD: i guess the method CASCADES the value
			expect(obj).to.have.property('toString')// .but.not.have.property('length')
			expect(beverages).to.have.deep.property('num', [1,2,3])
			expect(obj).to.have.property([small].toString(), 'small')
			expect(obj).to.have.deep.property('c', {key:'value', googol})
		})

		it('#ownProperty should verifies a non-inherited property', function () {
			// OVERLOAD
			expect(obj).to.not.have.ownProperty('toString')
			expect(small).to.have.deep.ownProperty('0', {a: 'b'}).to.be.deep.equal({a: 'b'})
			expect(beverages).to.have.ownProperty('tea').to.have.lengthOf(4)
		})

		it('#include should verifies a value property in the object. It ignores the prototype verification', function () {
			// const obj = {a: 12, b: small, c: {key:'value', googol}, [small]: 'small'}
			expect('string').to.include('rin').that.has.lengthOf(6)
			expect(obj).to.deep.include({c: {key: 'value', googol}})
			expect(obj).to.include({c: obj.c})
			expect(list).to.include('str')
			expect({a:1, b:2, c:3}).to.be.an('object').that.includes({a:1, c:3}, 'it verifies a piece of an object')
			Object.prototype.bbb = 2021	// eslint-disable-line no-extend-native
			expect(obj).to.deep.include({bbb: 2021})
			expect(obj).to.not.deep.own.include({bbb: 2021})
			expect(obj).to.not.include(obj.toString)
			expect(obj).to.nested.deep.include({'b[0]': {a:'b'}})
			expect(obj).to.not.include({d: 'anyvalue'})	// VERY DANGEROUS: use expect(obj).to.not.have.any.keys('d'), instead
			expect(obj, 'error happened because there is no that value').to.not.include({b: 'small'})
			// `include` can be used as a language chain to `keys` and `member`
			expect(obj).to.include.any.keys('a', 'k')
			expect(list).to.include.members([1,2,3])
		})

		it('#members')
		it('#keys')
	})

	describe('operators', function () {
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
			// expect(obj).to.include.ordered.members([3,2,1])
		})
	})
})