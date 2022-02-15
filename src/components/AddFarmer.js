import React, { useState } from 'react';
import '../css/NewProfileForm.css';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';

const CREATE_FARMER = gql`
mutation CreateFarmer($input: CreateFarmerInput!){
  createFarmer (input: $input) {
      name
      bio
    }
  }
`;

const AddFarmer = ({ profile, clearInputs }) => {

  const navigate = useNavigate()
  const [createFarmer, { data, loading, error }] = useMutation(CREATE_FARMER);
  const [invalidField, setInvalidField] = useState(false);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (profile.name && profile.email && profile.region && profile.bio) {
      createFarmer({ variables: { input: { attributes: profile } } });
      setInvalidField(false);
      clearInputs();
      navigate('/farms');
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

export default AddFarmer;
