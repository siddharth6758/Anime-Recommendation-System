import '../index.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NameSearch() {

  const nav = useNavigate();

  const sendDetails = () => {
    const search = document.getElementById('search-anime').value
    nav('/findanime',{state:{search}})
  }

  return (
    <div className="body" id='name-search'>
        <form method='post' action='/findanime' id='search-form'>
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
