import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home.js';
import Map from './pages/map.js';
import Board from './pages/boards.js';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={ Home } />
        <Route path="/map" render={ Map } />
        <Route path="/boards" render={ Board } />
      </Switch>
    </Router>
  );
};

export default App;
