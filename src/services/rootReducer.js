import {combineReducers} from 'redux'
import userReducer from './user/userReducer'
import authReducer from './user/auth/authReducer'
import projectReducer from './project/projectReducer'

const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer,
    auth: authReducer
});

export default rootReducer;