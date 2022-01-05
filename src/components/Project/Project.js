import {
  faEdit,
  faList,
  faPlusSquare,
  faSave,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { saveProject, fetchProject, updateProject } from "../../services/index";
import React, { Component } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import MyToast from "../MyToast";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = this.INITIAL_STATE;
    this.state.show = false;
    this.projectChange = this.projectChange.bind(this);
    this.submitProject = this.submitProject.bind(this);
  }

  INITIAL_STATE = {
    id: "",
    name: "",
    description: "",
  };

  componentDidMount() {
    const projectId = +this.props.match.params.id;
    if (projectId) {
      this.findProjectById(projectId);
    }
  }

  findProjectById = (projectId) => {
    this.props.fetchProject(projectId);

    setTimeout(() => {
      let project = this.props.projectObject.project

      if(project != null){
        this.setState({
          id: project.id,
          name: project.name,
          description: project.description,
        });
      }
    }, 1000)

  
   
  };

  resetProject = () => {
    this.setState(() => this.INITIAL_STATE);
  };

  projectChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitProject = (event) => {
    event.preventDefault();
    const project = {
      name: this.state.name,
      type: 1,
      startDate: 1,
      description: this.state.description,
    };
    this.props.saveProject(project);
    setTimeout(() => {
      if (this.props.projectObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 2000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);

    this.setState(this.INITIAL_STATE);
  };

  updateProject = (event) => {
    event.preventDefault();
    const project = {
      id: this.state.id,
      name: this.state.name,
      type: 1,
      startDate: 1,
      description: this.state.description,
    };

    this.props.updateProject(project);

    setTimeout(() => {
      if (this.props.projectObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 2000);
        setTimeout(() => this.projectList(), 2000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
  };

  projectList = () => {
    return this.props.history.push("/list");
  };

  render() {
    const { name, description } = this.state;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Project Saved Successfully"}
            type={"success"}
          />
        </div>

        <Card className="border" style={{ marginTop: "10px" }}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
            {this.state.id ? "Update project" : "Add new project"}
          </Card.Header>
          <Form
            id="projectFormId"
            onReset={this.resetProject}
            onSubmit={this.state.id ? this.updateProject : this.submitProject}
          >
            <Card.Body>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="name"
                  name="name"
                  value={name}
                  onChange={this.projectChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="description"
                  name="description"
                  value={description}
                  onChange={this.projectChange}
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={this.projectList}
              >
                <FontAwesomeIcon icon={faList} /> Project list
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //savedProjectObject: state.project,
    projectObject: state.project,
    //updatedProjectObject: state.project,
  };
};

const mapDispatchToProps = (dispach) => {
  return {
    saveProject: (project) => dispach(saveProject(project)),
    fetchProject: (projectId) => dispach(fetchProject(projectId)),
    updateProject: (project) => dispach(updateProject(project)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Project);
