// Constants placeholders would be replaced to values at Webpack bundle process
const APP_CONFIG = {
  isProd: process.env.NODE_ENV === 'production',
};

export default APP_CONFIG;
