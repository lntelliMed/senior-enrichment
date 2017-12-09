import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react'
import { updateStudent, fetchStudent } from '../reducers/studentReducer'


class SingleStudent extends Component {
  constructor(props){
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        gpa: 0.0,
        campusName: '',
        campusId: 0
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleGpaChange = this.handleGpaChange.bind(this);
  }

  componentWillMount(){
    let theStudent = this.props.students.find((studentId => studentId.id === Number(this.props.match.params.studentId)));
    this.setState({
        firstName: theStudent.firstName,
        lastName: theStudent.lastName,
        email: theStudent.email,
        gpa: theStudent.gpa,
        campusName: theStudent.campus.name,
        campusId: theStudent.campus.id
        }
    );
  }

  // componentDidMount() {
  //   this.props.loadStudent();
  // }

  handleFirstNameChange(evt) {
    this.setState({firstName: evt.target.value });
  }
  handleLastNameChange(evt) {
    this.setState({lastName: evt.target.value });
  }
  handleCampusChange(evt, data) {
    this.setState({campusName: data.value, campusId: this.props.campuses.find((campus) =>
      {
        return campus.name === data.value;
      }
    ).id});
  }
  handleEmailChange(evt) {
    this.setState({email: evt.target.value });
  }
  handleGpaChange(evt) {
    this.setState({gpa: evt.target.value });
  }

  render () {
    return (
      <Form onSubmit={(evt) => this.props.handleSubmit(evt, this.state)}>
      <Form.Group widths='equal'>
          <Form.Input onChange={this.handleFirstNameChange} name='firstName' label='First Name' value={this.state.firstName} />
          <Form.Input onChange={this.handleLastNameChange} name='lastName' label='Last Name' value={this.state.lastName} />
      </Form.Group>
      <Form.Group widths='equal'>
          <Form.Input onChange={this.handleEmailChange} name='email' label='E-Mail' value={this.state.email} />
          <Form.Input onChange={this.handleGpaChange} name='gpa' label='GPA' value={this.state.gpa} />
      </Form.Group>

        {this.props.campuses &&
        <Form.Select label='Campus' onChange={(evt, data) => this.handleCampusChange(evt, data)} name='campusName' options={this.props.campuses.map((campus) => {
           return {
              text: campus.name,
              value: campus.name
           }
          })} placeholder='Campus' defaultValue={this.state.campusName} />}
      <Button type='submit'>Update</Button>
    </Form>
  )}
  }


function mapStateToProps(storeState) {
  return {
    students: storeState.students,
    campuses: storeState.campuses
  };
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleSubmit(evt, state) {
      evt.preventDefault();
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const gpa = evt.target.gpa.value;
      const campusId = state.campusId;
      dispatch(updateStudent({ firstName, lastName, email, gpa, campusId }, ownProps));
    }
    // ,
    // loadStudent: function () {
    //   dispatch(fetchStudent());
    // }

  };
};

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

export default SingleStudentContainer;
