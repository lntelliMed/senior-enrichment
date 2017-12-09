import axios from 'axios';

const initialState = []
const GOT_CAMPUSES_FROM_SERVER = "GOT_CAMPUSES_FROM_SERVER";
const ADD_CAMPUS = "ADD_CAMPUS";
const REMOVE_CAMPUS = "REMOVE_CAMPUS";
const UPDATE_CAMPUS = "UPDATE_CAMPUS";


export const fetchCampuses = () => {
  return function (dispatch) {
    axios.get("/api/campuses")
      .then(response => response.data)
      .then(campuses => {
        dispatch(gotCampuses(campuses));
      })
      .catch(err => console.log(err)) // TO-DO: Show friendly error message to user
  }
}

export function changeCampus(campus) {
  const action = { type: UPDATE_CAMPUS, campus };
  return action;
}

export function updateCampus(campus, ownProps) {
  console.log(campus)
  console.log('ownprops again', ownProps)
  return function thunk(dispatch) {
    return axios.put(`/api/campuses/${ownProps.match.params.campusId}`, campus)
      .then(res => res.data)
      .then(updatedCampus => {
        const action = changeCampus(updatedCampus);
        dispatch(action);
        ownProps.history.push(`/campuses`);

      })
     .catch(err => console.log(err)) // TO-DO: Show friendly error message to user;
  }
}

export const gotCampuses = (campuses) => {
  return { type: GOT_CAMPUSES_FROM_SERVER, campuses }
}

export function getCampus(campus) {
  const action = { type: ADD_CAMPUS, campus };
  return action;
}

export function removeCampus(campusId) {
  const action = { type: REMOVE_CAMPUS, campusId };
  return action;
}

export function postCampus(campus, history) {
console.log(campus)
  return function thunk(dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => {
        const action = getCampus(newCampus);
        dispatch(action);
        history.push(`/campuses`);

      });
  }
}

export const deleteCampus = (campusId, ownProps) => {
  console.log('deleting ' + campusId)
  return function (dispatch) {
    axios.delete(`/api/campuses/${campusId}`)
      .then(response => {
        console.log('in deleteCampus' + response);
        dispatch(removeCampus(campusId));
        ownProps.history.push(`/campuses`);
      })
      .catch(err => {
                ownProps.history.push(`/campuses`);

                console.log(err)}) // TO-DO: Show friendly error message to user

  }
}


const campusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CAMPUSES_FROM_SERVER:
      return action.campuses;

    case ADD_CAMPUS:
      return [...state, action.campus];


    case REMOVE_CAMPUS:
      console.log('in reducer for remove student')
      return state.filter(campus => campus.id !== action.campusId);


    case UPDATE_CAMPUS:
      console.log('in reducer for update campus')
      return state.filter(campus => campus.id !== action.campus.id);
    default:
      return state;
  }
}

export default campusReducer;
