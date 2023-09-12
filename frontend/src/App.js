import './index.css';
import Homepage from './components/homepage';
import UserSearch from './components/usersearch';
import NameSearch from './components/namesearch';
import FindAnime from './components/findanime';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {


  return (
    <div className="body">
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/usersearch' element={<UserSearch/>}/>
        <Route path='/namesearch' element={<NameSearch/>}/>
        <Route path='/findanime' element={<FindAnime/>}/>
      </Routes>
    </div>
  );
}

export default App;
