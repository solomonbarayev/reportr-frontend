import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { HeaderProps } from './Header';

const Nav = ({ isLoggedIn, handleSignOut, isManager, email }: HeaderProps) => {
  const location = useLocation();

  return (
    <nav className="nav">
      <ul className="nav__list">
        {isLoggedIn && (
          <>
            <li>
              <NavLink
                to="/"
                exact={true}
                className="nav__link"
                activeClassName="nav__link_active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mytasks"
                className="nav__link"
                activeClassName="nav__link_active">
                My Tasks
              </NavLink>
            </li>
            {isManager && (
              <li>
                <NavLink
                  to="/myreports"
                  className="nav__link"
                  activeClassName="nav__link_active">
                  My Reports
                </NavLink>
              </li>
            )}
          </>
        )}
        {isLoggedIn ? (
          <li>
            <Link to="/" className="nav__link" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        ) : (
          <>
            {location.pathname !== '/signin' && (
              <li>
                <NavLink
                  to="/signin"
                  className="nav__link"
                  activeClassName="nav__link_active">
                  Sign In
                </NavLink>
              </li>
            )}
            {location.pathname !== '/signup' && (
              <li>
                <NavLink
                  to="/signup"
                  className="nav__link"
                  activeClassName="nav__link_active">
                  Sign Up
                </NavLink>
              </li>
            )}
          </>
        )}
      </ul>
      {isLoggedIn && (
        <p className="nav__email">
          <span className="nav__email-accent">Logged in:</span> {email}
        </p>
      )}
    </nav>
  );
};

export default Nav;
