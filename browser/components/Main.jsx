import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import StudentList from './StudentList';
import CampusList from './CampusList';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddStudent from './AddStudent';

export default class Root extends Component {

  render() {
    return (
      <Router>
          <div>
            <Navbar />
            <main>
              {/* <h3><CampusList /></h3> */}

              <Switch>
                <Route exact path="/campuses" component={CampusList} />
                <Route path="/campuses/:campusId" component={SingleCampus} />
                <Route exact path="/students" component={StudentList} />
                <Route path="/students/:studentId" component={SingleStudent} />
                <Route path="/add-student" component={AddStudent} />
                <Redirect to="/campuses" />
              </Switch>

            </main>
          </div>
        </Router>

    );
  }
}
