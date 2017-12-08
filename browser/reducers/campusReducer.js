import axios from 'axios';

const initialState = []

const GOT_CAMPUSES_FROM_SERVER = "GOT_CAMPUSES_FROM_SERVER";
const ADD_CAMPUS = "ADD_CAMPUS";


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

export const gotCampuses = (campuses) => {
  return { type: GOT_CAMPUSES_FROM_SERVER, campuses }
}

export function getCampus(campus) {
  const action = { type: ADD_CAMPUS, campus };
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


const campusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CAMPUSES_FROM_SERVER:
      return action.campuses;

    case ADD_CAMPUS:
      return [...state, action.campus];

    default:
      return state;
  }
}

export default campusReducer;
