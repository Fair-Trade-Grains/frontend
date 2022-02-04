import React, {useState} from 'react';
import '../css/Search.css';

const Search = ({handleChange}) => {

  const [text, setText] = useState("")
  // can reuse this component according to params?
  // i.e. if path is "/browse", assign labelName a certain value
  // const labelName = "Filter By Grain Type" || "Filter by Farm Name"
  
  const updateChange = (event) => {
    setText(event.target.value)
    handleChange(event.target.value.toLowerCase())
  }

  return (
    <form className="search-bar">
      {/* <label htmlFor="text">{labelName}: </label> */}
      <label htmlFor="text">Search by Grain Type: </label>
      <input
        type="text"
        id="text"
        name="text"
        value={text}
        onChange={(event) => {updateChange(event)}}
      />
      <button>SEARCH</button>
    </form>
  )
}

export default Search;
