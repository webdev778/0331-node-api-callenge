module.exports = {
  getHealth,
  updateProperty,
  getProperty,
  deleteProperty
}

const db = require('./db')
const utils = require('./utils')

async function getHealth (req, res) {
  res.json({ success: true })
}

/**
 * parse request params and returns path
 * @param {Object} req - http request
 * @param {JSON} req.params - json object
 * For example, http://localhost:1337/rn1abu8/courses/calculus
 * req.params : { '0': '/calculus', 'studentId': 'rn1abu8', 'propertyName': 'courses' }
 * Return value: :propertyName/(:propertyName) - 'courses/calculus'
 */
const getPath = (req) => req.params.propertyName + req.params[0]

/**
 * GET /:student-id/:propertyName(/:propertyName)
 * Retrieves data from /data/${studentId}.json. Returns 404 if that file or property doesn't exist.
 * Should also retrieve nested properties: curl http://localhost:1337/rn1abu8/courses/calculus
 */
async function getProperty (req, res) {
  const ret = await db.filterJson(req.params.studentId, getPath(req))
  ret
    ? res.json(ret)
    : res.status(404).send()
}

/**
 * PUT /:student-id/:propertyName(/:propertyName)
 * Stores data within /data/${studentId}.json
 * If that file or property doesn't exist it is created.
 * Should also set nested properties
 */
async function updateProperty (req, res) {
  const ret = await db.updateJson(req.params.studentId,
    utils.buildJSON(getPath(req), req.body))
  res.json(ret)
}

/**
 * DELETE /:student-id/:propertyName(/:propertyName)
 * Removes data from /data/${studentId}.json.
 * Returns 404 if that file or property doesn't exist.
 * Should also remove nested properties.
 */
async function deleteProperty (req, res) {
  const ret = await db.removeJson(req.params.studentId, getPath(req))
  ret
    ? res.json(ret)
    : res.status(404).send()
}
