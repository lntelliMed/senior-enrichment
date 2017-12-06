import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import StudentList from './StudentList';
import CampusList from './CampusList';

export default class Root extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <main>
          <h3><CampusList /></h3>

          <h4><StudentList /></h4>
        </main>
      </div>
    );
  }
}
