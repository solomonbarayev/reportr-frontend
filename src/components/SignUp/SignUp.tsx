import './SignUp.css';

import React, { useState } from 'react';
import { IRegisterData } from '../../utils/auth';

interface Props {
  handleSignUp: (data: IRegisterData) => void;
}

const SignUp = ({ handleSignUp }: Props) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
    picture: '',
    position: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={userData.name}
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
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default SignUp;
