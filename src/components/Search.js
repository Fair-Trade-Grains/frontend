import React, { useState } from 'react';
import '../css/Search.css';

const Search = ({ handleChange }) => {

  const [text, setText] = useState('');
  const labelText = window.location.href.includes('grains') ? 'Grain Type' : 'Farm Name';
  
  const updateChange = (event) => {
    setText(event.target.value);
    handleChange(event.target.value.toLowerCase());
  }

  return (
    <form className='search-bar'>
      <label htmlFor='text'>{`Search by ${labelText}:`} </label>
      <input
        type='text'
        id='text'
        name='text'
        value={text}
        onChange={(event) => { updateChange(event) }}
      />
    </form>
  );
}

export default Search;
