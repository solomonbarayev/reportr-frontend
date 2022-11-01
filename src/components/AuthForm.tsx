import React from 'react';
import { useFormValidity } from '../contexts/FormVallidityContext';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  children?: React.ReactNode;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userData: { email: string; password: string };
  title: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AuthForm = ({
  children,
  name,
  handleChange,
  userData,
  title,
  handleSubmit,
}: Props) => {
  const validityContext = useFormValidity();
  return (
    <section className={`auth auth_type_${name}`}>
      <h2 className={`auth__title auth__title_type_${name}`}>{title}</h2>
      <form
        className={`auth__form auth__form_type_${name}`}
        onSubmit={handleSubmit}>
        <div
          className={`auth__input-container auth__input-container_type_${name}`}>
          <label
            htmlFor="email"
            className={`auth__label auth__label_type_${name}`}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`auth__input auth__input_type_${name}`}
            placeholder="Enter your email"
            onChange={handleChange}
            value={userData.email}
          />
          {validityContext!.errors.email && (
            <span className={`auth__error auth__error_type_${name}`}>
              {validityContext!.errors.email}
            </span>
          )}
        </div>
        <div
          className={`auth__input-container auth__input-container_type_${name}`}>
          <label
            htmlFor="password"
            className={`auth__label auth__label_type_${name}`}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`auth__input auth__input_type_${name}`}
            placeholder="Enter your password"
            onChange={handleChange}
            value={userData.password}
          />
          {validityContext!.errors.password && (
            <span className={`auth__error auth__error_type_${name}`}>
              {validityContext!.errors.password}
            </span>
          )}
        </div>

        {children}

        <button
          disabled={!validityContext!.isFormValid}
          type="submit"
          className={`auth__btn auth__btn_type_${name} ${
            !validityContext!.isFormValid && 'auth__btn_disabled'
          }`}>
          {title}
        </button>
      </form>
      <Link
        to={`/${name === 'signin' ? 'signup' : 'signin'}`}
        className={`auth__link auth__link_type_${name}`}>
        {name === 'signin' ? 'Or Register' : 'Already have an account? Sign In'}
      </Link>
    </section>
  );
};

export default AuthForm;
