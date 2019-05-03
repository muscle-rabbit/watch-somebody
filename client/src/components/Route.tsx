import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Toppage from './pages/Toppage';
import Dashboard from './pages/dashboad';

interface Props {}

const component: React.FC<Props> = () => (
  <Router>
    <Route exact path="/" component={Toppage} />
    <Route path="/dashboard" component={Dashboard} />
  </Router>
);

export default component;
