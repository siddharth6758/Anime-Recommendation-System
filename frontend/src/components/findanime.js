import '../index.css';
import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';

function FindAnime() {
  
  const location = useLocation();
  const userdata = location.state
  const [animeData,setAnimeData] = useState([])

  const animelookup = async (value) => {
    try {
      value = value.toLowerCase();
      const str = value.replace(' ','%20')
      const response = await fetch('https://kitsu.io/api/edge/anime?filter[text]='+str);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data for ${value}: ${error.message}`);
      return null;
    }
  };

  useEffect(() => {
    const fetchAnimeData = async () => {
      const promises = userdata.map((value) => animelookup(value));
      const fetchedData = await Promise.all(promises);
      setAnimeData(fetchedData);
    };

    fetchAnimeData();
  }, [userdata]);

  function opendescp(value){
    const modal = document.getElementById(value)
    modal.style.display = 'block';
  }

  function closedescp(value){
    const modal = document.getElementById(value)
    modal.style.display = 'none';
  }


  return (
    <div className="body" id='anime-find-body'>
      <div id='list-animes'>
        {animeData.map((value,idx)=>(
          <div key={idx+'vals'}>
            <div className="anime-item" key={idx} onClick={()=>opendescp(idx+'animemodal')}>
              <img className='anime-img' src={value.data[0].attributes.posterImage.medium} alt={value}/>
              {value.data[0].attributes.titles[Object.keys(value.data[0].attributes.titles)[0]]}
            </div>
            <div className="anime-modal" id={idx+'animemodal'}>
                <div className="modal-content">
                  <span className="close" onClick={()=>closedescp(idx+'animemodal')}>&times;</span>
                    <div style={{display:'flex',gap:'15px'}}>
                      <img src={value.data[0].attributes.posterImage.tiny} alt={value}/>
                      <span><b>Title : </b>{value.data[0].attributes.titles[Object.keys(value.data[0].attributes.titles)[0]]}<br/>
                      <b>Episodes : </b>{value.data[0].attributes.episodeCount}<br/>
                      <b>Start Date : </b>{value.data[0].attributes.startDate}&nbsp;&nbsp;
                      <b>End Date : </b>{value.data[0].attributes.endDate}<br/>
                      <b>Status : </b>{value.data[0].attributes.status}<br/>
                      <b>Type : </b>{value.data[0].attributes.showType}<br/>
                      </span>
                    </div><br/>
                  <p>
                    {value.data[0].attributes.description}
                  </p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindAnime;
