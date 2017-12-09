import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react'
import { updateStudent } from '../reducers/studentReducer'


class SingleStudent extends Component {
  constructor(props){
    super(props);

    // let theStudent = this.props.students.find((studentId => studentId.id === Number(this.props.match.params.studentId)));
    this.state = {
      foundStudent: {
        firstName: '',
        lastName: '',
        email: '',
        gpa: 0.0,
        campus: {
          name: ''
        }
      }
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleGpaChange = this.handleGpaChange.bind(this);
  }


  componentWillMount(){
    // this.setState({ foundStudent: this.props.students.find((studentId => studentId.id === Number(this.props.match.params.studentId))) });
    let theStudent = this.props.students.find((studentId => studentId.id === Number(this.props.match.params.studentId)));
    this.setState({
      foundStudent: {
        firstName: theStudent.firstName,
        lastName: theStudent.lastName,
        email: theStudent.email,
        gpa: theStudent.gpa,
        campus: {
          name: theStudent.campus.name
        }
      }
    });
    console.log('------- ', this.state)
  }

  handleFirstNameChange(evt) {
    this.setState({ foundStudent: {firstName: evt.target.value }});
  }
  handleLastNameChange(evt) {
    this.setState({ foundStudent: {lastName: evt.target.value }});
  }
  // handleCampusChange(evt, campusName) {
  //   this.setState({ campusName });
  // }
  handleCampusChange(evt, data) {
    console.log(evt.target)
    // this.setState({ campusName: data.value });
    this.setState({ foundStudent: {campus: {name: data.value} }});

  }
  handleEmailChange(evt) {
    this.setState({ foundStudent: {email: evt.target.value }});
  }
  handleGpaChange(evt) {
    this.setState({ foundStudent: {gpa: evt.target.value }});
  }

//console.log(foundStudent)
  render () {
    // <div>
    //   {console.log(props.students)}
    //   {console.log(foundStudent.firstName)}
    //   {`Get the student with ID ${props.match.params.studentId}`}
    //   <h2>{`Welcome to our ${foundStudent.firstName} campus!`}</h2>

    // </div>
    return (
      <Form onSubmit={(evt) => this.props.handleSubmit(evt, this.state)}>
      <Form.Group widths='equal'>
          <Form.Input onChange={this.handleFirstNameChange} name='firstName' label='First Name' value={this.state.foundStudent.firstName} />
          <Form.Input onChange={this.handleLastNameChange} name='lastName' label='Last Name' value={this.state.foundStudent.lastName} />
      </Form.Group>
      <Form.Group widths='equal'>
          <Form.Input onChange={this.handleEmailChange} name='email' label='E-Mail' value={this.state.foundStudent.email} />
          <Form.Input onChange={this.handleGpaChange} name='gpa' label='GPA' value={this.state.foundStudent.gpa} />
      </Form.Group>

        {/* <select onChange={(event) => this.handleCampusChange(event)} name='campusName'  name='campusName' value={this.state.foundStudent.campus}  >
          {this.state.foundStudent.campus && <option selected > {this.state.foundStudent.campus.name}</option>}

        {this.props.campuses.map(campus => {
          return (
            // foundStudent.campus.name === campus.name ?  : null
            <option selected > { campus.name }</option>
          );
        })}
      </select> */}

        <Form.Select onChange={(evt, data) => this.handleCampusChange(evt, data)} name='campusName' options={this.props.campuses.map((campus) => {
           return {
              text: campus.name,
              value: campus.name

           }
         })} placeholder='Campus' defaultValue={this.state.foundStudent.campus.name} error />
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
      // const campusName = evt.target.campusName.value;
      const campusName = state.foundStudent.campus.name;
      console.log(evt.target)
      // dispatch(postStudent({ firstName, lastName, campusName }, ownProps.history));
      console.log('444444444 ', ownProps)
      dispatch(updateStudent({ firstName, lastName, email, gpa, campusName }, ownProps));
    }
  };
};

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

export default SingleStudentContainer;
