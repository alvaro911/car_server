const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carFinderSchema = new Schema({
  carId: String,
  city: String,
  title: String,
  price: String,
  img: String
})

module.exports = mongoose.model('CarList', carFinderSchema)
