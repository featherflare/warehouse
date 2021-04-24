import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import '../css/Navbar.css';
import { emitCustomEvent } from 'react-custom-events';

function NavBar({ notiNavbarPickUp, notiNavbarLocation, hardware }) {
  const [count, setCount] = useState();
  const handleClickBack = () => {
    console.log('handleClick');
    var payload = 0;
    emitCustomEvent('CHANGE_MODE_FROM_NAVBAR', payload);
  };
  console.log(notiNavbarPickUp);
  console.log(notiNavbarLocation);
  useEffect(() => {
    if (!notiNavbarPickUp && !notiNavbarLocation) {
      setCount(0);
    } else if (notiNavbarPickUp && !notiNavbarLocation) {
      setCount(1);
    } else if (!notiNavbarPickUp && notiNavbarLocation) {
      setCount(1);
    } else if (notiNavbarPickUp && notiNavbarLocation) {
      setCount(2);
    }
  }, [notiNavbarLocation, notiNavbarPickUp]);
  return (
    <>
      <div className='navbar'>
        <nav className='nav-menu'>
          <ul className='nav-menu-item'>
            <li className='nav-back'>
              <Link to='/' onClick={handleClickBack}>
                <IoIcons.IoMdArrowRoundBack size={'90%'} />
              </Link>
            </li>
            {(notiNavbarPickUp || notiNavbarLocation) && (
              <li className='nav-noti'>
                <div className='count'>{count}</div>
                <FaIcons.FaBell size={'60%'} color={'#fff'} />
              </li>
            )}
            {!notiNavbarPickUp && !notiNavbarLocation && (
              <li className='nav-noti'>
                <FaIcons.FaBellSlash size={'80%'} color={'#a1a1a150'} />
              </li>
            )}
            {hardware && (
              <li className='nav-noti'>
                <MdIcons.MdPhonelink size={'80%'} color={'#fff'} />
              </li>
            )}
            {!hardware && (
              <li className='nav-noti'>
                <MdIcons.MdPhonelinkOff size={'80%'} color={'#a1a1a150'} />
              </li>
            )}
            <li className='nav-logout'>
              <Link to='/login'>
                <FiIcons.FiLogOut size={'80%'} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
