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
    <section>
      <h2>Sign In</h2>
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
        <button type="submit">Sign In</button>
      </form>
      {/* or sign in  */}
      <Link to="/signup">Or Register</Link>
    </section>
  );
};

export default SignIn;
