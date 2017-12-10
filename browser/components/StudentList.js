import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStudents, deleteStudent } from '../reducers/studentReducer';
import { Header, Image, Table, Input, Icon} from 'semantic-ui-react'


class StudentList extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchFieldValue: ''
    }
  }

  componentDidMount() {
    this.props.loadStudents();
  }

  handleChange(event) {
    this.setState({
      searchFieldValue: event.target.value
    });
  }

  render() {
    let filteredStudents = this.props.students.filter(student => student.name.match(this.state.searchFieldValue));
    return (
      <div>

        <div className="search-student-header">
          <div className="search-student" >
            <Input onChange={event => this.handleChange(event)} placeholder='Search Students...' />
            <Link className="add-student" to="/add-student">
              <Icon bordered circular size='large' color='red' name='user add' />
            </Link>
          </div>
        </div>
        {filteredStudents.length > 0 &&
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
            {filteredStudents.map(student => {
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
        }
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
