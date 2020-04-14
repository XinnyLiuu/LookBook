import React from 'react';
import {
    Alert
} from 'react-bootstrap';

class CustomerAlert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // This component will have two props passed into it - color and message
        return (
            <Alert variant={this.props.color}>
                {this.props.message}
            </Alert>
        );
    }
}

export default CustomerAlert;