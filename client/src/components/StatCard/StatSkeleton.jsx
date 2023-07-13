import { Box, Card, Skeleton, Typography } from '@mui/material';
import React from 'react';

const StatSkeleton = () => {
  return (
    <>
      <Card sx={{ p: 1.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 400, textAlign: 'center' }}>
          <Skeleton variant="rect" width={250} height={10} sx={{ textAlign: 'center' }}></Skeleton>
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '2.5rem'
          }}
        >
          <Typography variant="h4" component={'p'} sx={{ fontWeight: 700 }}>
            <Skeleton variant="rect" width={210} height={10}></Skeleton>
          </Typography>
          <Typography component={'span'} variant="caption" textTransform={'lowercase'}>
            <Skeleton variant="rect" width={210} height={10}></Skeleton>
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default StatSkeleton;
