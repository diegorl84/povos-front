import {
  faEdit,
  faList,
  faTrash,
  faStepBackward,
  faStepForward,
  faFastBackward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import {
  Card,
  Table,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProject, fetchAllProjects } from "../../services";
import authHeader from "../../utils/authToken";
import MyToast from "../MyToast";

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      currentPage: 1,
      projectsPerPage: 3,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/v1/project", { headers: authHeader() })
      .then((response) => {
        this.setState({
          projects: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  findAllProjects() {
    this.props.fetchAllProjects();
    setTimeout(() => {
      let projects = this.props.projectObject;
      console.log(projects)
      this.setState({
        projects: projects,
      });
      console.log(projects);
    }, 2000);
  }

  deleteProject = (projectId) => {
    this.props.deleteProject(projectId);
    setTimeout(() => {
      if (this.props.deletedProjectObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 2000);
        this.findAllProjects(this.state.currentPage);
      } else {
        this.setState({ show: false });
      }
    }, 1000);
  };

  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1,
      });
    }
  };

  previousPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.projects.length / this.state.projectsPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  lastPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.projects.length / this.state.projectsPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.projects.length / this.state.projectsPerPage
        ),
      });
    }
  };

  render() {
    const { projects, currentPage, projectsPerPage } = this.state;
    const lastIndex = currentPage * projectsPerPage;
    const firstIndex = lastIndex - projectsPerPage;
    const currentProjects = this.state.projects.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const pageNumCss = {
      width: "45px",
      border: "1px solid #17A2B8",
      color: "#17A2B8",
      textAlign: "center",
      fontWeight: "bold",
    };
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Project deleted successfully"}
            type={"danger"}
          />
        </div>

        <Card className="border" style={{ marginTop: "10px" }}>
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> Project List
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Start Date</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr align="center">
                    <td colSpan="4">{projects.length} projects available</td>
                  </tr>
                ) : (
                  currentProjects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td>{project.startDate}</td>
                      <td>{project.description}</td>
                      <td>{project.type.name}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={"edit/" + project.id}
                            className="btn btn-sm btn-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "}
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={this.deleteProject.bind(this, project.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <div style={{ float: "left" }}>
              Showing Page {currentPage} of {totalPages}
            </div>
            <div style={{ float: "right" }}>
              <InputGroup size="sm">
                <Button
                  type="button"
                  variant="outline-info "
                  disabled={currentPage === 1 ? true : false}
                  onClick={this.firstPage}
                >
                  <FontAwesomeIcon icon={faFastBackward} /> First
                </Button>
                <Button
                  type="button"
                  variant="outline-info "
                  disabled={currentPage === 1 ? true : false}
                  onClick={this.previousPage}
                >
                  <FontAwesomeIcon icon={faStepBackward} />
                  Prev
                </Button>
                <FormControl style={pageNumCss} defaultValue={currentPage} />
                <Button
                  type="button"
                  variant="outline-info "
                  disabled={currentPage === totalPages ? true : false}
                  onClick={this.nextPage}
                >
                  <FontAwesomeIcon icon={faStepForward} />
                  Next
                </Button>
                <Button
                  type="button"
                  variant="outline-info "
                  disabled={currentPage === totalPages ? true : false}
                  onClick={this.lastPage}
                >
                  <FontAwesomeIcon icon={faFastForward} />
                  NextLast
                </Button>
              </InputGroup>
            </div>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    deletedProjectObject: state.project,
  };
};

const mapDispatchToProps = (dispach) => {
  return {
    deleteProject: (project) => dispach(deleteProject(project)),
    fetchAllProjects: () => dispach(fetchAllProjects()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
