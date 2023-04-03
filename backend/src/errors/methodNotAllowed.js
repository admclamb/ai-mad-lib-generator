/**
 * Express Router "Method not allowed" handler.
 * add to end of router for the rest of the different type of request * * to be proccessed
 */
function methodNotAllowed(req, res, next) {
  next({
    status: 405,
    message: `${req.method} not allowed for ${req.originalUrl}`,
  });
}


module.exports = methodNotAllowed;
