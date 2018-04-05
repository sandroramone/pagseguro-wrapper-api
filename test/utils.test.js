import { expect } from 'chai'
import { typeOf, parseXmlToObject } from '../src/utils'

describe('Utils library', () => {

  describe('smoke test', () => {
    it('should exist method TypeOf', () => {
      expect(typeOf).to.exist
    })

    it('shoud exist method parseCmlToObject', () => {
      expect(parseXmlToObject).to.exist
    })
  })

  describe('typeOf', () => {

    it('should return type of correct', () => {
      let variable1 = typeOf([])
      expect(variable1).to.be.equal('array')

      let variable2 = typeOf({})
      expect(variable2).to.be.equal('object')

      let variable3 = typeOf('')
      expect(variable3).to.be.equal('string')

      let variable4 = typeOf(null)
      expect(variable4).to.be.equal('null')

      let variable5 = typeOf(0)
      expect(variable5).to.be.equal('number')

      let variable6 = typeOf(new Date())
      expect(variable6).to.be.equal('date')

      let variable7 = typeOf(() => {})
      expect(variable7).to.be.equal('function')

      let variable8 = typeOf(undefined)
      expect(variable8).to.be.equal('undefined')

      let variable9 = typeOf(NaN)
      expect(variable9).to.be.equal('number')

      let variable10 = typeOf({ array: [], string: '', number: 3 })
      expect(variable10).to.be.equal('object')

   })
  })

  describe('parseXmlToObject', () => {
    it('should parse xml to object', () => {
      let xml = `<?xml version="1.0"?><session><id>620f99e348c24f07877c927b353e49d3</id></session>`

      const callback = (err, res) => {
        if(err)
          expect(err).to.be.equal(err)
        else
          expect(res).to.be.eql({ session: { id: '620f99e348c24f07877c927b353e49d3' } })
      }

      parseXmlToObject(xml, callback)
      parseXmlToObject({}, callback)
    })
  })

})
