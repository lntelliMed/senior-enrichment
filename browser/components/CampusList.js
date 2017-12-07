import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
          <Link key={campus.id} to={`/campuses/${campus.id}`}>
          <li >
          {campus.name}
          </li>
          <img src={campus.imageUrl} />
          </Link>
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
