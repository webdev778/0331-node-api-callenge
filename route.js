const router = require('express').Router()
const api = require('./api')

module.exports = router

const asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next)

router.get('/health', asyncHandler(api.getHealth))

router.route('/:studentId/:propertyName*').get(asyncHandler(api.getProperty))
  .put(asyncHandler(api.updateProperty))
  .delete(asyncHandler(api.deleteProperty))
