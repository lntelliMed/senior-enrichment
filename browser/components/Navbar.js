import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon } from 'semantic-ui-react'

export default class Navbar extends Component {

  render() {
    return (
      <nav>
        <div className="school-header">
          <div>
            <Icon.Group size='huge'>
              <Icon loading size='big' name='sun' />
              <Icon name='student' />
            </Icon.Group>
          </div>
          <div>
            <h2>Margaret Hamilton Interplanetary Academy of JavaScript</h2>
            <Button.Group>
              <Link to="/campuses"><Button>Home</Button></Link>
              <Button.Or />
              <Link to="/students"><Button positive>Students</Button></Link>
            </Button.Group>


            </div>

          </div>
          <hr />
        {/* <Icon name='student' size='massive' /> */}
          {/* <Header
            as='h1'
            image='/assets/images/icons/school.png'

            content='Margaret Hamilton Interplanetary Academy of JavaScript'
          /> */}





      </nav>
    );
  }
}


