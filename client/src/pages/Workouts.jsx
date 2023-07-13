import { Box, Button, Container, Paper, Table, TableContainer, TextField, Autocomplete } from '@mui/material';
import moment from 'moment';
import { styled, lighten, darken } from '@mui/system';
import React, { useState } from 'react';

const workouts = [
  {
    name: 'Bench Press',
    type: 'weight',
    muscle: 'chest'
  },
  {
    name: 'Squats',
    type: 'weight',
    muscle: 'leg'
  },
  {
    name: 'Bicep Curl',
    type: 'weight',
    muscle: 'biceps'
  }
];

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8)
}));

const GroupItems = styled('ul')({
  padding: 0
});

const Workouts = () => {
  const [data, setData] = useState({
    date: '',
    muscle
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('form submitted');
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Box>
          <h1>{moment(Date.now()).format('DD-MMMM-YYYY')}</h1>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <TextField
                size="small"
                type="date"
                label="date"
                defaultValue={moment(Date.now()).format('YYYY-MM-DD')}
              ></TextField>

              <Autocomplete
                size="small"
                freeSolo
                sx={{ width: 500 }}
                groupBy={(opt) => opt.muscle}
                options={workouts.map((w) => w.name)}
                placeholder="Exercise"
                renderInput={(props) => (
                  <TextField
                    {...props}
                    placeholder="Workout"
                    inputprops={{
                      ...props.InputProps,
                      type: 'search'
                    }}
                  ></TextField>
                )}
              ></Autocomplete>

              {/* <FormControl sx={{ width: 500 }} size="small" variant="filled">
              <InputLabel id="select-exercise">Exercise</InputLabel>
              <Select labelId="select-exercise">
                {workouts.map((w) => (
                  <MenuItem key={w.name}>{w.name}</MenuItem>
                ))}
              </Select>
            </FormControl> */}

              <TextField
                name="weight"
                size="small"
                label="weight (kg)"
                placeholder="Weight"
                type="number"
                inputProps={{ min: 2.5, step: 2.5 }}
              ></TextField>

              <TextField
                name="reps"
                size="small"
                label="reps"
                placeholder="Reps"
                type="number"
                inputProps={{ min: 1, max: 50 }}
              ></TextField>

              <Button type="submit" color="primary" size="large" variant="contained">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>

      <Paper sx={{ mt: 2, p: 2 }}>
        <TableContainer component={Paper}>
          <Table></Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Workouts;
