const responseHandler = (req, res, next) => {
  res.suc = (statusCode, message) => {
    if (typeof message === 'object') return res.status(statusCode).json(message)
    if (typeof message === 'string') return res.status(statusCode).json({ message })
  }

  res.err = (statusCode, message) => {
    return res.status(statusCode || 500).json({
      message
    })
  }

  next()
}

module.exports = responseHandler
