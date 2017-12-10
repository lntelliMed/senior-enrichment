import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Menu } from 'semantic-ui-react'

export default class Navbar extends Component {

  render() {
    return (
      <nav>
        <div className="campus-header">
          <div className="campus-header-buttons">
                <h2>Margaret Hamilton Interplanetary Academy of JavaScript</h2>
                <Button.Group>
                  <Link to="/campuses"><Button>Home</Button></Link>
                  <Button.Or />
                  <Link to="/students"><Button positive>Students</Button></Link>
                </Button.Group>
            </div>
          <div className="campus-header-logo">
                <Icon.Group size='big'>
                  <Icon loading size='huge' name='sun' />
                  <Icon name='student' />
                </Icon.Group>
            </div>
          </div>
          <hr />
      </nav>
    );
  }
}
