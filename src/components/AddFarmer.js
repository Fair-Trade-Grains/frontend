import React from 'react';
import '../css/NewProfileForm.css'
import { gql, useMutation } from '@apollo/client';

const CREATE_FARMER = gql`
mutation CreateFarmer($input: CreateFarmerInput!){
  createFarmer (input: $input) {
          name
          bio
          }
      }
`;

const AddFarmer = ({ profile }) => {
  let input;
  const [createFarmer, { data, loading, error }] = useMutation(CREATE_FARMER);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
        <button className='profile-submit-btn' onClick={e => {
          e.preventDefault();
          createFarmer({ variables: { input: profile }});
        }} type="submit">Submit</button>
    </div>
  );
}

export default AddFarmer;
