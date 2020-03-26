import errorHandler from '../helpers/dbErrorHandler'
import CountryModel from '../models/country.model'

const list = (req, res) => {
  CountryModel.findAll({ attributes: ['name'] })
    .then(countries => {
      res.status(200).json({
        message: 'Countries loaded.',
        countries: countries
      })
    })
    .catch(err => {
      console.log(err)
    })
}

export default {
  list
}
