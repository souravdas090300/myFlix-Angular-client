// Development environment configuration
export const environment = {
  production: false,
  // Use local CORS proxy server for development
  // This will proxy requests to Heroku and handle CORS properly
  apiUrl: 'http://localhost:3001/api/'
};
