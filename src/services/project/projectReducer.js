import * as PT from "./projectTypes";

const initialState = {
  project: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PT.SAVE_PROJECT_REQUEST:
    case PT.UPDATE_PROJECT_REQUEST:
    case PT.FETCH_PROJECT_REQUEST:
    case PT.FETCH_ALL_PROJECT_REQUEST:
    case PT.DELETE_PROJECT_REQUEST:
      return {
        ...state,
      };

    case PT.PROJECT_SUCCESS:
      return {
        project: action.payload,
        error: "",
      };
    case PT.PROJECT_FAILURE:
      return {
        project: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
