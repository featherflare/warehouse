import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { NavBarIcon } from './NavBarIcon';
// import SelectMode from '../screen/SelectMode';
// import Login from '../screen/LogIn';

function NavBar() {
  return (
    <>
      <div className='navbar'>
        <nav className='nav-menu'>
          <ul className='nav-menu-item'>
            {NavBarIcon.map((item, index) => {
              return (
                // <Router>
                <li key={index} className={item.cName}>
                  <Link to={item.path}>{item.icon}</Link>
                </li>
                // <Switch>
                //   <Route exact path='/'>
                //     <SelectMode />
                //   </Route>
                //   <Route path='/login'>
                //     <Login />
                //   </Route>
                // </Switch>
                // </Router>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
