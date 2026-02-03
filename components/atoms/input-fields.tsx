import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const InputField: React.FC<TextFieldProps> = (props) => {
  return <TextField {...props} />;
};

export default InputField;