import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

import Home from './Home';
import CityInfo from './CityInfo';

const App = () => {
  return (
    <>
      <div id="banner">
        <h1>City Weather Checker</h1>
      </div>
      <Router>
        <Route path="/city/:id/:name">
          <CityInfo />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Router>
    </>
  );
};

export default App;
