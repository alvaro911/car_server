const DB_URL_PROD = 'mongodb://alvaro:password@ds125262.mlab.com:25262/co_used_cars'
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
