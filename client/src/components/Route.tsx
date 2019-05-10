import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Subscribe } from 'unstated-typescript';

import Toppage from './pages/Toppage';
import Search from './pages/Search';
import Dashboard from './pages/Dashboad';

interface Props {}

const component: React.FC<Props> = () => (
  <Router>
    <Route exact path="/" component={Toppage} />
    <Route path="/search" component={Search} />
    <Route path="/dashboard" component={Dashboard} />
  </Router>
);

export default component;
