import React, { Component } from 'react';
import '../css/NewProfileForm.css';

class NewProfileForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      email: '',
      phone: '',
      photo: '',
      bio: ''
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  clearInputs = () => {
    this.setState({
      name: '',
      address: '',
      email: '',
      phone: '',
      photo: '',
      bio: ''
    })
  }

  submitProfile = event => {
    event.preventDefault();
    // here's where we're gonna write what happens when you submit a profile!
    this.clearInputs();
  }

render(){
  return(
    <div className='new-profile-form'>
      <form className="new-farm-form">
        <input className="new-farm-form-input"
            type='text'
            placeholder='Your name or organization'
            name='name'
            value={this.state.name}
            onChange={event => this.handleChange(event)}
          />
        <input className="new-farm-form-input"
            type='text'
            placeholder='Address'
            name='address'
            value={this.state.address}
            onChange={event => this.handleChange(event)}
          />
        <input className="new-farm-form-input"
            type='text'
            placeholder='Email'
            name='email'
            value={this.state.email}
            onChange={event => this.handleChange(event)}
          />
        <input className="new-farm-form-input"
            type='text'
            placeholder='Phone number'
            name='phone'
            value={this.state.phone}
            onChange={event => this.handleChange(event)}
          />
        <input className="new-farm-form-input"
            type='text'
            placeholder='Ultimately this is gonna be where you upload a photo'
            name='photo'
            value={this.state.photo}
            onChange={event => this.handleChange(event)}
          />
        <input className="new-farm-form-input"
            type='text'
            placeholder='Tell us a little about your organization and your farming practices!'
            name='bio'
            value={this.state.bio}
            onChange={event => this.handleChange(event)}
          />
        <button className='profile-submit-btn' onClick={event => this.submitProfile(event)}>Submit</button>
        </form>
      </div>
    )
  }

}

export default NewProfileForm;
