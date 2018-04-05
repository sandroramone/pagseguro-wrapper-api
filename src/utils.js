import { normalize } from './normalizeArrayAndObject'
import { parseString } from 'xml2js'

// return correct type of data
export const TypeOf = data => {
  if(typeof(data) === 'object')
   return Object.prototype.toString.call(data)
    .replace(/^\[object |\]$/g,'').toLowerCase()
  return typeof(data)
}

// parse xml to jsvascript object
export const parseXmlToObject = (data, callback) => {
  parseString(data, { tim: true }, (err, res) => {
    if(err)
      callback(err)
    else
      callback(null, normalize(res))
  })
}
