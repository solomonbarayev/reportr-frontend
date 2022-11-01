import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFormValidity } from '../contexts/FormVallidityContext';

const SignIn = () => {
  const validityContext = useFormValidity();

  const [userData, setUserData] = useState({ email: '', password: '' });

  const authContext = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    validityContext!.validateInput(e);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authContext!.handleSignIn(userData.email, userData.password);
  };

  const checkFormValidity = () => {
    if (
      validityContext!.errors.email === '' &&
      validityContext!.errors.password === '' &&
      userData.email !== '' &&
      userData.password !== ''
    ) {
      validityContext!.setIsFormValid(true);
    } else {
      validityContext!.setIsFormValid(false);
    }
  };

  useEffect(() => {
    checkFormValidity();
  }, [userData]);

  return (
    <section className="signin">
      <h2 className="signin__title">Sign In</h2>
      <form onSubmit={handleSubmit} className="signin__form">
        <div className="signin__input-container">
          <label htmlFor="email" className="signin__label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            className="signin__input"
            placeholder="Enter your email"
          />
          {/* span for error message */}
          {validityContext!.errors.email && (
            <span className="signin__error">
              {validityContext!.errors.email}
            </span>
          )}
        </div>
        <div className="signin__input-container">
          <label htmlFor="password" className="signin__label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={userData.password}
            placeholder="Enter your password"
            className="signin__input"
          />
          {validityContext!.errors.password && (
            <span className="signin__error">
              {validityContext!.errors.password}
            </span>
          )}
        </div>
        <button
          disabled={!validityContext!.isFormValid}
          type="submit"
          className={`signin__btn ${
            !validityContext!.isFormValid && 'signin__btn_disabled'
          }`}>
          Sign In
        </button>
      </form>
      {/* or sign in  */}
      <Link to="/signup" className="signin__link">
        Or Register
      </Link>
    </section>
  );
};

export default SignIn;
