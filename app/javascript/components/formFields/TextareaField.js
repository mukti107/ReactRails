import React from 'react';

const TextAreaField = ({
  input, disabled, label='', placeholder= label, readonly, meta: { touched, error }, rows,
}) => (

  <div className="form-group">
      <label>{label}</label>
    <textarea
      {...input}
      placeholder={placeholder}
      rows={rows}
      readOnly={readonly}
      disabled={disabled}
      className="form-control"
    >{input.value}
    </textarea>
    {touched && error && <span className="text-danger">{error}</span>}
  </div>
);

export default TextAreaField;
