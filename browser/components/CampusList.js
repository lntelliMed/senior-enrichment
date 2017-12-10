import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCampuses, fetchStudents } from '../reducers/campusReducer';
import { Icon} from 'semantic-ui-react'

class CampusList extends Component {
  componentDidMount() {
    this.props.loadCampuses();
    // this.props.loadStudents();
  }

  render() {
    return (
      <div>
        <Link className="add-campus" to="/add-campus">
          <Icon bordered circular size='big' color='red' name='add' />
        </Link>
        <ul className="campus-list">
          {this.props.campuses.map(campus => (
              <Link key={campus.id} to={`/campuses/${campus.id}`}>
                <li >
                <figure>
                <img src={campus.imageUrl} />
                  <figcaption>{campus.name}</figcaption>
                </figure>
                </li>
              </Link>
          ))}
        </ul>

      </div>
    );
  }
}

function mapStateToProps(storeState) {
  return {
    campuses: storeState.campuses,
    // students: storeState.students
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCampuses: function () {
      dispatch(fetchCampuses());
    }
    // ,
    // loadStudents: function () {
    //   dispatch(fetchStudents());
    // }
  };
}

const CampusListContainer = connect(mapStateToProps, mapDispatchToProps)(CampusList);

export default CampusListContainer;
