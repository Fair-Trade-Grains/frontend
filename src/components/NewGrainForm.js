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
      farmers_notes: ''
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
      farmers_notes: ''
    })
  }

  submitProfile = event => {
    event.preventDefault();

    const farmID = this.props.farmId
    // the above farmID is being got from the UpdateFarmerProfile useParams and passed in to this form as props via farmId
    // console.log('farmID inside submit method: ', farmID)
    // here's where we're gonna write what happens when you submit a profile!
    this.clearInputs();
  }

render(){
  return(
    <div className='new-grain-container'>
      <form className='new-grain-form'>
        <label htmlFor='name'>Grain name/type: </label>
        <input
            className='new-grain-input'
            type='text'
            placeholder='Turkey Red Wheat'
            id='name'
            name='name'
            value={this.state.name}
            onChange={event => this.handleChange(event)}
        />
        <label htmlFor='proteiin'>Protein: </label>
        <input
            className='new-grain-input'
            type='number'
            placeholder='12.0'
            id='protein'
            name='protein'
            min='8'
            max='18'
            step='0.1'
            value={this.state.protein}
            onChange={event => this.handleChange(event)}
        />
        <label htmlFor='test_weight'>Test Weight: </label>
        <input
            className='new-grain-input'
            type='number'
            placeholder='60'
            id='test_weight'
            name='test_weight'
            min='50'
            max='64'
            step='1'
            value={this.state.test_weight}
            onChange={event => this.handleChange(event)}
        />
        <label htmlFor='moisture'>Moisture: </label>
        <input
            className='new-grain-input'
            type='number'
            placeholder='11.5'
            name='moisture'
            id='moisture'
            min='8'
            max='15'
            step='0.1'
            value={this.state.moisture}
            onChange={event => this.handleChange(event)}
        />
        <label htmlFor='falling_number'>Falling Number: </label>
        <input
            className='new-grain-input'
            type='number'
            placeholder='300'
            id='falling_number'
            name='falling_number'
            min='200'
            max='400'
            step='10'
            value={this.state.falling_number}
            onChange={event => this.handleChange(event)}
        />
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
        <button onClick={event => this.submitProfile(event)} className='update-farmer-nav-btn'>Submit</button>
        </form>
      </div>
    )
  }

}

export default NewGrainForm;
