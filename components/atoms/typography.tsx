import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

type TypographyVariant = 'small' | 'medium' | 'large' | 'logo';

interface CustomTypographyProps extends Omit<TypographyProps, 'variant'> {
  variant: TypographyVariant;
}

const getVariant = (variant: TypographyVariant): TypographyProps['variant'] => {
  switch (variant) {
    case 'small':
      return 'body2';
    case 'medium':
      return 'body1';
    case 'large':
      return 'h6';
    case 'logo':
      return 'h4';
    default:
      return 'body1';
  }
};

const CustomTypography: React.FC<CustomTypographyProps> = ({ variant, ...props }) => {
  return <Typography variant={getVariant(variant)} {...props} />;
};

export default CustomTypography;