const cron = require('cron')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const async = require('async')

const {CONFIG} = require('./config')
const carReq = require('./request')
const {getLinks, carBuilderInfo} = require('./scraper')
const CarList = require('./models/carlists')

const coCities = ['boulder', 'cosprings', 'denver', 'eastco', 'fortcollins', 'rockies', 'pueblo', 'westslope']
const carModels = ['toyota', 'nissan', 'ford', 'bmw', 'volkswagen', 'hyundai', 'mitsubishi', 'honda', 'chevrolet', 'jeep']

mongoose.Promise = global.Promise

function getCar(url, cb){
  carReq(url, (err, html)=>{

    cb(null, carBuilderInfo(html))
  })
}

function carDb(url, city, cb){
  carReq(url, (err, html) => {
    if(err){
      throw(err)
    }
    if(html !== undefined){
      let hrefs = getLinks(html, city)
      async.mapLimit(hrefs, 10, getCar, (err, results) => {
        if(err){
          throw(err)
        }
        CarList.insertMany(results, {ordered:false}, err => {
          if(err) console.log(err)
          console.log('your car list is being saved in the data base')
          cb(results)
        })
      })
    }
  })
}

const scrape = new cron.CronJob({
  cronTime:'00 09 08 * * *',
  onTick: () => {
    mongoose.connect(CONFIG.DB_URL, err=>{
      if(err){
        return console.log(err)
      }
      console.log(`DB running on ${CONFIG.DB_URL}`);
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
