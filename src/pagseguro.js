import { sandbox, production, version } from './config'

/**
 * class PagSeguro represent the basic config of account
 */
class PagSeguro {

    /**
     *
     * @param {string} email is email of account pagseguro, exemple vendor@email
     * @param {string} token is token of account pagseguro,
     * get the token in pagseguro configuration
     * @param {string} [url='sandbox'] is a type of url api,
     * exemple 'sandbox' or 'production'
     */
    constructor(email, token, url = 'sandbox') {
        this.email = email
        this.token = token
        this.mode = url
        this.url = `${url == 'production' ? production : sandbox}${version}/`
        this.xml = '<?xml version="1.0" encoding="UTF-8">'
        this.transaction = {}
    }
}

export { PagSeguro }
