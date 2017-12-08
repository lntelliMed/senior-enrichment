import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



const SingleCampus = (props) => {
    let foundCampus = props.campuses.find((campus => campus.id === Number(props.match.params.campusId)));
    return (
      <div>
        <h2>{`Welcome to our ${foundCampus.name} campus!`}</h2>
        <img src={foundCampus.imageUrl}></img>
        <p>{foundCampus.description}</p>

        <h3>{`Meet our students:`}</h3>

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
      </div>
    );
  }


function mapStateToProps(storeState) {
  return {
    campuses: storeState.campuses
  };
}



const SingleCampusContainer = connect(mapStateToProps)(SingleCampus);

export default SingleCampusContainer;
