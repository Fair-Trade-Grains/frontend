import React, { Component } from 'react';
import '../css/NewProfileForm.css';
import ReactModal from 'react-modal';
import usdaRegionMap from '../assets/usdaRegionMap.png';
import AddFarmer from './AddFarmer';

ReactModal.setAppElement('#root');

class NewProfileForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      business_phone: '',
      address: '',
      region: '',
      bio: '',
      photo_path: '',
      showModal: false,
      profile: {}
    }
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.updateCurrentProfile();
  }

  clearInputs = () => {
    this.setState({
      name: '',
      email: '',
      business_phone: '',
      address: '',
      region: '',
      bio: '',
      photo_path: '',
      showModal: false,
      profile: {}
    });
  }

  updateCurrentProfile = () => {
    const newProfile = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.business_phone,
      address: this.state.address,
      region: this.state.region,
      bio: this.state.bio,
      photoUrl: this.state.photo_path
    }
    this.setState({ profile: newProfile });
  }

  render() {
    return (
      <div className='new-profile-form'>
        <button onClick={() => { this.handleOpenModal() }}>See map of the regions!</button>
        <form className='new-farm-form'>
          <label htmlFor='name'>Your name or your farm's name: *required*</label>
          <input className='new-farm-form-input'
            type='text'
            id='name'
            placeholder='Smith Family Farm'
            name='name'
            value={this.state.name}
            onChange={event => this.handleChange(event)}
            required
          />
          <label htmlFor='email'>Your business email: *required*</label>
          <input className='new-farm-form-input'
            type='text'
            id='email'
            placeholder='example@email.com'
            name='email'
            value={this.state.email}
            onChange={event => this.handleChange(event)}
            required
          />
          <label htmlFor='business_phone'>Your business phone number: </label>
          <input className='new-farm-form-input'
            type='text'
            id='business_phone'
            placeholder='(xxx) xxx - xxxx'
            name='business_phone'
            value={this.state.business_phone}
            onChange={event => this.handleChange(event)}
          />
          <label htmlFor='address'>Your business address: </label>
          <input className='new-farm-form-input'
            type='text'
            id='address'
            placeholder='123 County Road, Denver, CO, 12345'
            name='address'
            value={this.state.address}
            onChange={event => this.handleChange(event)}
          />
          <label htmlFor='region'>Select your region (see the reference map above this form): *required*</label>
          <select className='new-farm-form-input'
            id='region'
            name='region'
            value={this.state.region}
            onChange={event => this.handleChange(event)}
            required
          >
            <option value=''>~~ Please choose an option ~~</option>
            <option value='Northeastern'>Northeastern</option>
            <option value='Eastern Mountain'>Eastern Mountain</option>
            <option value='Southern'>Southern</option>
            <option value='Great Lakes'>Great Lakes</option>
            <option value='Upper Midwest'>Upper Midwest</option>
            <option value='Heartland'>Heartland</option>
            <option value='Delta'>Delta</option>
            <option value='Northern Plains'>Northern Plains</option>
            <option value='Southern Plains'>Southern Plains</option>
            <option value='Mountain'>Mountain</option>
            <option value='Northwest'>Northwest</option>
            <option value='Pacific'>Pacific</option>
          </select>
          <label htmlFor='bio'>Personal and/or farm bio: *required*</label>
          <textarea className='new-farm-form-input'
            id='bio'
            placeholder='Tell us a little about your organization and your farming practices! (1000 characters or less)'
            name='bio'
            rows='6'
            value={this.state.bio}
            onChange={event => this.handleChange(event)}
            required
          ></textarea>
          <label htmlFor='photo_path'>Add a photo: </label>
          <input className='new-farm-form-input'
            type='file'
            id='photo_path'
            name='photo_path'
            accept='image/png, image/jpeg'
            value={this.state.photo_path}
            onChange={event => this.handleChange(event)}
          />
          <AddFarmer profile={this.state.profile} clearInputs={this.clearInputs}/>
        </form>
        <ReactModal isOpen={this.state.showModal} className='map-modal-container'>
          <button onClick={() => { this.handleCloseModal() }} className='close-modal-btn'>Close</button>
          <img className='usda-region-map' src={usdaRegionMap} alt='USDA Agriculture Regions Map' />
        </ReactModal>
      </div>
    );
  }
}

export default NewProfileForm;
