import '../index.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NameSearch() {

  const nav = useNavigate();

  const sendDetails = async () => {
    const search = document.getElementById('search-anime').value

    let animename = search.toLowerCase();
    animename = animename.replace(' ','%20')

    const values = await fetch('https://kitsu.io/api/edge/anime?filter[text]='+animename);
    const response = await values.json();
    const avgrat = parseFloat(response.data[0].attributes.averageRating)/10;
    const useravgrat = avgrat + (avgrat*0.07)
    const genreurl = response.data[0].relationships.genres.links.related
    const genreFetch = await fetch(genreurl)
    const genreValues = await genreFetch.json()
    let genreValue = []
    genreValues.data.map((value)=>{
      genreValue.push(value.attributes.name)
      return 0
    })
    let episodes = null;
    if(response.data[0].attributes.episodeCount == null){
      const date = new Date(response.data[0].attributes.startDate)
      const currdate = new Date()
      let timediff = currdate - date
      episodes = Math.floor(timediff/ (7 * 24 * 60 * 60 * 1000));
    }else{
      episodes = response.data[0].attributes.episodeCount
    }

    const senddata = {
      genre:genreValue,
      type:response.data[0].attributes.showType,
      episodes:episodes,
      avgrat:avgrat,
      useravgrat:useravgrat
    }
    
    console.log(senddata)
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
