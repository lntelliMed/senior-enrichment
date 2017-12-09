import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Image, Table, Button, Icon, Menu} from 'semantic-ui-react'
import { updateCampus, deleteCampus } from '../reducers/campusReducer';



class SingleCampus extends Component {
    constructor(props){
      super(props);
      this.state = {
          foundCampus: this.props.campuses.find((campus => campus.id === Number(this.props.match.params.campusId)))
      }
    }
    render () {


    return (
      <div>
                <h3>{`Welcome to our ${this.state.foundCampus.name} campus!`}</h3>


                <img src={this.state.foundCampus.imageUrl}></img>
        <p>{this.state.foundCampus.description}</p>


                              {/* <Menu>

            <Menu.Item> */}
             <Button.Group>
              <Link to="/campuses">      <Button onClick={() => {
                      if (confirm("Are you sure?")) {
                        this.props.deleteCampus(this.state.foundCampus.id);
                      }
                    }} circular color='google plus' icon='remove' size='mini' >Delete</Button></Link>
              <Button.Or />
              <Link to={`/campuses/${this.state.foundCampus.id}/update-campus`}><Button positive>Update</Button></Link>
            </Button.Group>
                    {/* </Menu.Item>


     </Menu> */}

                  {/* <Button onClick={() => {
                      if (confirm("Are you sure?")) {
                        this.props.deleteCampus(this.state.foundCampus.id);
                      }
                    }} circular color='google plus' icon='remove' size='mini' />
            <Link to={`/campuses/${this.state.foundCampus.id}/update-campus`}>
                    <Button circular color='google plus' icon='update' size='mini' />
            </Link> */}








        <h3>{`Meet our students:`}</h3>

        <ul className="student-list">
          {/* {`Get the campus with ID ${props.match.params.campusId}`} */}
          {this.state.foundCampus && this.state.foundCampus.students.map(student => (
            <Link key={student.id} to={`/students/${student.id}`}>
              <li >
                {student.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  } }


function mapStateToProps(storeState) {
  return {
    campuses: storeState.campuses
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    deleteCampus: function (campusId) {
      dispatch(deleteCampus(campusId, ownProps));
    },
    updateCampus: function (campus) {
      dispatch(updateCampus(campus, ownProps));
    }
  };
}


const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;


