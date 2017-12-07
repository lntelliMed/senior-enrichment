import React, { Component } from 'react';
import { connect } from 'react-redux';


const SingleStudent = (props) => {
    return (
      <div>
        {console.log(props.students)}
        {`Get the student with ID ${props.match.params.studentId}`}
      </div>
    );
  }




function mapStateToProps(storeState) {
  return {
    students: storeState.students
  };
}



const SingleStudentContainer = connect(mapStateToProps)(SingleStudent);

export default SingleStudentContainer;
