import { Typography } from '@mui/material';
import React from 'react';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        justifyContent: 'center',
        height: 'calc(100vh - 65px)',
        color: '#fff'
      }}
    >
      <Typography variant="h3">Page Not Found</Typography>

      <Typography variant="p">Sorry we can&apos;t find anything here</Typography>
    </div>
  );
};

export default NotFound;
