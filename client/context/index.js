import React from 'react';

const Context = React.createContext({
  router: {},
  baseUrl: process.env.REACT_APP_BASE_API_URL
});

export default Context;
