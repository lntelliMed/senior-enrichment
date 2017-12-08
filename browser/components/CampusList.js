import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCampuses } from '../reducers/campusReducer';
import { Header, Image, Table, Button, Icon} from 'semantic-ui-react'

class CampusList extends Component {
  componentDidMount() {
    this.props.loadCampuses();
    // console.log('--------- ', this.props.campuses);
  }
  render() {
    return (
      <div>
        <Link to="/add-campus">< Icon  bordered circular size='large' color='red' name='add button' /></Link>
        <ul className="campus-list">
          {this.props.campuses.map(campus => (
              <Link key={campus.id} to={`/campuses/${campus.id}`}>
              {/* <div className="campus-item"> */}
                <li >
                <figure>
                <img src={campus.imageUrl} />
                  <figcaption>{campus.name}</figcaption>

                </figure>
                </li>
              {/* <p>{campus.name}</p> */}
              {/* </div> */}
              </Link>
          ))}
        </ul>
      </div>
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
