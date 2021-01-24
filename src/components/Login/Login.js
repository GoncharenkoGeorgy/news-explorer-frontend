import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Input from '../Input/Input';
import { useFormWithValidation } from '../../utils/ValidationForm';

const Login = (props) => {
  
  const { isOpen, onClose, onChange, onLogin, error, disabled } = props;

  const emailField = useFormWithValidation();
  const passwordField = useFormWithValidation();

  function handleClose() {
    emailField.setErrorMessage('');
    emailField.setValue('');
    passwordField.setErrorMessage('');
    passwordField.setValue('');
    emailField.setIsValid(false);
    passwordField.setIsValid(false);
    onClose();
  };

  function handleLogin(evt) {
    evt.preventDefault();
    onLogin(emailField.value, passwordField.value);
  };

  return (
    <PopupWithForm
      name='login'
      isOpen={isOpen}
      onClose={handleClose}
      onChange={onChange}
      isFormValid={emailField.isValid && passwordField.isValid}
      onSubmit={handleLogin}
      error={error}
      disabled={disabled}
      buttonText='Войти'>
      <h2 className={'popup__title'}>Вход</h2>
      <span className='input__type'>Email</span>
      <Input
        type='email'
        minLength='6'
        maxLength='20'
        required={true}
        autoComplete='email'
        {...emailField}
        inputFieldClassName='popup__input'
        placeholder='Введите почту' />
      <span className='input__type'>Пароль</span>
      <Input
        type='password'
        minLength='8'
        maxLength='20'
        required={true}
        autoComplete='password'
        {...passwordField}
        inputFieldClassName='popup__input'
        placeholder='Введите пароль' />
    </PopupWithForm>
  );
};

export default Login;