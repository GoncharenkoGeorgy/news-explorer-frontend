import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Input from '../Input/Input';
import { useFormWithValidation } from '../../utils/ValidationForm';

const Register = (props) => {
  
  const { isOpen, onClose, onChange, onRegister, error, disabled } = props;

  const emailField = useFormWithValidation();
  const passwordField = useFormWithValidation();
  const nameField = useFormWithValidation();

  function handleClose() {
    emailField.setErrorMessage('');
    emailField.setValue('');
    emailField.setIsValid(false);
    passwordField.setErrorMessage('');
    passwordField.setValue('');
    passwordField.setIsValid(false);
    nameField.setErrorMessage('');
    nameField.setValue('');
    nameField.setIsValid(false);
    onClose();
  };

  function handleRegister(evt) {
    evt.preventDefault();
    onRegister(emailField.value, passwordField.value, nameField.value);
  };

  return (
    <PopupWithForm
      name='register'
      isOpen={isOpen}
      onClose={handleClose}
      onChange={onChange}
      isFormValid={emailField.isValid && passwordField.isValid && nameField.isValid}
      onSubmit={handleRegister}
      error={error}
      disabled={disabled}
      buttonText='Зарегистрироваться'>
      <h2 className={'popup__title'}>Регистрация</h2>
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
      <span className='input__type'>Имя</span>
      <Input
        type='text'
        minLength='2'
        maxLength='20'
        required={true}
        {...nameField}
        inputFieldClassName='popup__input'
        placeholder='Введите имя' />
    </PopupWithForm>
  );
};

export default Register;