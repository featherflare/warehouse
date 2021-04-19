import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from '../component/NavBar';
import Profile from '../assets/image/face.png';
import '../css/SelectMode.css';
import { useCustomEventListener } from 'react-custom-events';
// import PickUp from '../screen/PickUp';
// import PutAway from '../screen/PutAway';
// import Receive from '../screen/Receive';
// import LocationTransfer from '../screen/LocationTransfer';

const SelectMode = () => {
  return (
    <div className='container-selectmode'>
      <Navbar />
      <div className='grid'>
        <img
          src={Profile}
          alt='profile'
          width='150'
          height='150'
          style={{ borderRadius: 200, backgroundColor: '#FFF' }}
        />
        <div className='header-text'>Hello! Mr.John Dowson</div>
      </div>
      <hr />
      <div className='feature'>
        {/* <Router> */}
        <Link to={'/putAway'}>
          <div className='box'>Put Away</div>
        </Link>
        <Link to={'/pickUp'}>
          <div className='box'>Pick Up</div>
        </Link>
        <Link to={'/locationTransfer'}>
          <div className='box'>Location Transfer</div>
        </Link>
        {/* <Switch>
          <Route exact path='/'>
            <SelectMode />
          </Route>
          <Route path='/receive'>
            <Receive />
          </Route>
          <Route path='/putAway'>
            <PutAway />
          </Route>
          <Route path='/pickUp'>
            <PickUp />
          </Route>
          <Route path='/locationTransfer'>
            <LocationTransfer />
          </Route>
        </Switch> */}
        {/* </Router> */}
      </div>
    </div>
  );
};

export default SelectMode;
