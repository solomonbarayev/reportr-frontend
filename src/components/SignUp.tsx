import React, { useState } from 'react';
import { IRegisterData } from '../../src/utils/auth';
import EmployeeCheckboxes from './EmployeeCheckboxes';

interface Props {
  handleSignUp: (data: IRegisterData) => void;
}

const SignUp = ({ handleSignUp }: Props) => {
  const [userData, setUserData] = useState<IRegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    position: '',
    picture: '',
    isManager: false,
    mySubordinates: [],
  } as IRegisterData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
    handleSignUp(userData);
  };

  return (
    <section className="signup">
      <h2 className="signup__title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup__form">
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

        <button type="submit" className="signup__btn">
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default SignUp;
