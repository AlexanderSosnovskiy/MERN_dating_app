const getErrorMessage = err => {
  let message = 'Some problems on server. Please, repeat request later.'

  if (err.code === 11000 || err.code === 11001) {
    let em = err.errmsg
    let dupName = em.substring(em.indexOf('{') + 2, em.lastIndexOf(':'))
    message = `${dupName} already exists`
  }

  for (let errName in err.errors) {
    console.log(errName)
    if (err.errors[errName].message) {
      let errMsg = err.errors[errName].message
      message = errMsg.includes('hashed_password')
        ? errMsg.replace('hashed_password', 'password')
        : errMsg
    }
  }

  return message
}

export default getErrorMessage
