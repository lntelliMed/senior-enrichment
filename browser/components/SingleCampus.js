import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon, List} from 'semantic-ui-react'
import { updateCampus, deleteCampus, fetchCampuses } from '../reducers/campusReducer';
import { fetchStudents } from '../reducers/studentReducer';


class SingleCampus extends Component {
    constructor(props){
      super(props);
    }

    componentWillMount() {
      this.props.loadStudents();
    }

    render () {

      return (
        <div>
          <h3>{`Welcome to our ${this.props.foundCampus.name} campus!`}</h3>
          <img src={this.props.foundCampus.imageUrl}></img>
          <p>{this.props.foundCampus.description}</p>
          <Button.Group>

            <Link to="/campuses">
              <Button onClick={() => {
                    if (confirm("Are you sure?")) {
                      this.props.deleteCampus(this.props.foundCampus.id);
                    }
                  }} circular color='google plus' size='mini' >
                Delete
              </Button>
            </Link>

            <Button.Or />

            <Link to={`/campuses/${this.props.foundCampus.id}/update-campus`}>
              <Button positive>Update</Button>
            </Link>

          </Button.Group>
          <p></p>
          {this.props.foundCampusStudents.length > 0 &&
          <div>
          <h3>{`Meet our students:`}</h3>
          <List animated verticalAlign='middle'>
            {this.props.foundCampusStudents.length > 0 && this.props.foundCampusStudents.map(student => (
              <Link key={student.id} to={`/students/${student.id}`}>
                <List.Item>
                    <Icon bordered circular size='medium' color='black' name='user circle' />
                   {student.name}
                </List.Item>
              </Link>
            ))}
          </List>
          </div>
          }

        </div>
      );
  } }


function mapStateToProps(storeState, ownProps) {
  let foundCampus = storeState.campuses.find((campus => campus.id === Number(ownProps.match.params.campusId)));
  let foundCampusStudents = storeState.students.filter((student => student.campusId === Number(ownProps.match.params.campusId)));
  return {
    foundCampus,
    foundCampusStudents
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    deleteCampus: function (campusId) {
      dispatch(deleteCampus(campusId, ownProps));
    },
    updateCampus: function (campus) {
      dispatch(updateCampus(campus, ownProps));
    },
    loadStudents: function () {
      dispatch(fetchStudents());
    }
  };
}


const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;
