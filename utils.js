const _trim = props => props.filter(p => !!p)

/**
 * @param {Array} path - json key array.
 * @param {JSON Object} nested - nested value.
 * Return new json object with nested value
 * For instance, path => ['a', 'b', 'c'], nested => { body: 1 }
 * it will be { 'a' : { 'b' : { 'c' : { body : 1 } } } }
 */
const _makeJson = (path, nested) => {
  let obj = {}
  let _p = obj
  let i

  for (i = 0; i < path.length - 1; i++) {
    _p[path[i]] = {}
    _p = _p[path[i]]
  }
  _p[path[i]] = nested

  return obj
}

const buildJSON = (path, body) => path
  ? _makeJson(_trim(path.split('/')), body)
  : null

const getKeyPath = params => params ? _trim(params.split('/')).join('.') : null

module.exports = {
  buildJSON,
  getKeyPath
}
