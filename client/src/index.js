import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// CSS
import './css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap css

// Components
import Header from "./components/Header";
import Register from "./components/Register";

// Utils

// Routing
const routing = (
  <Router>
    <Header />
    <Switch>
      {/* The Switch component is used to help our React application redirect to a specific URL specified in a child Route component. */}
      <Route exact path="/register" component={props => <Register />} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));