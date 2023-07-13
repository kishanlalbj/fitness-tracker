import { Box, Card, Typography } from '@mui/material';

const StatCard = (props) => {
  const { title, value = 'NA', result = {} } = props;

  return (
    <>
      <Card sx={{ p: 1.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 400, textAlign: 'center' }}>
          {title}
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
          <Typography variant="h4" component={'p'} sx={{ fontWeight: 700 }} color={result.color}>
            {value}
          </Typography>
          <Typography component={'span'} variant="caption" textTransform={'lowercase'} color={result.color}>
            {result ? result.result : '-'}
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default StatCard;
