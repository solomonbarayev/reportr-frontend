import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  handleSignIn: (email: string, password: string) => void;
}

const SignIn = ({ handleSignIn }: Props) => {
  const [userData, setUserData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignIn(userData.email, userData.password);
  };

  return (
    <section className="signin">
      <h2 className="signin__title">Sign In</h2>
      <form onSubmit={handleSubmit} className="signin__form">
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
        <button type="submit" className="singin__btn">
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
