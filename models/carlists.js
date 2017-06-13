const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carFinderSchema = new Schema({
  _id: {type:String},
  city: {type:String, default:'NaN', trim: true},
  title: {type:String},
  price: {type:String, default:0},
  img: {type:String},
  model: {type:String},
  link: {type:String},
  paragraph: {type:String}
})

module.exports = mongoose.model('CarList', carFinderSchema)
