import React, { Component } from 'react';
import { connect } from 'react-redux';


const SingleCampus = (props) => {
    return (
      <div>
        {console.log(props.campuses)}
        {`Get the campus with ID ${props.match.params.campusId}`}

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
