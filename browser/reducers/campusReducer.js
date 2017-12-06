import axios from 'axios';

const initialState = []

const GOT_CAMPUSES_FROM_SERVER = "GOT_CAMPUSES_FROM_SERVER";


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


const campusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CAMPUSES_FROM_SERVER:
      return action.campuses;

    default:
      return state;
  }
}

export default campusReducer;
