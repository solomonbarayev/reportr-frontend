import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

export interface HeaderProps {
  handleSignOut: () => void;
  isLoggedIn: boolean;
  isManager: boolean;
  email: string;
}

const Header = ({
  handleSignOut,
  isLoggedIn,
  isManager,
  email,
}: HeaderProps) => {
  return (
    <header className="header">
      <Link to="/" className="header__logo-container">
        <h2 className="header__logo">Reportr</h2>
      </Link>
      <Nav
        handleSignOut={handleSignOut}
        isLoggedIn={isLoggedIn}
        isManager={isManager}
        email={email}
      />
    </header>
  );
};

export default Header;
