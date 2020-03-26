const errorHandler = () => (err, req, res, next) => {
  err.code = err.statusCode || 500

  const errData = {
    error: err.message
  }

  res.json(errData)
}

export default errorHandler
