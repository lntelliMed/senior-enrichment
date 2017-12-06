import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCampuses } from '../reducers/campusReducer';

class CampusList extends Component {
  componentDidMount() {
    this.props.loadCampuses();
  }
  render() {
    return (
      <ul>
        {this.props.campuses.map(campus => (
          <li key={campus.id}>
          {campus.name}
            {/* <img  src={campus.imageUrl}/> */}
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(storeState) {
  return {
    campuses: storeState.campuses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCampuses: function () {
      dispatch(fetchCampuses());
    }
  };
}

const CampusListContainer = connect(mapStateToProps, mapDispatchToProps)(CampusList);

export default CampusListContainer;
