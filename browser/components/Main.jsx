import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import StudentList from './StudentList';
import CampusList from './CampusList';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';

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
              </Switch>

            </main>
          </div>
        </Router>

    );
  }
}
