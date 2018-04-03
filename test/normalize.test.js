import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

chai.use(sinonChai)
sinonStubPromise(sinon)

global.fetch = require('node-fetch')

import {
  normalize,
  normalizeObject,
  normalizeArray
} from '../src/normalizeArrayAndObject'

describe('Normalize Object and array PagSeguro', () => {
  let fetchedStub
  let promise

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch')
    promise = fetchedStub.returnsPromise()
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  describe('smoke test', () => {
    it('should exist the normalize method', () => {
      expect(normalize).to.exist
    })
     
    it('should exist the method normalizeObject', () => {
      expect(normalizeObject).to.exist
    })
     
    it('should exist the method normalizeArray', () => {
      expect(normalizeArray).to.exist
    })
    
  })

  describe('normalizeArray', () => {
    const data = normalizeArray([{}, {}, 'teste'])
    expect(data).to.be.eql([{}, {}, 'teste'])
    
    const data2 = normalizeArray([{teste: ['teste']}, {testando: ['teste1', 'teste2']}, 'teste'])
    expect(data2).to.be.eql([{teste: 'teste'}, {testando: ['teste1', 'teste2']}, 'teste'])

  })

  describe('normalizeObject', () => {
    it('should return the object normalized', () => {
      const obj = normalizeObject({ name: 'sandro', idade: 30 })
      expect(obj).to.be.eql({ name: 'sandro', idade: 30 })

      const obj2 = normalizeObject({ name: 'sandro', idade: 30, ensino: { 
                            escolaridade: 'graduado',
                            curso: 'sistemas para internet'}})
      
      expect(obj2).to.be.eql({ name: 'sandro', idade: 30, ensino: { 
                            escolaridade: 'graduado',
                            curso: 'sistemas para internet'} })

      const obj3 = normalizeObject({ name: 'sandro', idade: 30, ensino: [{
                            escolaridade: 'graduado',
                            curso: 'sistemas para internet'}]})
      
      expect(obj3).to.be.eql({ name: 'sandro', idade: 30, ensino: { 
                            escolaridade: 'graduado',
                            curso: 'sistemas para internet'} })
    })
  })
  
  describe('normalize', () => {
    it('should return the JSON data correct', () => {
      const dt = normalize([[[[{teste: 'sandro'}]]]])
      expect(dt).to.be.eql({teste: 'sandro'})
      
      const data = normalize({name: 'sandro', skills: ['js']})
      expect(data).to.be.eql({name: 'sandro', skills: 'js'})
      
      const data2 = normalize({
              name: 'sandro', 
              datas: { nascimento: '12/02/1988', idade: 30 },
              skills: ['js', 'python']
      })

      expect(data2).to.be.eql({
              name: 'sandro', 
              datas: { nascimento: '12/02/1988', idade: 30 },
              skills: ['js', 'python']
      })
      
      const data3 = normalize([{
              name: 'sandro', 
              datas: { nascimento: '12/02/1988', idade: 30 },
              skills: ['js', 'python', {server: ['docker', 'linux']}, {os: ['linux']}]
      }, [{teste: 'teste'}]])

      expect(data3).to.be.eql([{
              name: 'sandro', 
              datas: { nascimento: '12/02/1988', idade: 30 },
              skills: ['js', 'python', {server: ['docker', 'linux']}, {os: 'linux'}]
      }, {teste: 'teste'}])
      
      const data4 = normalize([['sandro', { teste: ['js'] }]])
      expect(data4).to.be.eql(['sandro', { teste: 'js' }])

      let obj = JSON.parse(`{"transaction":{"date":["2011-02-10T16:13:41.000-03:00"],"reference":["REF1234"],"type":["1"],"status":["3"],"itemCount":["1"],"code":["9E884542-81B3-4419-9A75-BCC6FB495EF1"],"items":[{"item":[{"id":["0001"],"description":["Produto PagSeguroI"],"quantity":["1"],"amount":["99999.99"]}]}],"sender":[{"name":["José Comprador"],"email":["comprador@uol.com.br"],"phone":[{"areaCode":["99"],"number":["99999999"]}]}],"paymentMethod":[{"type":["1"],"code":["101"]}],"grossAmount":["99999.99"],"shipping":[{"address":[{"street":["Av. PagSeguro"],"number":["9999"],"complement":["99o andar"],"district":["Jardim Internet"],"city":["Cidade Exemplo"],"state":["SP"],"country":["ATA"],"postalCode":["99999999"]}],"type":["1"],"cost":["21.5"]}],"lastEventDate":["2011-02-15T17:39:14.000-03:00"],"paymentLink":["https://pagseguro.uol.com.br/checkout/imprimeBoleto.jhtml?code=314601B208B24A5CA53260000F7BB0D"],"discountAmount":["1.1"],"feeAmount":["1.1"],"netAmount":["99999.99"],"extraAmount":["1.1"],"escrowEndDate":["2011-02-15T17:39:14.000-03:00"],"installmentCount":["1"],"cancellationSource":["INTERNAL"]}}`)
      const data5 = normalize(obj)
      expect(data5).to.be.eql(JSON.parse(`{"transaction":{"date":"2011-02-10T16:13:41.000-03:00","reference":"REF1234","type":"1","status":"3","itemCount":"1","code":"9E884542-81B3-4419-9A75-BCC6FB495EF1","items":{"item":{"id":"0001","description":"Produto PagSeguroI","quantity":"1","amount":"99999.99"}},"sender":{"name":"José Comprador","email":"comprador@uol.com.br","phone":{"areaCode":"99","number":"99999999"}},"paymentMethod":{"type":"1","code":"101"},"grossAmount":"99999.99","shipping":{"address":{"street":"Av. PagSeguro","number":"9999","complement":"99o andar","district":"Jardim Internet","city":"Cidade Exemplo","state":"SP","country":"ATA","postalCode":"99999999"},"type":"1","cost":"21.5"},"lastEventDate":"2011-02-15T17:39:14.000-03:00","paymentLink":"https://pagseguro.uol.com.br/checkout/imprimeBoleto.jhtml?code=314601B208B24A5CA53260000F7BB0D","discountAmount":"1.1","feeAmount":"1.1","netAmount":"99999.99","extraAmount":"1.1","escrowEndDate":"2011-02-15T17:39:14.000-03:00","installmentCount":"1","cancellationSource":"INTERNAL"}}`))

    })
  })
})
