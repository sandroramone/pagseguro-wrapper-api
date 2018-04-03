import { TypeOf } from './utils'

export const normalizeArray = array => {
  let data = array.map(item => {
    let type = TypeOf(item)

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

export const normalizeObject = data => {
  for (let i in data) {
    if (Array.isArray(data[i])) {
      data[i] = normalizeArray(data[i])
    } else if (typeof data[i] == 'object') {
      data[i] = normalizeObject(data[i])
    }
  }
  return data
}

// normalize objects and array
export const normalize = data => {
  if (Array.isArray(data))
    return normalizeArray(data)
  else
    return normalizeObject(data)
}
