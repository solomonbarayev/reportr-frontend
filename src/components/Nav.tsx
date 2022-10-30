import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { HeaderProps } from './Header';

const Nav = ({ isLoggedIn, handleSignOut, isManager, email }: HeaderProps) => {
  const location = useLocation();

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li>
          <NavLink
            to="/"
            className="nav_link"
            activeClassName="nav_link_active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mytasks"
            className="nav_link"
            activeClassName="nav_link_active">
            My Tasks
          </NavLink>
        </li>
        {isManager && (
          <li>
            <NavLink
              to="/myreports"
              className="nav_link"
              activeClassName="nav_link_active">
              My Reports
            </NavLink>
          </li>
        )}
        {isLoggedIn ? (
          <li>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        ) : (
          <>
            {location.pathname !== '/signin' && (
              <li>
                <NavLink
                  to="/signin"
                  className="nav_link"
                  activeClassName="nav_link_active">
                  Sign In
                </NavLink>
              </li>
            )}
            {location.pathname !== '/signup' && (
              <li>
                <NavLink
                  to="/signup"
                  className="nav_link"
                  activeClassName="nav_link_active">
                  Sign Up
                </NavLink>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
