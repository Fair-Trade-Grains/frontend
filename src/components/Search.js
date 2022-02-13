import React, {useState} from 'react';
import '../css/Search.css';

const Search = ({handleChange}) => {

  const [text, setText] = useState("")
  const labelText = window.location.href.includes('grains') ? 'Grain Type' : 'Farm Name'

  const updateChange = (event) => {
    setText(event.target.value)
    handleChange(event.target.value.toLowerCase())
  }

  return (
    <div className='search-container'>
      <form className="search-bar">
        <label htmlFor="text">{`Search by ${labelText}:`} </label>
        <input
          className='search-field'
          type="text"
          id="text"
          name="text"
          value={text}
          onChange={(event) => {updateChange(event)}}
        />
      </form>
    </div>
  )
}

export default Search;
