import React, { Component } from "react";
import {
  Card,
  Form,
  Button,
  Col,
  Row,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import {
  faEnvelope,
  faLock,
  faSignInAlt,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { autheticateUser } from "../../services/index";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    email: "",
    password: "",
    error: "",
  };

  credentialChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validateUser = () => {
    this.props.autheticateUser(this.state.email, this.state.password);
    setTimeout(() => {
      if (this.props.auth.isLoggedIn) {
        //return this.props.history.push("/");
      } else {
        this.resertLoginForm();
        this.setState({ error: "Invalid email and password" });
      }
    },1000);
  };

  resertLoginForm = () => {
    this.setState(() => this.initialState);
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <Row className="justify-content-md-center">
        <Col xs={5}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Card>
            <Card.Header>
              <FontAwesomeIcon icon={faSignInAlt} />
              Login
            </Card.Header>
            <Card.Body>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <Form.Group as={Col}>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Enter email address"
                    onChange={this.credentialChange}
                  />
                </Form.Group>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
                <Form.Group as={Col}>
                  <FormControl
                    required
                    autoComplete="off"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={this.credentialChange}
                  />
                </Form.Group>
              </InputGroup>
            </Card.Body>
            <Card.Footer>
              <Button
                size="sm"
                type="button"
                variant="success"
                onClick={this.validateUser}
                disabled={
                  this.state.email.length === 0 ||
                  this.state.password.length === 0
                }
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Button>{" "}
              <Button
                size="sm"
                type="button"
                variant="info"
                disabled={
                  this.state.email.length === 0 &&
                  this.state.password.length === 0 &&
                  this.state.error.length === 0
                }
              >
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autheticateUser: (email, password) =>
      dispatch(autheticateUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
