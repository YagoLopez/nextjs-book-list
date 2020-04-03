const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  webpack: (config) => {
    config.node = {
      fs: 'empty'
    };
    return config
  },
  env: {
    BACKEND_URL: isProd ? 'https://book-list.now.sh/api' : 'http://localhost:3000/api',
  },
};
