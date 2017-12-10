import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Menu } from 'semantic-ui-react'

export default class Navbar extends Component {

  render() {
    return (
      <nav>
        <div className="school-header">
          <div className="school-header-buttons">
                <h2>Margaret Hamilton Interplanetary Academy of JavaScript</h2>
                <Button.Group>
                  <Link to="/campuses"><Button>Home</Button></Link>
                  <Button.Or />
                  <Link to="/students"><Button positive>Students</Button></Link>
                </Button.Group>
            </div>
            <div className="school-header-logo">
                <Icon.Group size='big'>
                  <Icon loading size='huge' name='sun' />
                  <Icon name='student' />
                </Icon.Group>
            </div>
          </div>
          <hr />
        {/* <Icon name='student' size='massive' /> */}
          {/* <Header
            as='h1'
            image='/assets/images/icons/school.png'

            content='Margaret Hamilton Interplanetary Academy of JavaScript'
          /> */}
{/*

  <Menu>
            <Menu.Item>
                <Icon.Group size='large'>
              <Icon loading size='big' name='sun' />
              <Icon name='student' />
            </Icon.Group>
                    </Menu.Item>
        <Menu.Item>
            <h2>Margaret Hamilton Interplanetary Academy of JavaScript</h2>
    </Menu.Item>
            <Menu.Item>
             <Button.Group>
              <Link to="/campuses"><Button>Home</Button></Link>
              <Button.Or />
              <Link to="/students"><Button positive>Students</Button></Link>
            </Button.Group>
                    </Menu.Item>


    {/* <Menu.Item>
      <Link to="/campuses"><Button primary>Campuses</Button></Link>

    </Menu.Item>

    <Menu.Item>
      <Link to="/students"><Button>Students</Button></Link>
    </Menu.Item>  </Menu>*/}

      </nav>
    );
  }
}


