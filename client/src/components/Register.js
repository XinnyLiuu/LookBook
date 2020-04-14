import React from 'react';
import {
	Form,
	Button
} from 'react-bootstrap';

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
	}

	render() {
		return (
			<div id="register">
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" placeholder="Enter Username" />
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Enter Password" />
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
  					</Button>
				</Form>
			</div>
		);
	}
}

export default Register;