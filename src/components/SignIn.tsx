import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFormValidity } from '../contexts/FormVallidityContext';
import AuthForm from './AuthForm';

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
      //make sure all fields are filled
      Object.values(userData).every((value) => value !== '') &&
      //make sure all errors are empty
      Object.values(validityContext!.errors).every((value) => value === '')
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
    <AuthForm
      name="signin"
      title="Sign In"
      handleChange={handleChange}
      userData={userData}
      handleSubmit={handleSubmit}
    />
  );
};

export default SignIn;
