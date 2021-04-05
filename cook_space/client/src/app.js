import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home.js';
import Map from './pages/map.js';
import Board from './pages/boards.js';
import Gallary from './pages/gallary.js';

const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Gallary } />
        <Route path="/map" component={ Map } />
        <Route path="/boards" component={ Board } />
        <Route path="/gallary" component={ Gallary } /> 
        {/* <Route path="/gallary" render={ Gallary } /> */}
      </Switch>
    </Router>
  );
};

export default App;

// ISSUE : render 와 component가 뭐가 다르지?