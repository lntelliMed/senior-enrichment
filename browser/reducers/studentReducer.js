import axios from 'axios';

const initialState = []

const GOT_STUDENTS_FROM_SERVER = "GOT_STUDENTS_FROM_SERVER";
const ADD_STUDENT = "ADD_STUDENT";
const REMOVE_STUDENT = "REMOVE_STUDENT";
const UPDATE_STUDENT = "UPDATE_STUDENT";

export function getStudent(student) {
  const action = { type: ADD_STUDENT, student };
  return action;
}

export function changeStudent(student) {
  const action = { type: UPDATE_STUDENT, student };
  return action;
}

export function removeStudent(studentId) {
  const action = { type: REMOVE_STUDENT, studentId };
  return action;
}

export function postStudent(student, history) {
console.log(student)
  return function thunk(dispatch) {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(newStudent => {
        const action = getStudent(newStudent);
        dispatch(action);
        // history.push(`/students/${newStudent.id}`)
        history.push(`/students`);

      });
  }
}

export function updateStudent(student, history) {
  console.log(student)
  return function thunk(dispatch) {
    return axios.put(`/api/students/${student.id}`, student)
      .then(res => res.data)
      .then(updatedStudent => {
        const action = changeStudent(updatedStudent);
        dispatch(action);
        // history.push(`/students/${newStudent.id}`)
        history.push(`/students`);

      });
  }
}

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

export const deleteStudent = (studentId) => {
  console.log('deleting ' + studentId)
  return function (dispatch) {
    axios.delete(`/api/students/${studentId}`)
      .then(response => {
        console.log('in deleteStudent' + response);
        dispatch(removeStudent(studentId));
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


    case ADD_STUDENT:
      return [...state, action.student];

    case REMOVE_STUDENT:
      console.log('in reducer for remove student')
      return state.filter(student => student.id !== action.studentId);
      // return [];

    case UPDATE_STUDENT:
      console.log('in reducer for update student')
      return state.filter(student => student.id !== action.student.id);
      // return [];

    default:
      return state;
  }
}

export default studentReducer;
