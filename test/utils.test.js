import { expect } from 'chai'
import { TypeOf } from '../src/utils'

describe('Utils library', () => {
  
  describe('smoke test', () => {
    it('should exist method TypeOf', () => {
      expect(TypeOf).to.exist
    })
  })

  describe('TypeOf', () => {
    
    it('should return type of correct', () => {
      let variable1 = TypeOf([])
      expect(variable1).to.be.equal('array')
    
      let variable2 = TypeOf({})
      expect(variable2).to.be.equal('object')
    
      let variable3 = TypeOf('')
      expect(variable3).to.be.equal('string')

      let variable4 = TypeOf(null)
      expect(variable4).to.be.equal('null')
      
      let variable5 = TypeOf(0)
      expect(variable5).to.be.equal('number')
      
      let variable6 = TypeOf(new Date())
      expect(variable6).to.be.equal('date')
      
      let variable7 = TypeOf(() => {})
      expect(variable7).to.be.equal('function')

      let variable8 = TypeOf(undefined)
      expect(variable8).to.be.equal('undefined')
 
      let variable9 = TypeOf(NaN)
      expect(variable9).to.be.equal('number')
 
      let variable10 = TypeOf({array: [], string: '', number: 3})
      expect(variable10).to.be.equal('object')

   })
  })
})
