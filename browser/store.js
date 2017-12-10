import { createStore, combineReducers, applyMiddleware } from 'redux';
import studentReducer from "./reducers/studentReducer";
import campusReducer from "./reducers/campusReducer";
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';


const mainReducer = combineReducers({
  students: studentReducer,
  campuses: campusReducer
});

export default createStore(mainReducer, applyMiddleware(thunkMiddleware, loggingMiddleware));
