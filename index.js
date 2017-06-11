require('./configs/db');

const cron = require('cron');
const async = require('async');

const carReq = require('./request');
const { getLinks, carBuilderInfo } = require('./scraper');
const CarList = require('./models/carlists');
const CITIES = require('./configs/citiesToCron');
const CARS = require('./configs/carsToCron');

function getCar(url, cb) {
  carReq(url, (err, html) => {
    cb(err, carBuilderInfo(html));
  });
}

function carDb(url, city, cb) {
  carReq(url, (err, html) => {
    if (err) {
      console.log(err);
    }
    if (html != undefined) {
      let hrefs = getLinks(html, city);

      async.mapLimit(hrefs, 10, getCar, (err, results) => {
        if (err) {
          throw err;
        }
        const arr = results.filter(item => item != null);
        CarList.insertMany(arr, { ordered: false }, err => {
          if (err) console.log(err);
          console.log('your car list is being saved in the data base');
          cb(results);
        });
      });
    }
  });
}

function cronCar() {
  for (let i = 0; i < CITIES.length; i++) {
    for (let j = 0; j < CARS.length; j++) {
      carDb(
        `https://${CITIES[i]}.craigslist.org/search/cto?query=${CARS[j]}`,
        CITIES[i],
        carData => {
          // console.log('Making request');
        },
      );
    }
  }
}

const scrape = new cron.CronJob({
  cronTime: '00 0 0 * * *',
  onTick: cronCar,
  start: true,
  runOnInit: true
});

scrape.start();
