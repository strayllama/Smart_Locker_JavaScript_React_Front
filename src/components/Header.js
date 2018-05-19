import React from 'react';
import './header.css';

const Header = ({ children })  => {
  return (
    <div className="headerDiv">
      <p className="headerText">{children}</p>
    </div>
  );
}


export default Header
