import React from 'react';
import { Button, ButtonProps, Typography } from '@mui/material';

interface ButtonWithTextProps extends ButtonProps {
  text: string;
  textVariant?: 'small' | 'medium' | 'large' | 'logo';
}

const ButtonWithText: React.FC<ButtonWithTextProps> = ({ text, textVariant = 'medium', ...props }) => {
  const getVariant = (variant: string) => {
    switch (variant) {
      case 'small': return 'body2';
      case 'medium': return 'body1';
      case 'large': return 'h6';
      case 'logo': return 'h4';
      default: return 'body1';
    }
  };

  return (
    <Button {...props}>
      <Typography variant={getVariant(textVariant)}>
        {text}
      </Typography>
    </Button>
  );
};

export default ButtonWithText;