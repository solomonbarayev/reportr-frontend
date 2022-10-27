import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

interface Props {
  handleSignOut: () => void;
  isLoggedIn: boolean;
}

const Nav = ({ isLoggedIn, handleSignOut }: Props) => {
  const location = useLocation();
  return (
    <nav className="nav">
      <ul>
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
        <li>
          <NavLink
            to="/myreports"
            className="nav_link"
            activeClassName="nav_link_active">
            My Reports
          </NavLink>
        </li>
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
