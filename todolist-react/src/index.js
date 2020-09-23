import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"


ReactDOM.render(
    <Router>
      <Switch>
        <Route path="/:urlPath"><App type="custom"/></Route>
        <Route path="/"><App type="home"/></Route>  
      </Switch>
    </Router>,
  document.getElementById('root')
);

