import React from 'react';

export default function Input(props) {

  const { value, type, minLength, maxLength, required, autoComplete, isValid, onChange, placeholder, inputFieldClassName, errorMessage } = props;

  return (
    <div className="input__container">

      <input
        type={type}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`${inputFieldClassName}`}
        autoComplete={autoComplete}
        onChange={onChange}
        required={required}
      />
      <span className={`popup__input_text_error ${!isValid && 'popup__input_text_error_active'}`}>{errorMessage}</span>
    </div>
  )
}