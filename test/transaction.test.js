import chai, { expect } from 'chai'
import { Transaction } from '../src/transaction'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

chai.use(sinonChai)
sinonStubPromise(sinon)

global.fetch = require('node-fetch')

describe('Transaction Library', () => {

  let fetchedStub
  let transaction
  let promise

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch')
    promise = fetchedStub.returnsPromise()
    transaction = new Transaction(
      'suporte@lojamodelo.com.br',
      '57BE455F4EC148E5A54D9BB91C5AC12C'
    )
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  describe('Transaction', () => {
    it('should create an instace of Transaction', () => expect(transaction)
      .to.be.an.instanceof(Transaction))

    it('should get session on pagseguro', () => {
      promise.resolves(`
            <?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
            <session>
              <id>a3e544af05314826b4cc3b619489a321</id>
            </session>`)

      let session = transaction.getSession()

      expect(session.resolveValue).to.be
        .equal(`
            <?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
            <session>
              <id>a3e544af05314826b4cc3b619489a321</id>
            </session>`)

      expect(fetchedStub).to.have.been
        .calledWith(`https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email=suporte@lojamodelo.com.br&token=57BE455F4EC148E5A54D9BB91C5AC12C`)
    })

    it('should appending item in transaction', () => {
      transaction.addItem({
        amount: '134.00',
        description: 'Nada',
        id: 1,
        quantity: 2,
        wight: 2346
      })
      transaction.addItem({
        amount: '500.00',
        description: 'Tudo',
        id: 2,
        quantity: 1,
        wight: 300
      })

      expect(transaction.transaction.items.length).to.be.equal(2)
    })

    it('should set item list in transaction', () => {
      let arrayItem = [
        {
          amount: '134.00',
          description: 'Nada',
          id: 1,
          quantity: 2,
          wight: 2346
        },
        {
          amount: '500.00',
          description: 'Tudo',
          id: 2,
          quantity: 1,
          wight: 300
        }
      ]

      transaction.setItems(arrayItem)
      expect(transaction.transaction.items.length).to.be.equal(2)
    })

    it('should set sender in transaction', () => {
      let sender = {
        email: 'comprador@uol.com.br',
        name: 'Roberto Valverde',
        phone: {
          areaCode: '12',
          number: '12345678'
        }
      }

      transaction.setSender(sender)
      expect(transaction.transaction.sender).to.be.eql(sender)
    })

    it('should set shipping in transaction', () => {
      let shipping = {
        address: {
          city: 'Cidade Exemplo',
          complement: '99o andar',
          country: 'BRA',
          district: 'Jardim Exemplo',
          number: '9999',
          postalCode: '99999999',
          state: 'SP',
          street: 'Av. PagSeguro'
        },
        cost: '1.00',
        type: 1
      }

      transaction.setShipping(shipping)
      expect(transaction.transaction.shipping).to.be.eql(shipping)
    })

    it('should set reference to transaction', () => {
      transaction.setReference('REF1234')
      expect(transaction.transaction.reference).to.be.equal('REF1234')
    })

    it('should set currency', () => {
      transaction.setCurrency('BRL')
      expect(transaction.transaction.currency).to.be.equal('BRL')
    })

    it('should set notification URL', () => {
      transaction.setNotificationUrl('https://sualoja.com.br/notifica.html')
      expect(transaction.transaction.notificationURL).to.be
            .equal('https://sualoja.com.br/notifica.html')
    })

    it('should set url vresion correct', () => {
      expect(transaction.url).to.be
        .equal('https://ws.sandbox.pagseguro.uol.com.br/v2/')

      transaction.setUrlVersion('v3')
      expect(transaction.url).to.be
        .equal('https://ws.sandbox.pagseguro.uol.com.br/v3/')

      transaction.setUrlVersion()
      expect(transaction.url).to.be
        .equal('https://ws.sandbox.pagseguro.uol.com.br/v2/')

      transaction.setModeUrl('production')
      expect(transaction.url).to.be
        .equal('https://ws.pagseguro.uol.com.br/v2/')
      
      transaction.setUrlVersion('v3')
      expect(transaction.url).to.be
        .equal('https://ws.pagseguro.uol.com.br/v3/')

    })

    it('should trade mode url', () => {
      transaction.setModeUrl('production')
      expect(transaction.url).to.be
        .equal('https://ws.pagseguro.uol.com.br/v2/')

      transaction.setModeUrl()
      expect(transaction.url).to.be
        .equal('https://ws.sandbox.pagseguro.uol.com.br/v2/')

    })

  })

})
