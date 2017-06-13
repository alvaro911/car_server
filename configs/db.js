const mongoose = require('mongoose');

const { CONFIG } = require('./config');

mongoose.Promise = global.Promise;

mongoose.set('debug', true);

try {
  console.log(CONFIG.DB_URL)
  mongoose.connect(CONFIG.DB_URL);
} catch (err) {
  mongoose.createConnection(CONFIG.DB_URL);
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    throw e;
  });
