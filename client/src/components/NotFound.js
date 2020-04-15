import React from 'react';
import { Alert } from "react-bootstrap";
import CustomAlert from "./CustomAlert";

class NotFound extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Alert variant="danger">
                Oops! An error has occurred!
            </Alert>
        );
    }
}

export default NotFound;