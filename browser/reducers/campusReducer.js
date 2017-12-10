import axios from 'axios';

const initialState = []
const GOT_CAMPUSES_FROM_SERVER = "GOT_CAMPUSES_FROM_SERVER";
const ADD_CAMPUS = "ADD_CAMPUS";
const REMOVE_CAMPUS = "REMOVE_CAMPUS";
const UPDATE_CAMPUS = "UPDATE_CAMPUS";

export const gotCampuses = (campuses) => {
  return { type: GOT_CAMPUSES_FROM_SERVER, campuses }
}

export const fetchCampuses = () => {
  return function (dispatch) {
    axios.get("/api/campuses")
      .then(response => response.data)
      .then(campuses => {
        dispatch(gotCampuses(campuses));
      })
      .catch(err => console.log(err));
  }
}

export function changeCampus(campus) {
  const action = { type: UPDATE_CAMPUS, campus };
  return action;
}

export function updateCampus(campus, ownProps) {
  return function thunk(dispatch) {
    return axios.put(`/api/campuses/${ownProps.match.params.campusId}`, campus)
      .then(res => res.data)
      .then(updatedCampus => {
        const action = changeCampus(updatedCampus);
        dispatch(action);
        ownProps.history.push(`/campuses`);
      })
     .catch(err => console.log(err));
  }
}

export function getCampus(campus) {
  const action = { type: ADD_CAMPUS, campus };
  return action;
}

export function removeCampus(campusId) {
  const action = { type: REMOVE_CAMPUS, campusId };
  return action;
}

export function postCampus(campus, ownProps) {
  return function thunk(dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => {
        const action = getCampus(newCampus);
        dispatch(action);
        ownProps.history.push(`/campuses`);
      });
  }
}

export const deleteCampus = (campusId, ownProps) => {
  return function (dispatch) {
    axios.delete(`/api/campuses/${campusId}`)
      .then((response) => {
        dispatch(removeCampus(campusId));
        ownProps.history.push(`/campuses`);
      })
      .catch(err => {
                ownProps.history.push(`/campuses`);
                console.log(err)
      });

  }
}

const campusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CAMPUSES_FROM_SERVER:
      return action.campuses;

    case ADD_CAMPUS:
      return [...state, action.campus];


    case REMOVE_CAMPUS:
      return state.filter(campus => campus.id !== action.campusId);


    case UPDATE_CAMPUS:
      return state.filter(campus => campus.id !== action.campus.id);

    default:
      return state;
  }
}

export default campusReducer;
