import React from 'react';

const TextField = ({
  input, disabled, label="", placeholder = label, readonly, type, meta: { touched, error } = {},
}) => (

  <div className="form-group">
    <label>{label}</label>
    <input {...input} type={type} placeholder={placeholder} readOnly={readonly} disabled={disabled} className="form-control" />
    {touched && error && <span className="text-danger">{error}</span>}
  </div>
);

export default TextField;
