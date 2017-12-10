import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStudents, deleteStudent } from '../reducers/studentReducer';
import { Header, Image, Table, Button, Icon} from 'semantic-ui-react'


class StudentList extends Component {
  componentDidMount() {
    this.props.loadStudents();
  }
  render() {
    return (
      <div>
        <Link to="/add-student">
          <Icon bordered circular size='big' color='red' name='user add' />
        </Link>
        <Table  sortable celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>#</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Campus</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.students.map(student => {
              return (
                <Table.Row key={student.id} >
                  <Table.Cell>
                    <Link key={student.id} to={`/students/${student.id}`}>
                        {student.id}
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    <Link key={student.id} to={`/students/${student.id}`}>
                      <Header as='h4' image>
                        <Icon name='student' />
                        <Header.Content>
                            {student.name}
                          </Header.Content>
                      </Header>
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    {student.campus  && <Link key={student.campus.id} to={`/campuses/${student.campus.id}`}>
                      <Header as='h4' image>
                        <Image src={student.campus.imageUrl} rounded size='mini' />
                        <Header.Content>
                          {student.campus.name}
                        </Header.Content>
                      </Header>
                    </Link>}
                  </Table.Cell>

                  <Table.Cell>
                      <Icon onClick={() => {
                          if (confirm("Are you sure?")) {
                            this.props.deleteStudent(student.id);
                          }
                          }}
                            bordered circular size='large' color='grey' name='user delete'>
                      </Icon>
                  </Table.Cell>
                </Table.Row>
            )})}

          </Table.Body>
        </Table>
      </div>

    );
  }
}


function mapStateToProps(storeState) {
  let students = storeState.students.sort((x, y) => x.id > y.id);
  return {
    students
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadStudents: function () {
      dispatch(fetchStudents());
    },
    deleteStudent: function (studentId) {
      dispatch(deleteStudent(studentId));
    }
  };
}

const StudentListContainer = connect(mapStateToProps, mapDispatchToProps)(StudentList);

export default StudentListContainer;
