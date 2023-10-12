import '../index.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NameSearch() {

  const nav = useNavigate();

  const rating_dict = {
    'R - 17+ (violence & profanity)': 0,
    'PG-13 - Teens 13 or older': 1, 
    'PG - Children': 2, 
    'R+ - Mild Nudity': 3, 
    'G - All Ages': 4, 
    'Rx - Hentai': 5
  }

  function gettime(time_str) {
    let hours = 0;
    let minutes = 0;
    const hoursMatch = time_str.match(/(\d+) hr\./);
    const minutesMatch = time_str.match(/(\d+) min/);

    if (hoursMatch) {
        hours = parseInt(hoursMatch[1]);
    }
    if (minutesMatch) {
        minutes = parseInt(minutesMatch[1]);
    }

    const totalMinutes = hours * 60 + minutes;
    const decimalHours = totalMinutes / 60;
    return parseFloat(decimalHours.toFixed(2));
  }

  const sendDetails = async () => {
    const search = document.getElementById('search-anime').value

    let animename = search.toLowerCase();
    animename = animename.replace(' ','%20')

    const values = await fetch('https://kitsu.io/api/edge/anime?filter[text]='+animename);
    const response = await values.json();
    console.log(response)
    const score = parseFloat(response.data[0].attributes.averageRating)/10;
    const aired = new Date(response.data[0].attributes.startDate).getFullYear()
    const length = response.data[0].attributes.episodeLength
    const hour = parseInt(length/60)
    const minute = parseInt(length%60)
    const duration = gettime(`${hour} hr. ${minute} min.`)
    const agerating = response.data[0].attributes.ageRating
    let ageratguide = response.data[0].attributes.ageRatingGuide
    ageratguide = ageratguide.split(' ')
    for (let val in ageratguide){
      ageratguide[val] = ageratguide[val].replace(',','')
    }
    let rating;
    for (const key in rating_dict){
      let flag = 1
      const key_lower = key.toLowerCase()
      for (const val in ageratguide){
        if (key_lower.includes(ageratguide[val].toLowerCase()) === false){
          flag = 0
          break
        }
      }
      if (key_lower.includes(agerating.toLowerCase()) && (flag===1)){
        rating = rating_dict[key]
      }
    }
    const genreurl = response.data[0].relationships.genres.links.related
    const genreFetch = await fetch(genreurl)
    const genreValues = await genreFetch.json()
    let genreValue = []
    genreValues.data.map((value)=>{
      genreValue.push(value.attributes.name)
      return 0
    })
    const popularity = response.data[0].attributes.popularityRank
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
      score:score,
      aired:aired,
      duration:duration,
      rating:rating,
      popularity:popularity
    }
    
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
