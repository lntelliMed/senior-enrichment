import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCampuses, fetchStudents } from '../reducers/campusReducer';
import { Icon, Input } from 'semantic-ui-react'

class CampusList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFieldValue: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.loadCampuses();
    // this.props.loadStudents();
  }

  handleChange(event) {
    this.setState({
      searchFieldValue: event.target.value
    });
  }
  render() {
    let filteredCampuses = this.props.campuses.filter(campus => campus.name.match(this.state.searchFieldValue));
    return (
      <div>
        <div className="search-campus-header">
          <div className="search-campus" >
            <Input onChange={event => this.handleChange(event)} placeholder='Search Campuses...' />
            <Link className="add-campus" to="/add-campus">
              <Icon bordered circular size='large' color='red' name='add' />
            </Link>
          </div>

        </div>
        <ul className="campus-list">
          {filteredCampuses.map(campus => (
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
