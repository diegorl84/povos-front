import Project from "../../components/Project/Project";
import {
  SAVE_PROJECT_REQUEST,
  UPDATE_PROJECT_REQUEST,
  FETCH_PROJECT_REQUEST,
  PROJECT_SUCCESS,
  PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  FETCH_ALL_PROJECT_REQUEST,
} from "./projectTypes";
import authHeader from "../../utils/authToken";
import axios from "axios";

export const saveProject = (project) => {
  return (dispatch) => {
    dispatch(saveProjectRequest());
    console.log("saving project...")
    axios
      .post("http://localhost:5000/v1/project", project, { headers: authHeader() },
      )
      .then((response) => {
        console.log("Finishing")
        dispatch(projectSuccess(response.data));
      })
      .catch((error) => {
        dispatch(projectFailure(error));
      });
  };
};

export const updateProject = (project) => {
  return (dispatch) => {
    dispatch(updateProjectRequest());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(authHeader());

    axios
      .put("http://localhost:5000/v1/project", {
        body: JSON.stringify(project),
        headers,
      })
      .then((response) => response.json())
      .then((project) => {
        dispatch(projectSuccess(Project));
      })
      .catch((error) => {
        dispatch(projectFailure(error));
      });
  };
};

export const fetchProject = (projectId) => {
  return (dispatch) => {
    dispatch(fetchProjectRequest());

    axios
      .get("http://localhost:5000/v1/project/" + projectId, {
        headers: authHeader(),
      })
      .then((response) => response.json())
      .then((project) => {
        dispatch(projectSuccess(project));
      })
      .catch((error) => {
        dispatch(projectFailure(error));
      });
  };
};

export const fetchAllProjects = () => {
  return (dispatch) => {
    dispatch(fetchAllProjectRequest());

    axios
      .get("http://localhost:5000/v1/project/", { headers: authHeader() })
      .then((response) => {
        console.log(response);
        if (response.status === 401) {
          console.log("401");
          dispatch(unauthorizedFailure("401"));
        }
        response.json();
      })
      .then((projects) => {
        console.log(projects);
        dispatch(projectSuccess(projects));
      })
      .catch((error) => {
        dispatch(projectFailure(error));
      });
  };
};

export const deleteProject = (projectId) => {
  return (dispatch) => {
    dispatch(deleteProjectRequest());

    axios
      .delete("http://localhost:5000/v1/project/" + projectId,{ headers: authHeader() })
      .then((response) => {
        dispatch(projectSuccess(response.data));
      })
      .catch((error) => {
        dispatch(projectFailure(error));
      });
  };
};

const saveProjectRequest = () => {
  return {
    type: SAVE_PROJECT_REQUEST,
  };
};

const updateProjectRequest = () => {
  return {
    type: UPDATE_PROJECT_REQUEST,
  };
};

const fetchProjectRequest = () => {
  return {
    type: FETCH_PROJECT_REQUEST,
  };
};

const fetchAllProjectRequest = () => {
  return {
    type: FETCH_ALL_PROJECT_REQUEST,
  };
};

const deleteProjectRequest = () => {
  return {
    type: DELETE_PROJECT_REQUEST,
  };
};

const projectSuccess = (project) => {
  return {
    type: PROJECT_SUCCESS,
    payload: project,
  };
};

const projectFailure = (error) => {
  return {
    type: PROJECT_FAILURE,
    payload: error,
  };
};

const unauthorizedFailure = (error) => {
  return {
    type: PROJECT_FAILURE,
    payload: error,
  };
};
