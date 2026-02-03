import React from 'react';
import { Card, CardContent, CardProps } from '@mui/material';

interface CustomCardProps extends CardProps {
  children: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ children, ...props }) => {
  return (
    <Card {...props}>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default CustomCard;