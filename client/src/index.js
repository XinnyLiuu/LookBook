import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";

// CSS
import './css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap css

// Components
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Recipes from "./components/Recipes";
import RecipeForm from "./components/RecipeForm";
import NotFound from "./components/NotFound";

// Utils
import {
	isAuthenticated
} from "./utils/auth";

// Routing
const routing = (
	<Router>
		<Header />
		<Switch>
			<Redirect exact from="/" to="/recipes" />
			<Route exact path="/register" component={props => isAuthenticated() ? <NotFound /> : <Register />} />
			<Route exact path="/login" component={props => isAuthenticated() ? <NotFound /> : <Login />} />
			<Route exact path="/recipes" component={props => <Recipes type="all" />} />
			<Route exact path="/user/recipes" component={props => isAuthenticated() ? <Recipes type="user" /> : <NotFound />} />
			<Route exact path="/user/create" component={props => isAuthenticated() ? <RecipeForm /> : <NotFound />} />
			<Route exact path="/user/edit/:id" component={props => isAuthenticated() ? <RecipeForm {...props} /> : <NotFound />} />
			<Route component={NotFound} />
		</Switch>
	</Router>
);

ReactDOM.render(routing, document.getElementById("root"));