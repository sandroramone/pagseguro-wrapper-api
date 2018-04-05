/** @module normalizeArrayAndObject */

import { typeOf } from './utils'

const normalizeArray = array => {
  let data = array.map(item => {
    let type = typeOf(item)

    switch (type) {
      
      case 'array':
        return item.length == 1 ?
              Array.isArray(item[0]) ? normalizeArray(item[0]) : item[0]  
              : normalizeArray(item)
      
      case 'object':
        return normalizeObject(item)
      
      default:
        return item
    }
  })

  return data.length > 1 ? data : data[0]
}

const normalizeObject = data => {
  for (let i in data) {
    if (Array.isArray(data[i])) {
      data[i] = normalizeArray(data[i])
    } else if (typeof data[i] == 'object') {
      data[i] = normalizeObject(data[i])
    }
  }
  return data
}

/**
 * normalize
 *
 * @param {Object} data is an object to be normalized
 * @returns {Object} Object normalized,
 * exemple { number: [1], name: ['Jhon'] } returns { number: 1, name: 'Jhon' }
 */
const normalize = data => {
  if (Array.isArray(data))
    return normalizeArray(data)
  else
    return normalizeObject(data)
}

export { normalize, normalizeObject, normalizeArray }
