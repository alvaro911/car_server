const DB_URL_PROD = 'mongodb://Alvaro:password@ds117592.mlab.com:17592/car_app'
const DB_URL_DEV = 'mongodb://localhost/car_finder_app_dev'

function getEnv(env){
  switch (env){
    case 'development':
      return {
        DB_URL: DB_URL_DEV
      }
    default:
      return {
        DB_URL: DB_URL_PROD
      }
  }
};

const defaultConfig = {
  PORT: process.env.PORT || 3030,
}

exports.CONFIG = Object.assign({}, defaultConfig, getEnv(process.env.NODE_ENV));
