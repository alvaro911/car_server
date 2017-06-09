const cron = require('cron')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const async = require('async')

const {DB_URL_PROD, DB_URL_DEV} = require('./config')
const carReq = require('./request')
const {getLinks, carBuilderInfo} = require('./scraper')
const CarList = require('./models/carlists')

const coCities = ['boulder', 'cosprings', 'denver', 'eastco', 'fortcollins', 'rockies', 'pueblo', 'westslope']
const carModels = ['toyota', 'nissan', 'ford', 'audi', 'ferrari', 'bmw', 'volkswagen', 'hyundai', 'mitsubishi', 'honda', 'buick', 'chevrolet', 'jeep', 'dodge']


function getCar(url, cb){
  carReq(url, (err, html)=>{

    cb(null, carBuilderInfo(html))
  })
}

function carDb(url, city, cb){
  carReq(url, (err, html) => {
    if(html !== undefined){
      let hrefs = getLinks(html, city)
      async.mapLimit(hrefs, 3, getCar, (err, results) => {
        CarList.create(results, err => {
          if(err) console.log(err)
          console.log('your car list is being saved in the data base')
          cb(results)
        })
      })
    }
  })
}

const scrape = new cron.CronJob({
  cronTime:'00 53 19 * * *',
  onTick: () => {
    mongoose.connect('mongodb://Alvaro:password@ds117592.mlab.com:17592/car_app', err=>{
      if(err){
        return console.log(err)
      }
    })
    for(let i = 0; i<coCities.length; i++){
      for(let j = 0; j<carModels.length; j++){
        carDb(`https://${coCities[i]}.craigslist.org/search/cto?query=${carModels[j]}`, coCities[i], carData =>  {
          console.log('Making request')
        })
      }
    }
  }
})

scrape.start()
