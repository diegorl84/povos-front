import { faEnvelope, faLock, faSignInAlt, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@restart/ui/esm/Button';
import React, { Component } from 'react';
import { Card, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';

class Register extends Component {
    render() {
        const { email, password } = this.state;
        return (
          <Row className="justify-content-md-center">
            <Col xs={5}>
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
                      this.state.password.length === 0
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

export default Register;