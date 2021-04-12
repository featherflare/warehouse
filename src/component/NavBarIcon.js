import React from 'react';
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io';
import '../css/Navbar.css';

export const NavBarIcon = [
  {
    title: 'back',
    path: '/',
    icon: <IoIcons.IoMdArrowRoundBack size={'90%'} />,
    cName: 'nav-back',
  },
  {
    title: 'logout',
    path: '/login',
    icon: <FiIcons.FiLogOut size={'80%'} />,
    cName: 'nav-logout',
  },
];
