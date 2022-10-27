import './SignUp.css';

import React, { useState } from 'react';
import { IRegisterData } from '../../utils/auth';
import EmployeeCheckboxes from '../EmployeeCheckboxes/EmployeeCheckboxes';

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
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={userData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={userData.password}
        />
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          onChange={handleChange}
          value={userData.firstName}
        />
        <label htmlFor="name">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          onChange={handleChange}
          value={userData.lastName}
        />
        <label htmlFor="picture">Picture</label>
        <input
          type="text"
          name="picture"
          id="picture"
          onChange={handleChange}
          value={userData.picture}
        />
        <label htmlFor="position">Position</label>
        <input
          type="text"
          name="position"
          id="position"
          onChange={handleChange}
          value={userData.position}
        />
        <label htmlFor="isManager">Are you a manager?</label>
        <input
          type="checkbox"
          name="isManager"
          id="isManager"
          onChange={handleCheckBoxChange}
          checked={userData.isManager}
        />

        {userData.isManager && (
          <div className="signup__subordinates">
            <label htmlFor="subordinates">Who are you're employees?</label>
            <EmployeeCheckboxes
              handleEmployeeCheckboxes={handleEmployeeCheckboxes}
              checkIfEmployeeChecked={checkIfEmployeeChecked}
            />
          </div>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default SignUp;
