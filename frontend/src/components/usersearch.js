import '../index.css';
import React,{ useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function UserSearch() {

  const genre_list = ['Action', 'Adventure', 'Cars', 'Comedy', 'Dementia', 'Demons', 'Drama','Ecchi', 'Fantasy', 'Game', 'Harem', 'Hentai', 'Historical', 'Horror','Josei', 'Kids', 'Magic', 'Martial Arts', 'Mecha', 'Military', 'Music','Mystery', 'Parody', 'Police', 'Psychological', 'Romance', 'Samurai','School', 'Sci-Fi', 'Seinen', 'Shoujo', 'Shoujo Ai', 'Shounen','Shounen Ai', 'Slice of Life', 'Space', 'Sports', 'Super Power','Supernatural', 'Thriller', 'Unknown', 'Vampire', 'Yaoi', 'Yuri']

  const rating_dict = {
    'R - 17+ (violence & profanity)': 0,
    'PG-13 - Teens 13 or older': 1, 
    'PG - Children': 2, 
    'R+ - Mild Nudity': 3, 
    'G - All Ages': 4, 
    'Rx - Hentai': 5
    }

  const [ genre, setGenre ] = useState([])
  const navigate = useNavigate()

  const selectgenre = (sel_val)=>{
      if (!genre.includes(sel_val)){
        setGenre([...genre,sel_val]);
      }else{
        setGenre(()=>{
          const arr = [...genre]
          const id = arr.indexOf(sel_val)
          arr.splice(id,1)
          return arr
        })
      }
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

  const sendUserData = (genre,type,episodes,score,aired,duration,rating,popularity) => {
    const senddata = {
      genre:genre,
      type:type,
      episodes:episodes,
      score:score,
      aired:aired,
      duration: gettime(duration),
      rating:rating_dict[rating],
      popularity:popularity
    }
    console.log(senddata)
    axios.post('http://127.0.0.1:5000/findanime',senddata).then((response)=>{
      if (response.data['status']==='OK'){
        navigate('/findanime',{ state : response.data['userdata'] })
      }
    }).catch((error)=>{
      console.log(error)
    })
  }
  
  const toggleactive = (event) => {
    const ele = event.target
    ele.classList.toggle('active')
  }

  const setuservalues = () => {
    const type = document.getElementById('select-type').value
    const episodes = document.getElementById('episodes').value
    const score = document.getElementById('score').value
    const aired = document.getElementById('aired').value
    const duration = document.getElementById('duration').value
    const rating = document.getElementById('select-rating').value
    const popularity = document.getElementById('popularity').value
    sendUserData(genre,type,episodes,score,aired,duration,rating,popularity)
  }

  return (
    <div className="body">
      <form method="POST">
        <div id='genre-select'>
          <h1>Select Genre</h1>
            {genre_list.map((value,idx)=>(
                <input type='button' key={idx} name={value} className='genrebutton' onClick={(event)=> {selectgenre(value); toggleactive(event)}} value={value}/>
              ))}
        </div>
        <div id="form-container">
          <div className='form-item'>
              <h2>Select Type</h2>
              <select name="type" id='select-type'>
                <option value="Movie">Movie</option>
                <option value="music">Music</option>
                <option value="ONA">ONA</option>
                <option value="OVA">OVA</option>
                <option value="Special">Special</option>
                <option value="TV">TV</option>
              </select>
          </div>
          <div className='form-item'>
              <h2>Enter Episode count:</h2>
              <input type="text" id="episodes" autoComplete='off'/>
          </div>
          <div className='form-item'>
              <h2>Enter Score:</h2>
              <input type="text" id="score" autoComplete='off'/>
          </div>
          <div className='form-item'>
              <h2>Aired Year:</h2>
              <input type="text" id="aired" autoComplete='off'/>
          </div>
          <div className='form-item'>
              <h2>Duration (x hr. y min.):</h2>
              <input type="text" id="duration" autoComplete='off'/>
          </div>
          <div className='form-item'>
              <h2>Select Rating</h2>
              <select name="rating" id='select-rating'>
                <option value="R - 17+ (violence & profanity)">R - 17+ (violence & profanity)</option>
                <option value="PG-13 - Teens 13 or older">PG-13 - Teens 13 or older</option>
                <option value="PG - Children">PG - Children</option>
                <option value="R+ - Mild Nudity">R+ - Mild Nudity</option>
                <option value="G - All Ages">G - All Ages</option>
                <option value="Rx - Hentai">Rx - Hentai</option>
              </select>
          </div>
          <div className='form-item'>
              <h2>Enter Popularity (Approx. Number):</h2>
              <input type="text" id="popularity" autoComplete='off'/>
          </div>
        </div>
        <div className="form-item">
          <input type='submit' value='Submit' className='genrebutton' style={{width:"200px",marginBottom:'100px'}} onClick={(event)=>{setuservalues(); event.preventDefault();}}/>
        </div>
      </form>
    </div>
  );
}

export default UserSearch;
