const DB_URL_PROD = 'mongodb://Alvaro:password@ds117592.mlab.com:17592/car_app'
const DB_URL_DEV = 'mongodb://localhost/car_finder_app_dev'

exports.TEST_DATABASE_URL = (
  process.env.TEST_DATABASE_URL ||
  'mongodb://localhost/test_car_finder_app)')

exports.PORT = process.env.PORT || 3030

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
}

console.log(process.env.NODE_ENV)

exports.CONFIG = getEnv(process.env.NODE_ENV)
