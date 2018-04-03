export const TypeOf = data => {
  if(typeof(data) === 'object')
   return Object.prototype.toString.call(data)
    .replace(/^\[object |\]$/g,'').toLowerCase()
  return typeof(data)
}
