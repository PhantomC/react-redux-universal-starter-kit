const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

export default {
  ...environment,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 80,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 80
}