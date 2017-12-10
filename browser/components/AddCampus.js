import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, TextArea } from 'semantic-ui-react'
import { postCampus } from '../reducers/campusReducer'


class AddCampus extends Component {
  constructor(props){
    super(props);
    this.state = {
      campusName: '',
      imageUrl: '',
      description: ''
    }

    this.handleCampusNameChange = this.handleCampusNameChange.bind(this);
    this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
  }

  handleCampusNameChange(evt) {
    this.setState({ campusName: evt.target.value});
  }
  handleImageUrlChange(evt) {
    this.setState({ imageUrl: evt.target.value });
  }
  handleDescChange(evt) {
    console.log(evt.target)
    this.setState({ description: evt.target.value });
  }

  render() {

    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input onChange={this.handleCampusNameChange} name='campusName' label='Campus Name' placeholder='Campus Name' value={this.state.campusName} error />
          <Form.Input onChange={this.handleImageUrlChange} name='imageUrl' label='Image URL' placeholder='Image URL' value={this.state.imageUrl} error />
        </Form.Group>
        <Form.Group widths='equal'>
        <Form.Field onChange={this.handleDescChange}  name='description' id='form-textarea-control-opinion' control={TextArea} label='Description' placeholder='Description' value={this.state.description} />

        </Form.Group>
        <Form.Group widths='equal'>
          </Form.Group>

        <Button type='submit'>Add</Button>
      </Form>
    );
  }

}

function mapStateToProps(storeState) {
  return {
    campuses: storeState.campuses
  };
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const name = evt.target.campusName.value;
      const imageUrl = evt.target.imageUrl.value;
      const description = evt.target.description.value;
      dispatch(postCampus({ name, imageUrl, description}, ownProps));
    }
  };
};


const AddCampusContainer = connect(mapStateToProps, mapDispatchToProps)(AddCampus);

export default AddCampusContainer;
