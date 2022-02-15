import React, { useState } from 'react';
import '../css/NewGrainForm.css';
import { gql, useMutation } from '@apollo/client';

const CREATE_GRAIN = gql`
mutation CreateGrain($input: CreateGrainInput!){
  createGrain (input: $input) {
      name
      farmersNotes
    }
  }
`;

const AddGrain = ({ grainProfile, clearInputs, closeModal }) => {

  const [createGrain, { data, loading, error }] = useMutation(CREATE_GRAIN);
  const [invalidField, setInvalidField] = useState(false);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (grainProfile.name && grainProfile.protein && grainProfile.testWeight && grainProfile.moisture && grainProfile.fallingNumber) {
      createGrain({ variables: { input: { attributes: grainProfile } } });
      setInvalidField(false);
      clearInputs();
      closeModal();
    } else {
      setInvalidField(true);
    }
  }

  return (
    <div>
      <button className='profile-submit-btn' onClick={e => { handleSubmit(e) }} type='submit'>Submit</button>
      {invalidField && <p>Please fill out all required fields.</p>}
    </div>
  );
}

export default AddGrain;
