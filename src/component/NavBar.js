import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io';
import '../css/Navbar.css';
import { emitCustomEvent } from 'react-custom-events';

function NavBar() {
  const handleClick = () => {
    console.log('handleClick');
    var payload = 0;
    emitCustomEvent('CHANGE_MODE_FROM_NAVBAR', payload);
  };
  return (
    <>
      <div className='navbar'>
        <nav className='nav-menu'>
          <ul className='nav-menu-item'>
            <li className='nav-back'>
              <Link to='/' onClick={handleClick}>
                <IoIcons.IoMdArrowRoundBack size={'90%'} />
              </Link>
            </li>
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
