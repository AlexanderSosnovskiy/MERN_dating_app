const pageNotFound = () => (req, res, next) => {
  const message = 'Page Not Found.'
  const code = 404

  res.status(code)

  res.format({
    text: () => {
      res.send({
        message: message
      })
    },
    json: () => {
      res.send({
        errors: message
      })
    }
  })
}

export default pageNotFound
