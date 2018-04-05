import { expect } from 'chai'

import { PagSeguro } from '../src/pagseguro'

describe('PagSeguro Library', () => {

    let pagseguro

    beforeEach(() => {
        pagseguro = new PagSeguro(
            'suporte@lojamodelo.com.br',
            '57BE455F4EC148E5A54D9BB91C5AC12C'
          )
    })

    describe('PagSeguro', () => {
        it('should create an instace of PagSeguro', () =>
            expect(pagseguro).to.be.an.instanceof(PagSeguro)
        )

        it('shoud received correct URL', () => {

        expect(pagseguro.url).to.be.equal('https://ws.sandbox.pagseguro.uol.com.br/v2/')

            let pagseguro2 = new PagSeguro(
                            'suporte@lojamodelo.com.br',
                            '57BE455F4EC148E5A54D9BB91C5AC12C',
                            'production'
                            )

            expect(pagseguro2.url).to.be.equal('https://ws.pagseguro.uol.com.br/v2/')
        })
    })
})
