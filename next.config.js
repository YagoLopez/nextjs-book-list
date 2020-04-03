const dotEnvResult = require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

if (dotEnvResult.error) {
  throw dotEnvResult.error
}

module.exports = {
  webpack: (config) => {
    config.node = {
      fs: 'empty'
    };
    return config
  },
  apiBaseUrl: isProd ? 'https://book-list.now.sh/api' : 'http://localhost:3000/api',
  env: {
    TEST: process.env.TEST,
    BACKEND_URL: isProd ? 'https://book-list.now.sh/api' : 'http://localhost:3000/api',
  },
};
