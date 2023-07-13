import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Cake, Straighten } from '@mui/icons-material';
import moment from 'moment/moment';

const ProfileCard = (props) => {
  const { height, dateOfBirth = '', name = '' } = props;

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Avatar alt="profile" draggable={false} color="primary" sx={{ width: 72, height: 72 }}>
            {name.charAt(0)}
          </Avatar>
        </Box>
      </CardContent>

      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Typography sx={{ textAlign: 'center' }} variant="h5">
            {name}
          </Typography>
        </Box>
        {
          <>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Straighten color="primary" />
              <Typography>
                {height}
                <span>cm</span>
              </Typography>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cake color="primary" />
              <Typography variant="subtitle2" component="span">
                {dateOfBirth ? moment(dateOfBirth).format('DD-MMM-YYYY') : null}
              </Typography>
            </Box>
          </>
        }
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
