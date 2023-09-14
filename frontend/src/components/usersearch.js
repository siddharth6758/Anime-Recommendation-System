import '../index.css';
import React,{ useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function UserSearch() {

  const genre_list = ['Action', 'Adventure', 'Cars', 'Comedy', 'Dementia', 'Demons', 'Drama', 'Ecchi', 'Fantasy', 'Game', 'Harem', 'Hentai', 'Historical', 'Horror', 'Josei', 'Kids', 'Magic', 'Martial Arts', 'Mecha', 'Military', 'Music', 'Mystery', 'Parody', 'Police', 'Psychological', 'Romance', 'Samurai', 'School', 'Sci-Fi', 'Seinen', 'Shoujo', 'Shoujo Ai', 'Shounen', 'Shounen Ai', 'Slice of Life', 'Space', 'Sports', 'Super Power', 'Supernatural', 'Thriller', 'Vampire', 'Yaoi', 'Yuri']

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


// put axios and set success status, if success then navigate 

  const sendUserData = (genre,type,episodes,avgrat,useravgrat) => {
    axios.post('http://127.0.0.1:5000/findanime',{
      genre:genre,
      type:type,
      episodes:episodes,
      avgrat:avgrat,
      useravgrat:useravgrat
    }).then((response)=>{
      if (response.data['status']==='OK'){
        navigate('/findanime',{state:response.status})
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
    const avgrat = document.getElementById('average-rating').value
    const useravgrat = document.getElementById('user-average-rating').value
    sendUserData(genre,type,episodes,avgrat,useravgrat)
  }

  return (
    <div className="body">
      <form method="post" action='/findanime'>
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
              <h2>Enter episode count:</h2>
              <input type="text" id="episodes" autoComplete='off'/>
          </div>
          <div className='form-item'>
              <h2>Enter Average Rating:</h2>
              <input type="text" id="average-rating" autoComplete='off'/>
          </div>
          <div className='form-item'>
              <h2>Enter User Average Rating:</h2>
              <input type="text" id="user-average-rating" autoComplete='off'/>
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
