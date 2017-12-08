import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react'
import { postStudent } from '../reducers/studentReducer'


class AddStudent extends Component {
  constructor(props){
    super(props);
    this.state = {
      studentFirstName: '',
      studentLastName: '',
      campusName: '',
      studentEmail: '',
      studentGpa: ''
    }

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
  }

  handleFirstNameChange(evt) {
    this.state.setState({ studentFirstName: evt.target.firstName.value});
  }
  handleLastNameChange(evt) {
    this.state.setState({ studentLastName: evt.target.lastName.value });
  }
  handleCampusChange(evt) {
    this.state.setState({ campusName: evt.target.campusName.value });
  }
  handleEmailChange(evt) {
    this.state.setState({ studentEmail: evt.target.email.value });
  }
  handleGpaChange(evt) {
    this.state.setState({ studentGpa: evt.target.gpa.value });
  }
  render() {
    // {
    //   let allCampuses = this.props.campuses.map((campus) => {
    //     return {
    //       text: campus.name
    //     }
    //   })
    // }
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input onChange={this.handleFirstNameChange} name='firstName' label='First name' placeholder='First name' value={this.state.firstName} error />
          <Form.Input onChange={this.handleLastNameChange} name='lastName' label='Last name' placeholder='Last name' value={this.state.lastName} error />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input onChange={this.handleEmailChange} name='email' label='E-mail' placeholder='E-mail' value={this.state.email} error />
          <Form.Input onChange={this.handleGpaChange} name='gpa' label='GPA' placeholder='GPA' value={this.state.gpa} error />
        </Form.Group>
        <Form.Select onChange={this.handleCampusChange} name='campusName' options={this.props.campuses.map((campus) => {
          return {
            text: campus.name
          }
        })} placeholder='Campus' value={this.state.campusName} error />
        <Button type='submit'>Submit</Button>
      </Form>
    );
  }

}


function mapStateToProps(storeState) {
  return {
    students: storeState.students,
    campuses: storeState.campuses
  };
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {

    handleSubmit(evt) {
      evt.preventDefault();
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const gpa = evt.target.gpa.value;
      // const campusName = evt.target.campusName.value;
      // dispatch(postStudent({ firstName, lastName, campusName }, ownProps.history));
      dispatch(postStudent({ firstName, lastName, email, gpa}, ownProps.history));
    }
  };
};


const AddStudentContainer = connect(mapStateToProps, mapDispatchToProps)(AddStudent);

export default AddStudentContainer;
