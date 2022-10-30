import React from 'react';
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
      <h2 className="header__logo">Reportr</h2>
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
