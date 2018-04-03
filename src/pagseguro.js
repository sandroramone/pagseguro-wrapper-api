import { sandbox, production } from './config'
import { normalize } from './normalizeArrayAndObject'
const { parseString } = require('xml2js')

global.fetch = require('node-fetch')

class PagSeguro {
  constructor(email, token, url = 'sandbox', mode = 'payment') {
    this.email = email
    this.token = token
    this.url = url == 'production' ? production : sandbox
    this.mode = mode
    this.xml = '<?xml version="1.0" encoding="UTF-8">'
    this.transaction = {}
  }

  // set custom url for requisition, exeample api v3
  setUrl(url) {
    this.url = url
  }

  // parse xml to jsvascript object
  parseXmlToObject(data, callback) {
    parseString(data, { tim: true }, (err, res) => {
      if(err)
        callback(err)
      else
        callback(null, normalize(res))
    })
  }

  // return a pagseguro session for transaction
  getSession() {
    return global.fetch(
      `${this.url}sessions?email=${this.email}&token=${this.token}`,
      { method: 'POST' }
    ).then(data => data.json())
  }

  addItem(item) {
    if(!this.transaction.items)
      this.transaction.items = []

    this.transaction.items = [...this.transaction.items, { item }]
  }

  setItems(items) {
    this.transaction.items = [...items]
  }

  setBuyer(buyer) {
    this.transaction.sender = buyer
  }
}

export { PagSeguro }
