import { Col, Container, Row } from "react-bootstrap";

export default function Dashboard(props) {

  return (
    <div className="container">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header pb-0">
                <div className="card-actions float-right"></div>
                <h5 className="card-title mb-0">Povos Management App</h5>
              </div>
              <div className="card-body">
                <Container>
                  <Row>
                    <Col>
                      <strong>Version 0.0.1</strong>
                      <ul>
                        <li>Setting struture base</li>
                        <li>List projects</li>
                      </ul>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
