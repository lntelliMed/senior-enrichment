import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStudents } from '../reducers/studentReducer';

class StudentList extends Component {
  componentDidMount() {
    this.props.loadStudents();
  }
  render() {
    return (
      <ul>
        {this.props.students.map(student => (
          <Link to={`/students/${student.id}`}>
            <li key={student.id}>
              {student.name}
            </li>
          </Link>
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
