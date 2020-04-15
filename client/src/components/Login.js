import React from 'react';
import {
    withRouter
} from 'react-router-dom';
import {
    Form,
    Button
} from 'react-bootstrap';

import CustomAlert from './CustomAlert';

import {
    post
} from '../utils/requests';
import {
    setSession
} from '../utils/auth';

import User from '../model/User';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

	/** 
	 * Listens to and maps the user's input from into the component's state
	 * 
	 * @param {e} Event 
	 */
    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;

        this.setState({
            [name]: value
        });
    }


	/**
	 * Login the user by sending a POST request to our server
	 * 
	 * Returns:
	 * 400 - Bad Request
	 * 200 - User found
	 * 
	 * @param {e} Event 
	 */
    async doLogin(e) {
        e.preventDefault();

        const url = "http://localhost:8000/api/user/login";

        // Validate  
        let username = this.state.username.trim();
        let password = this.state.password.trim();

        if (username.length === 0 || password.length === 0) throw new Error();

        // Prepare data to send to url
        const data = JSON.stringify({
            username: username,
            password: password
        });

        try {
            const resp = await post(url, data);

            // On 200
            if (resp.status === 200) {
                const json = await resp.json();

                // Create session for user
                setSession(
                    new User(json._id, json.username, json.name, true)
                );

                // Redirect to home 
                this.props.history.push("/");
            }

            // On 400
            if (resp.status === 400) throw new Error();
        } catch (e) {
            console.log(e);

            this.setState({
                error: true
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.error ? <CustomAlert color="danger" message="There has been an error in logging you in!" /> : ""}

                <div id="login">
                    <Form onSubmit={this.doLogin}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" name="username" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" name="password" onChange={this.handleChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
  					</Button>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Login);