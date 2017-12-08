import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react'


class SingleStudent extends Component {
  constructor(props){
    super(props);
    this.state = {
      foundStudent: {}
    }
    console.log(this.state.foundStudent)
  }
  componentDidMount(){
    this.setState({foundStudent: this.props.students.find((studentId => studentId.id === Number(this.props.match.params.studentId)))});
    console.log('------- ', this.state)
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
    <Form>
      <Form.Group widths='equal'>
        <Form.Input name='firstName' label='First Name' value={this.state.foundStudent.firstName} />
          <Form.Input name='lastName' label='Last Name' value={this.state.foundStudent.lastName} />
      </Form.Group>
      <Form.Group widths='equal'>
          <Form.Input name='email' label='E-Mail' value={this.state.foundStudent.email} />
          <Form.Input name='gpa' label='GPA' value={this.state.foundStudent.gpa} />
      </Form.Group>

        <select name='campusName' value={this.state.foundStudent.campus}  >
          {this.state.foundStudent.campus && <option selected > {this.state.foundStudent.campus.name}</option>}

        {this.props.campuses.map(campus => {
          return (
            // foundStudent.campus.name === campus.name ?  : null
            <option selected > { campus.name }</option>
          );
        })}
      </select>

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


const SingleStudentContainer = connect(mapStateToProps)(SingleStudent);

export default SingleStudentContainer;
