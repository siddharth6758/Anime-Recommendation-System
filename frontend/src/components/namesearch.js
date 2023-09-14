import '../index.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NameSearch() {

  const nav = useNavigate();

  const sendDetails = () => {
    const search = document.getElementById('search-anime').value
    const senddata = {name : search} 
    axios.post('http://127.0.0.1:5000/findanime',senddata).then((response)=>{
      if (response.data['status']==='OK'){
        nav('/findanime',{ state : response.data['userdata'] })
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className="body" id='name-search'>
        <form method='post' id='search-form'>
          <div className="form-item-search">
            <h2>Search Anime:</h2>
            <input type='search' name='search-anime' id='search-anime' autoComplete='off'/>
          </div>
          <div className="form-item-search">
            <input type='submit' className='genrebutton' value='Submit' onClick={(event)=>{sendDetails(); event.preventDefault();}}/>
          </div>
        </form>
    </div>
  );
}

export default NameSearch;
