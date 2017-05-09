require('./assets/styles/main.scss');

import React from 'react';
import {render} from 'react-dom';
import App from 'client/main.jsx';
import routes from 'routes/routes.js';

render(
  <App />, document.getElementById('app')
);
