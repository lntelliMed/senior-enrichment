import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStudents } from '../reducers/studentReducer';

class StudentList extends Component {
  componentDidMount() {
    this.props.loadStudents();
  }
  render() {
    return (
      <ul>
        {this.props.students.map(student => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(storeState) {
  return {
    students: storeState.students
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadStudents: function () {
      dispatch(fetchStudents());
    }
  };
}

const StudentListContainer = connect(mapStateToProps, mapDispatchToProps)(StudentList);

export default StudentListContainer;
