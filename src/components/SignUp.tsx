import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IRegisterData } from '../../src/utils/auth';
import EmployeeCheckboxes from './EmployeeCheckboxes';
import { useAuth } from '../contexts/AuthContext';
import { useFormValidity } from '../contexts/FormVallidityContext';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  position: '',
  picture: '',
  isManager: false,
  mySubordinates: [],
};

const SignUp = () => {
  const [userData, setUserData] = useState<IRegisterData>(
    initialState as IRegisterData
  );

  const validityContext = useFormValidity();

  const authContext = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    validityContext!.validateInput(e);
    checkFormValidity();
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, isManager: e.target.checked });
  };

  const handleEmployeeCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setUserData({
        ...userData,
        mySubordinates: [...userData.mySubordinates, e.target.id],
      });
    } else {
      setUserData({
        ...userData,
        mySubordinates: userData.mySubordinates.filter(
          (id) => id !== e.target.id
        ),
      });
    }
  };

  const checkIfEmployeeChecked = (id: string) => {
    return userData.mySubordinates?.includes(id);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authContext!.handleSignUp(userData);
  };

  const checkFormValidity = () => {
    if (
      validityContext!.errors.firstName === '' &&
      validityContext!.errors.lastName === '' &&
      validityContext!.errors.email === '' &&
      validityContext!.errors.password === '' &&
      validityContext!.errors.position === '' &&
      userData.firstName !== '' &&
      userData.lastName !== '' &&
      userData.email !== '' &&
      userData.password !== '' &&
      userData.position !== ''
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
    <section className="signup">
      <h2 className="signup__title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup__form">
        <div className="signup__input-container">
          <label htmlFor="email" className="signup__label">
            Email
          </label>
          <input
            className="signup__input"
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {/* span for error message */}
          {validityContext!.errors.email && (
            <span className="signup__error">
              {validityContext!.errors.email}
            </span>
          )}
        </div>
        <div className="signup__input-container">
          <label htmlFor="password" className="signup__label">
            Password
          </label>
          <input
            className="signup__input"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={userData.password}
            placeholder="Enter your password"
          />
          {/* span for error message */}
          {validityContext!.errors.password && (
            <span className="signup__error">
              {validityContext!.errors.password}
            </span>
          )}
        </div>
        <div className="signup__input-container">
          <label htmlFor="name" className="signup__label">
            First Name
          </label>
          <input
            className="signup__input"
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={userData.firstName}
            placeholder="Enter your first name"
          />
          {/* span for error message */}
          {validityContext!.errors.firstName && (
            <span className="signup__error">
              {validityContext!.errors.firstName}
            </span>
          )}
        </div>
        <div className="signup__input-container">
          <label htmlFor="name" className="signup__label">
            Last Name
          </label>
          <input
            className="signup__input"
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={userData.lastName}
            placeholder="Enter your last name"
          />
          {/* span for error message */}
          {validityContext!.errors.lastName && (
            <span className="signup__error">
              {validityContext!.errors.lastName}
            </span>
          )}
        </div>
        <div className="signup__input-container">
          <label htmlFor="picture" className="signup__label">
            Picture
          </label>
          <input
            className="signup__input"
            type="text"
            name="picture"
            id="picture"
            onChange={handleChange}
            value={userData.picture}
            placeholder="Enter your picture url"
          />
          {/* span for error message */}
          {validityContext!.errors.picture && (
            <span className="signup__error">
              {validityContext!.errors.picture}
            </span>
          )}
        </div>
        <div className="signup__input-container">
          <label htmlFor="position" className="signup__label">
            Position
          </label>
          <input
            className="signup__input"
            type="text"
            name="position"
            id="position"
            onChange={handleChange}
            value={userData.position}
            placeholder="Enter your position"
          />
          {/* span for error message */}
          {validityContext!.errors.position && (
            <span className="signup__error">
              {validityContext!.errors.position}
            </span>
          )}
        </div>
        <div className="signup__checkbox">
          <label htmlFor="isManager" className="signup__label">
            Are you a manager?
          </label>
          <div className="signup__checkbox-container">
            <input
              type="checkbox"
              name="isManager"
              id="isManager"
              onChange={handleCheckBoxChange}
              checked={userData.isManager}
            />
            <span className="signup__check-text">Yes</span>
          </div>
        </div>

        {userData.isManager && (
          <div className="signup__subordinates">
            <label htmlFor="subordinates">
              Who are your employees?{' '}
              <div className="signup__subordinates-notice">
                (employees who already have a manager cannot be selected)
              </div>
            </label>
            <EmployeeCheckboxes
              handleEmployeeCheckboxes={handleEmployeeCheckboxes}
              checkIfEmployeeChecked={checkIfEmployeeChecked}
            />
          </div>
        )}

        <button
          disabled={!validityContext!.isFormValid}
          type="submit"
          className={`signup__btn ${
            !validityContext?.isFormValid && 'signup__btn_disabled'
          }`}>
          Sign Up
        </button>
      </form>

      <Link to="/login" className="signup__link">
        Already have an account? Log in
      </Link>
    </section>
  );
};

export default SignUp;
