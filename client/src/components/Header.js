import React from 'react';
import {
	withRouter
} from 'react-router-dom';
import {
	Nav,
	Navbar
} from 'react-bootstrap';

import {
	isAuthenticated,
	destroySession
} from '../utils/auth';

/**
 * The Header of the application
 */
class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.doLogout = this.doLogout.bind(this);
	}

	/**
	 * Destroys the user session and logs the user out
	 */
	doLogout() {
		destroySession();
		this.props.history.push("/");
	}

	render() {
		return (
			<Navbar bg="primary" variant="dark">
				<Navbar.Brand href="/">LookBook</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/all">All Recipes</Nav.Link>
					{isAuthenticated() ? <Nav.Link href="/user/recipes">My Recipes</Nav.Link> : ""}
					{isAuthenticated() ? "" : <Nav.Link href="/login">Login</Nav.Link>}
					{isAuthenticated() ? "" : <Nav.Link href="/register">Register</Nav.Link>}
					{isAuthenticated() ? <Nav.Link onClick={this.doLogout}>Logout</Nav.Link> : ""}
				</Nav>
			</Navbar>
		);
	}
}

export default withRouter(Header);