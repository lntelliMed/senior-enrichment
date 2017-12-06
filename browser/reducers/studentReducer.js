import axios from 'axios';

const initialState = []

const GOT_STUDENTS_FROM_SERVER = "GOT_STUDENTS_FROM_SERVER";


export const fetchStudents = () => {
  return function (dispatch) {
    axios.get("/api/students")
      .then(response => response.data)
      .then(students => {
        dispatch(gotStudents(students));
      })
      .catch(err => console.log(err)) // TO-DO: Show friendly error message to user
  }
}

export const gotStudents = (students) => {
  return { type: GOT_STUDENTS_FROM_SERVER, students }
}


const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_STUDENTS_FROM_SERVER:
      return action.students;

    default:
      return state;
  }
}

export default studentReducer;
