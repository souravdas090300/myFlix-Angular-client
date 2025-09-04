// Development environment configuration
export const environment = {
  production: false,
  // Use proxy during development to avoid CORS issues
  // The proxy.conf.json maps /api to the Heroku backend
  apiUrl: '/api/'
};
