import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import StudentList from './StudentList';
import CampusList from './CampusList';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddStudent from './AddStudent';
import AddCampus from './AddCampus';
import UpdateCampus from './UpdateCampus';

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
                <Route exact path="/campuses/:campusId" component={SingleCampus} />
                <Route path="/campuses/:campusId/update-campus" component={UpdateCampus} />

                <Route exact path="/students" component={StudentList} />
                <Route path="/students/:studentId" component={SingleStudent} />
                <Route path="/add-student" component={AddStudent} />
                <Route path="/add-campus" component={AddCampus} />
                <Redirect to="/campuses" />
              </Switch>

            </main>
          </div>
        </Router>

    );
  }
}
