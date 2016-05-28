const environment = {
  development: {
    isProduction: false,
    host: 'localhost',
    port: 3000,
    apiHost: 'localhost',
    apiPort: 3000
  },
  production: {
    isProduction: true,
    host: process.env.HOST || 'react-universal-starter-kit.herokuapp.com',
    port: process.env.PORT || 80,
    apiHost: process.env.APIHOST || 'react-universal-starter-kit.herokuapp.com',
    apiPort: process.env.APIPORT || 80
  }
}[process.env.NODE_ENV || 'development'];

export default {
  ...environment
};