import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextArea, Button, Form } from 'semantic-ui-react'
import { updateCampus } from '../reducers/campusReducer'


class UpdateCampus extends Component {
  constructor(props){
    super(props);
    this.state = {
      foundCampus: {
        name: '',
        imageUrl: '',
        description: ''
      }
    }

    this.handleCampusNameChange = this.handleCampusNameChange.bind(this);
    this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
  }

  componentWillMount() {
    let foundCampus = this.props.campuses.find((campus => campus.id === Number(this.props.match.params.campusId)));
    this.setState({
      name: foundCampus.name,
      imageUrl: foundCampus.imageUrl,
      description: foundCampus.description
    });
  }

  handleCampusNameChange(evt) {
    this.setState({ name: evt.target.value});
  }
  handleImageUrlChange(evt) {
    this.setState({ imageUrl: evt.target.value });
  }
  handleDescChange(evt) {
    this.setState({ description: evt.target.value });
  }

  render () {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input onChange={this.handleCampusNameChange} name='name' label='Campus Name' placeholder='Campus Name' value={this.state.name} error />
          <Form.Input onChange={this.handleImageUrlChange} name='imageUrl' label='Image URL' placeholder='Image URL' value={this.state.imageUrl} error />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field onChange={this.handleDescChange}  name='description' id='form-textarea-control-opinion' control={TextArea} label='Description' placeholder='Description' value={this.state.description} />
        </Form.Group>
        <Button type='submit'>Update</Button>
      </Form>
    );}
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
      const name = evt.target.name.value;
      const imageUrl = evt.target.imageUrl.value;
      const description = evt.target.description.value;
      dispatch(updateCampus({ name, imageUrl, description}, ownProps));
    }
  };
};

const UpdateCampusContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateCampus);

export default UpdateCampusContainer;
