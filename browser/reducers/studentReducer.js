import axios from 'axios';

const initialState = [];
const GOT_STUDENTS_FROM_SERVER = "GOT_STUDENTS_FROM_SERVER";
const GOT_STUDENT_FROM_SERVER = "GOT_STUDENT_FROM_SERVER";
const ADD_STUDENT = "ADD_STUDENT";
const REMOVE_STUDENT = "REMOVE_STUDENT";
const UPDATE_STUDENT = "UPDATE_STUDENT";

export function addStudent(student) {
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

export function postStudent(student, ownProps) {
  return function thunk(dispatch) {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(newStudent => {
        const action = addStudent(newStudent);
        dispatch(action);
        // history.push(`/students/${newStudent.id}`)
        ownProps.history.push(`/students`);

      });
  }
}

export function updateStudent(student, ownProps) {
  return function thunk(dispatch) {
    return axios.put(`/api/students/${ownProps.match.params.studentId}`, student)
      .then(res => res.data)
      .then(updatedStudent => {
        const action = changeStudent(updatedStudent);
        dispatch(action);
        // history.push(`/students/${newStudent.id}`)
        ownProps.history.push(`/students`);
      })
     .catch(err => console.log(err));
  }
}

export const fetchStudents = () => {
  return function (dispatch) {
    axios.get("/api/students")
      .then(response => response.data)
      .then(students => {
        dispatch(gotStudents(students));
      })
      .catch(err => console.log(err));
  }
}

// export const fetchStudent = (studentId) => {
//   return function (dispatch) {
//     axios.get(`/api/students/${studentId}`)
//       .then(response => response.data)
//       .then(student => {
//         dispatch(gotStudent(student));
//       })
//       .catch(err => console.log(err));
//   }
// }

// export const gotStudents = (students) => {
//   return { type: GOT_STUDENTS_FROM_SERVER, students }
// }

export const deleteStudent = (studentId) => {
  return function (dispatch) {
    axios.delete(`/api/students/${studentId}`)
      .then(response => {
        dispatch(removeStudent(studentId));
      })
      .catch(err => console.log(err));
  }
}

export const gotStudent = (student) => {
  return { type: GOT_STUDENT_FROM_SERVER, student }
}

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_STUDENTS_FROM_SERVER:
      return action.students;

    // case GOT_STUDENT_FROM_SERVER:
    //   return action.student;

    case ADD_STUDENT:
      return [...state, action.student];

    case REMOVE_STUDENT:
      return state.filter(student => student.id !== action.studentId);

    case UPDATE_STUDENT:
      return state.filter(student => student.id !== action.student.id);

    default:
      return state;
  }
}

export default studentReducer;
