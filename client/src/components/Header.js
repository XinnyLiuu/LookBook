import React from 'react';
import {
	Nav,
	Navbar
} from 'react-bootstrap';

import {
	isAuthenticated
} from '../utils/auth';

/**
 * The Header of the application
 */
class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
	}

	render() {
		return (
			<Navbar bg="primary" variant="dark">
				<Navbar.Brand href="/">LookBook</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/all">All Recipes</Nav.Link>
					{
						// Check if the user is authenticated, if not hide this
						isAuthenticated() ? <Nav.Link href="/user/recipes">My Recipes</Nav.Link> : ""
					}
					<Nav.Link href="/login">Login</Nav.Link>
					<Nav.Link href="/register">Register</Nav.Link>
				</Nav>
			</Navbar>
		);
	}
}

export default Header;