/** @module utils */
import { normalize } from './normalizeArrayAndObject'
import { parseString } from 'xml2js'

/**
 * typeOf
 *
 * @param {string} data is a data for type verification
 * @returns {string} type of data
 */
const typeOf = data => {
  if(typeof(data) === 'object')
   return Object.prototype.toString.call(data)
    .replace(/^\[object |\]$/g,'').toLowerCase()
  return typeof(data)
}

/**
 * parseXmlToObject
 *
 * @param {string} data xml for parse and transform in javascript object
 * @param {callback} callback
 */
const parseXmlToObject = (data, callback) => {
  parseString(data, { tim: true }, (err, res) => {
    if(err)
      callback(err)
    else
      callback(null, normalize(res))
  })
}

/**
 * this callback response an error and a result,
 * result is a xml transformed in Object 
 * @callback callback
 * @param {Error} err
 * @param {Object} res
 */


export { typeOf, parseXmlToObject }
