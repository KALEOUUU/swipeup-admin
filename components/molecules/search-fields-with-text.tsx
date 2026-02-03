import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchField from '../atoms/search-fields';

interface SearchFieldsWithTextProps {
  label?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const SearchFieldsWithText: React.FC<SearchFieldsWithTextProps> = ({
  label = 'Search',
  placeholder,
  onChange,
  value,
}) => {
  return (
    <Box>
      <Typography variant="body1" gutterBottom>
        {label}
      </Typography>
      <SearchField placeholder={placeholder} onChange={onChange} value={value} />
    </Box>
  );
};

export default SearchFieldsWithText;