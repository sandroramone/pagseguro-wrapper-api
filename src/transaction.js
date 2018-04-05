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
   * @param {string} [url='sandbox'] is a type of url api,
   * exemple 'sandbox' or 'production'
   */
  constructor(email, token, url = 'sandbox') {
    super(email, token, url)
    this.transaction.mode = 'default'
    this.transaction.receiverEmail = email
  }

  /**
   * setUrl
   * set url for requisition in pagseguro api
   *
   * @param {string} [v='v2'] - version api url for requisition, example 'v3',
   * default value is 'v2'
   */
  setUrl(v = 'v2') {
    this.url = `${this.mode == 'sandbox' ? sandbox : production}${v}/`
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
   * @param {object} item - item buy
   */
  addItem(item) {
    if(!this.transaction.items)
      this.transaction.items = []

    this.transaction.items = [...this.transaction.items, { item }]
  }

  /**
   * setItems
   *
   * @param {array} items - array of object item
   */
  setItems(items) {
    this.transaction.items = [...items]
  }

  /**
   * setSender
   *
   * @param {object} sender - representing a buyer
   */
  setSender(sender) {
    this.transaction.sender = sender
  }

  /**
   * setShipping
   *
   * @param {object} shipping - is a shipping of transaction
   */
  setShipping(shipping) {
    this.transaction.shipping = shipping
  }

  /**
   * setReference
   *
   * @param {string} reference - is a reference of transaction
   */
  setReference(reference) {
    this.transaction.reference = reference
  }

  /**
   * setCurrency
   *
   * @param {string} currency - is a symbol monetary, example Brazil id 'BRL'
   */
  setCurrency(currency) {
    this.transaction.currency = currency
  }

  setNotificationUrl(url) {
    this.transaction.notificationURL = url
  }
}

export { Transaction }
