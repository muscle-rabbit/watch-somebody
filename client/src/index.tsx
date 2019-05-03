import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'unstated-typescript';

import Route from './components/Route';

ReactDOM.render(
  <Provider>
    <Route />
  </Provider>,
  document.getElementById('root')
);
