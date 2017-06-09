const DB_URL_PROD = 'mongodb://localhost/car_finder_app_prod'
const DB_URL_DEV = 'mongodb://localhost/car_finder_app_dev'

exports.TEST_DATABASE_URL = (
  process.env.TEST_DATABASE_URL ||
  'mongodb://localhost/test_car_finder_app)')

exports.PORT = process.env.PORT || 3030
