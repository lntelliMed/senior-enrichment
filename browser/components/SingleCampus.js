import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



const SingleCampus = (props) => {
    let foundCampus = props.campuses.find((campus => campus.id === Number(props.match.params.campusId)));
    return (
      <ul className="student-list">
        {/* {`Get the campus with ID ${props.match.params.campusId}`} */}
        {foundCampus && foundCampus.students.map(student => (
          <Link key={student.id} to={`/students/${student.id}`}>
            <li >
              {student.name}
            </li>
          </Link>
        ))}
      </ul>
    );
  }


function mapStateToProps(storeState) {
  return {
    campuses: storeState.campuses
  };
}



const SingleCampusContainer = connect(mapStateToProps)(SingleCampus);

export default SingleCampusContainer;
