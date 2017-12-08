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
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleGpaChange = this.handleGpaChange.bind(this);
  }

  handleFirstNameChange(evt) {
    this.setState({ studentFirstName: evt.target.value});
  }
  handleLastNameChange(evt) {
    this.setState({ studentLastName: evt.target.value });
  }
  // handleCampusChange(evt, campusName) {
  //   this.setState({ campusName });
  // }
  handleCampusChange(evt) {
    console.log(evt.target)
    this.setState({ campusName: evt.target.value });
  }
  handleEmailChange(evt) {
    this.setState({ studentEmail: evt.target.value });
  }
  handleGpaChange(evt) {
    this.setState({ studentGpa: evt.target.value });
  }
  render() {

    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input onChange={this.handleFirstNameChange} name='firstName' label='First Name' placeholder='First Name' value={this.state.firstName} error />
          <Form.Input onChange={this.handleLastNameChange} name='lastName' label='Last Name' placeholder='Last Name' value={this.state.lastName} error />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input onChange={this.handleEmailChange} name='email' label='E-mail' placeholder='E-mail' value={this.state.email} error />
          <Form.Input onChange={this.handleGpaChange} name='gpa' label='GPA' placeholder='GPA' value={this.state.gpa} error />
        </Form.Group>
        {/* <Form.Select onChange={(event, { value }) => this.handleCampusChange(event, value)} name='campusName' options={this.props.campuses.map((campus) => {
          return {
            key: campus.id,
            text: campus.name,
            value: campus.name
          }
        })} placeholder='Campus' value={this.state.campusName} error /> */}
        <Form.Group widths='equal'>

        <select onChange={(event) => this.handleCampusChange(event)} name='campusName' value={this.state.campusName}  >
          {this.props.campuses.map(campus => {
            return (
             <option>{campus.name}</option>
            );
          })}
        </select>
          </Form.Group>

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
      const campusName = evt.target.campusName.value;
      console.log(evt.target)
      // dispatch(postStudent({ firstName, lastName, campusName }, ownProps.history));
      dispatch(postStudent({ firstName, lastName, email, gpa, campusName}, ownProps.history));
    }
  };
};


const AddStudentContainer = connect(mapStateToProps, mapDispatchToProps)(AddStudent);

export default AddStudentContainer;
