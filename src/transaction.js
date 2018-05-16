import { PagSeguro } from './pagseguro'
import { sandbox, production } from './config'

global.fetch = require('node-fetch')

/**
 * class Transaction represent the transaction pagseguro api endpoint
 *
 * @extends {PagSeguro}
 */
class Transaction extends PagSeguro {

  /**
   *
   * @param {string} email is email of account pagseguro, exemple vendor@email
   * @param {string} token is token of account pagseguro,
   * get the token in pagseguro configuration
   * @param {string} [url=sandbox] is a type of url api,
   * exemple 'sandbox' or 'production'
   */
  constructor(email, token, url = 'sandbox') {
    super(email, token, url)
    this.transaction.mode = 'default'
    this.transaction.receiverEmail = email
  }

  /**
   * setUrl set url for requisition in pagseguro api
   *
   * @param {string} [v=v2] - version api url for requisition, example 'v3',
   * default value is 'v2'
   */
  setUrlVersion(v = 'v2') {
    this.url = `${this.mode == 'sandbox' ? sandbox : production}${v}/`
  }

  /**
   * setModeUrl
   *
   * @param {string} [mode=sandbox] - is trasaction mode,
   * 'sandbox' for test or 'production' for production
   */
  setModeUrl(mode = 'sandbox') {
    this.mode = mode
    this.setUrlVersion(this.url.substr(this.url.length - 3, 2))
  }

  /**
   * getSession
   *
   * @returns {Promise} promise - return a pagseguro session for transaction
   */
  getSession() {
    let promise = global.fetch(
      `${this.url}sessions?email=${this.email}&token=${this.token}`,
      { method: 'POST' }
    )
    .then(data => data.text())

    return promise
  }

  /**
   * addItem
   *
   * @param {item} item - item buy
   */
  addItem(item) {
    if(!this.transaction.items)
      this.transaction.items = []

    this.transaction.items = [...this.transaction.items, { item }]
  }

  /**
   * @typedef item
   * @type {Object}
   * @property {string} id - id item
   * @property {string} description - description of item
   * @property {string} amount - unity cost
   * @property {number} quantity - unity quantity
   */

  /**
   * setItems
   *
   * @param {item[]} items - array of object item
   */
  setItems(items) {
    this.transaction.items = [...items]
  }

  /**
   * @typedef phone
   * @type {Object}
   * @property {string} areaCode - DDD of buyer, 2 digits
   * @property {string} number - number of phone, of 7 to 9 digits
   */ 

  /**
   * @typedef document
   * @type {Object}
   * @property {string} type - values valid is 'CPF' or 'CNPJ'
   * @property {string} value - number of CPF or CNPJ,
   * depending on the previous value
   */

  
  /**
   * @typedef sender
   * @type {Object}
   * @property {string} hash - vendor indentification (fingerprint),
   * is generated with pagseguro javascript in web browser
   * @property {string} [ip] - IP of buyer, optional property
   * @property {phone} [phone] - phone of buyer, optional property 
   * @property {string} [email] - email of buyer, optional property
   * @property {document} [documents] - documents of buyer, optional property
   * depending of payment mode
   * @property {string} [bornDate] - born date of buyer, format: dd/MM/yyyy,
   * optional property
   * @property {string} [name] - minimum two sequence of letters, optional
   * property
   */
  
  /**
   * setSender
   *
   * @param {sender} sender - representing a buyer
   */
  setSender(sender) {
    this.transaction.sender = sender
  }

  /**
   * @typedef address
   * @type {Object}
   * @property {string} [street] - length limit 80
   * @property {string} [number] - length limit 20
   * @property {string} [complement] - length limit 40
   * @property {string} [district] - length limit 60
   * @property {string} [city] - length limit min 2 and max 60, required a valid
   * Brazil cities name
   * @property {string} [state] - Two letters representing a Brazil state
   * @property {string} [country] - at the moment only value 'BRA' is valid
   * @property {string} [postalCode] - an eigth-digit numer containing a zip
   * code(CEP) from Brazil
   */ 
    
  /**
   * @typedef shipping
   * @type {Object}
   * @property {address} [address] - is optional
   * @property {number} [type] - reference type of freight, are valid values:
   * 1 is a order type PAC of Correios |
   * 2 is a order type Sedex of Correios |
   * 3 is a order type not specified |
   * is a optional property
   * @property {string} [cost] - Value of freight, format: decimal > 0.00 and 
   * < 9999999.00, is a optional property
   * @property {string} [addressRequired] - inform if required address to make
   * delivery, values valid is true, false and null, is optional property
   */
  

  /**
   * setShipping
   *
   * @param {shipping} shipping - is a shipping of transaction
   */
  setShipping(shipping) {
    this.transaction.shipping = shipping
  }

  /**
   * setReference
   *
   * @param {string} reference - is a reference of transaction in your database,
   * useful for link your transaction of your system with pagseguro, set
   * reference is optional
   */
  setReference(reference) {
    this.transaction.reference = reference
  }

  /**
   * setCurrency
   *
   * @param {string} currency - is a symbol monetary, a unique option is 'BRL'
   * Real of Brazil
   */
  setCurrency(currency) {
    this.transaction.currency = currency
  }

  /**
   * setNotificationUrl
   *
   * @param {string} url is your url for received notification of trasaction,
   * set url for notification is optional
   */
  setNotificationUrl(url) {
    this.transaction.notificationURL = url
  }

  /**
   * setPaymentMethod
   *
   * @param {string} method is a payment method, valid value is 'creditCard',
   * 'boleto' and 'eft'(debit in bank account)
   */
  setPaymentMethod(method) {
    this.transaction.method = method
  }
}

export { Transaction }
