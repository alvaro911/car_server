const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carFinderSchema = new Schema({
  _id: {type:String},
  city: {type:String, default:'NaN'},
  title: {type:String},
  price: {type:Number, default:0},
  img: {type:String},
})

module.exports = mongoose.model('CarList', carFinderSchema)
