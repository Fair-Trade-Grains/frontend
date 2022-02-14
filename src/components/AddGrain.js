import React from 'react';
import '../css/NewGrainForm.css'
import { gql, useMutation } from '@apollo/client';

const CREATE_GRAIN = gql`
mutation CreateGrain($input: CreateGrainInput!){
  createGrain (input: $input) {
          name
          farmersNotes
          }
      }
`;

const AddGrain = ({ grainProfile }) => {
  let input;
  const [createGrain, { data, loading, error }] = useMutation(CREATE_GRAIN);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
        <button className='profile-submit-btn' onClick={e => {
          e.preventDefault();
          createGrain({ variables: { input: grainProfile }});
        }} type="submit">Submit</button>
    </div>
  );
}

export default AddGrain;
