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
      campusId: 0,
      studentEmail: '',
      studentGpa: ''
    }

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleGpaChange = this.handleGpaChange.bind(this);
  }

  handleFirstNameChange(evt) {
    this.setState({ studentFirstName: evt.target.value});
  }
  handleLastNameChange(evt) {
    this.setState({ studentLastName: evt.target.value });
  }
  handleCampusChange(evt, data) {
    this.setState({
      campusName: data.value,
      campusId: this.props.campuses.find((campus) => {
        return campus.name === data.value;
      }).id
    });
  }
  handleEmailChange(evt) {
    this.setState({ studentEmail: evt.target.value });
  }
  handleGpaChange(evt) {
    this.setState({ studentGpa: evt.target.value });
  }

  render() {
    return (
      <Form onSubmit={(evt) => this.props.handleSubmit(evt, this.state)}>
        <Form.Group widths='equal'>
          <Form.Input onChange={this.handleFirstNameChange} name='firstName' label='First Name' placeholder='First Name' value={this.state.firstName} error />
          <Form.Input onChange={this.handleLastNameChange} name='lastName' label='Last Name' placeholder='Last Name' value={this.state.lastName} error />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input onChange={this.handleEmailChange} name='email' label='E-mail' placeholder='E-mail' value={this.state.email} error />
          <Form.Input onChange={this.handleGpaChange} name='gpa' label='GPA' placeholder='GPA' value={this.state.gpa} error />
        </Form.Group>
        {this.props.campuses &&
          <Form.Select label='Campus' onChange={(evt, data) => this.handleCampusChange(evt, data)} name='campusName' options={this.props.campuses.map((campus) => {
            return {
              text: campus.name,
              value: campus.name
            }
          })} placeholder='Campus' error />}
        <Button type='submit'>Add</Button>
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
    handleSubmit(evt, internalState) {
      evt.preventDefault();
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const gpa = evt.target.gpa.value;
      const campusId = internalState.campusId;
      dispatch(postStudent({ firstName, lastName, email, gpa, campusId}, ownProps));
    }
  };
};

const AddStudentContainer = connect(mapStateToProps, mapDispatchToProps)(AddStudent);

export default AddStudentContainer;
