import React, { Component } from 'react';
import '../css/NewGrainForm.css';

import AddGrain from './AddGrain';

class NewGrainForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      protein: '',
      test_weight: '',
      moisture: '',
      falling_number: '',
      farmers_notes: ''
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
    this.updateGrainProfile();
  }

  updateGrainProfile = () => {
    const farmID = this.props.farmId
    const newGrain = {
      farmerId: parseInt(farmID),
      name: this.state.name,
      protein: parseFloat(this.state.protein),
      testWeight: parseFloat(this.state.test_weight),
      moisture: parseFloat(this.state.moisture),
      fallingNumber: parseFloat(this.state.falling_number),
      farmersNotes: this.state.farmers_notes
    }
    this.setState({ grainProfile: newGrain })
  }

  clearInputs = () => {
    this.setState({
      name: '',
      protein: '',
      test_weight: '',
      moisture: '',
      falling_number: '',
      farmers_notes: ''
    })
  }

  submitProfile = event => {
    event.preventDefault();
    if (this.state.name && this.state.protein && this.state.test_weight && this.state.moisture && this.state.falling_number) {
      // the above farmID is being got from the UpdateFarmerProfile useParams and passed in to this form as props via farmId
      // console.log('farmID inside submit method: ', farmID)
      // here's where we're gonna write what happens when you submit a profile!
      this.clearInputs();
    }
  }

render(){
  return(
    <div className='new-grain-container'>
      <form className='new-grain-form'>
        <label htmlFor='name'>Grain name/type: <span className='asterisk'>*</span></label>
        <input
          className='new-grain-input'
          type='text'
          placeholder='Turkey Red Wheat'
          id='name'
          name='name'
          value={this.state.name}
          onChange={event => this.handleChange(event)}
          required
        />
        <div className='form-numbers'>
        <label htmlFor='protein'>Protein: <span className='asterisk'>*</span></label>
        <input
          className='new-grain-input numeral'
          type='number'
          placeholder='12.0'
          id='protein'
          name='protein'
          min='8'
          max='18'
          step='0.1'
          value={this.state.protein}
          onChange={event => this.handleChange(event)}
          required
        />
        <label htmlFor='test_weight'>Test Weight: <span className='asterisk'>*</span></label>
        <input
          className='new-grain-input numeral'
          type='number'
          placeholder='60'
          id='test_weight'
          name='test_weight'
          min='50'
          max='64'
          step='1'
          value={this.state.test_weight}
          onChange={event => this.handleChange(event)}
          required
        />
        <label htmlFor='moisture'>Moisture: <span className='asterisk'>*</span></label>
        <input
          className='new-grain-input numeral'
          type='number'
          placeholder='11.5'
          name='moisture'
          id='moisture'
          min='8'
          max='15'
          step='0.1'
          value={this.state.moisture}
          onChange={event => this.handleChange(event)}
          required
        />
        <label htmlFor='falling_number'>Falling Number: <span className='asterisk'>*</span></label>
        <input
          className='new-grain-input numeral'
          type='number'
          placeholder='300'
          id='falling_number'
          name='falling_number'
          min='200'
          max='400'
          step='10'
          value={this.state.falling_number}
          onChange={event => this.handleChange(event)}
          required
        />
        </div>
        <label htmlFor='farmers_notes'>Any notes to share on this grain: </label>
        <input
          className='new-grain-input'
          type='text'
          placeholder='Description or other notes'
          id='farmers_notes'
          name='farmers_notes'
          value={this.state.farmers_notes}
          onChange={event => this.handleChange(event)}
          />
          <p> (Fields with a <span className='asterisk'>*</span> are required.)</p>
        <AddGrain grainProfile={this.state.grainProfile} />
        </form>
      </div>
    )
  }

}

export default NewGrainForm;
