import React, { Component } from 'react';
import '../css/NewGrainForm.css';

class NewGrainForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      protein: '',
      test_weight: '',
      moisture: '',
      falling_number: '',
      notes: ''
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  clearInputs = () => {
    this.setState({
      name: '',
      protein: '',
      test_weight: '',
      moisture: '',
      falling_number: '',
      notes: ''
    })
  }

  submitProfile = event => {
    event.preventDefault();
    // here's where we're gonna write what happens when you submit a profile!
    this.clearInputs();
  }

render(){
  return(
    <div className='new-grain-form'>
      <form>
        <input
            type='text'
            placeholder='Grain name'
            name='name'
            value={this.state.name}
            onChange={event => this.handleChange(event)}
          />
        <input
            type='text'
            placeholder='Protein'
            name='protein'
            value={this.state.protein}
            onChange={event => this.handleChange(event)}
          />
        <input
            type='text'
            placeholder='Test Weight'
            name='test_weight'
            value={this.state.test_weight}
            onChange={event => this.handleChange(event)}
          />
        <input
            type='text'
            placeholder='Moisture'
            name='moisture'
            value={this.state.moisture}
            onChange={event => this.handleChange(event)}
          />
        <input
            type='text'
            placeholder='Falling number'
            name='falling_number'
            value={this.state.falling_number}
            onChange={event => this.handleChange(event)}
          />
        <input
            type='text'
            placeholder='Description or other notes'
            name='notes'
            value={this.state.notes}
            onChange={event => this.handleChange(event)}
          />
        <button onClick={event => this.submitProfile(event)}>Submit</button>
        </form>
      </div>
    )
  }

}

export default NewGrainForm;
