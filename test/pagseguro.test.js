import chai, { expect } from 'chai'
import { PagSeguro } from '../src/pagseguro'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

chai.use(sinonChai)
sinonStubPromise(sinon)

global.fetch = require('node-fetch')

describe('PagSeguro Library', () => {

  let fetchedStub
  let promise

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch')
    promise = fetchedStub.returnsPromise()
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  describe('PagSeguro', () => {
    it('should create an instace of PagSeguro', () => {
      let pagseguro = new PagSeguro()
      expect(pagseguro).to.be.an.instanceof(PagSeguro)
    })

    it('shoud received correct URL', () => {
      let pagseguro = new PagSeguro('teste', 'token')
      expect(pagseguro.url).to.be.equal('https://ws.sandbox.pagseguro.uol.com.br/v2/')

      let pagseguro2 = new PagSeguro('teste', 'token', 'production')
      expect(pagseguro2.url).to.be.equal('https://ws.pagseguro.uol.com.br/v2/')
    })

    it('should received correct mode', () => {
      let pagseguro = new PagSeguro('José Comprador', 'comprador@uol.com.br')
      expect(pagseguro.mode).to.be.equal('payment')

      let pagseguro2 = new PagSeguro(
                  'José Comprador',
                  'comprador@uol.com.br',
                  'sandbox',
                  'subscription')
      expect(pagseguro2.mode).to.be.equal('subscription')
    })

    it('should replace default url', () => {
      let pagseguro = new PagSeguro()
      pagseguro.setUrl('https://google.com')
      expect(pagseguro.url).to.be.equal('https://google.com')
    })

    it('should get session on pagseguro', () => {
      promise.resolves('<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?><session><id>a3e544af05314826b4cc3b619489a321</id></session>')

      let pagseguro = new PagSeguro(
                    'suporte@lojamodelo.com.br',
                    '57BE455F4EC148E5A54D9BB91C5AC12C')

      let session = pagseguro.getSession()

      expect(session.resolveValue).to.be
        .equal('<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?><session><id>a3e544af05314826b4cc3b619489a321</id></session>')

      expect(fetchedStub).to.have.been
        .calledWith('https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email=suporte@lojamodelo.com.br&token=57BE455F4EC148E5A54D9BB91C5AC12C')
    })

    it('should parse xml to object', () => {
      let xml = `<?xml version="1.0"?><session><id>620f99e348c24f07877c927b353e49d3</id></session>`

      let pagseguro = new PagSeguro()
      const callback = (err, res) => {
        if(err)
          expect(err).to.be.equal(err)
        else
          expect(res).to.be.eql({ session: { id: '620f99e348c24f07877c927b353e49d3' } })
      }

      pagseguro.parseXmlToObject(xml, callback)
      pagseguro.parseXmlToObject({}, callback)
    })

    it('should appending item in transaction', () => {
      let pagseguro = new PagSeguro()
      pagseguro.addItem({
        id: 1,
        description: 'Nada',
        amount: "134.00",
        quantity: 2,
        wight: 2346
      })
      pagseguro.addItem({
        id: 2,
        description: 'Tudo',
        amount: "500.00",
        quantity: 1,
        wight: 300
      })
      expect(pagseguro.transaction.items.length).to.be.equal(2)
    })

    it('should set item list in transaction', () => {
      let pagseguro = new PagSeguro()
      let arrayItem = [
        {
          id: 1,
          description: 'Nada',
          amount: "134.00",
          quantity: 2,
          wight: 2346
        }, {
        id: 2,
        description: 'Tudo',
        amount: "500.00",
        quantity: 1,
        wight: 300
      }]

      pagseguro.setItems(arrayItem)
      expect(pagseguro.transaction.items.length).to.be.equal(2)
    })

    it('should set buyer in transaction', () => {
      let pagseguro = new PagSeguro()
      let buyer = {
        name: 'Roberto Valverde',
        email: 'comprador@uol.com.br',
        phone: {
          areaCode: '12',
          number: '12345678'
        }
      }
      pagseguro.setBuyer(buyer)
      expect(pagseguro.transaction.sender).to.be.eql(buyer)
    })
  })

})
