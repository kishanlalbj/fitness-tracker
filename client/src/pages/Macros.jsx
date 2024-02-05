import React, { useState } from 'react';
import { LineWeightRounded } from '@mui/icons-material';
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import { getMacrosRequest } from '../app/Api';

const Macros = () => {
  const [weight, setWeight] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    getMacrosRequest(Number(weight));
  };

  return (
    <>
      <Grid container gap={'24px'}>
        <Grid item md={12}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <form
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                justifyContent: 'end'
              }}
            >
              <TextField
                type="number"
                sx={{
                  width: '220px'
                }}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Weight"
                label="Weight (kg)"
                inputProps={{
                  min: 5,
                  max: 10
                }}
                InputProps={{
                  endAdornment: <LineWeightRounded />
                }}
              ></TextField>

              <Button type="submit" variant="contained" sx={{ padding: '16px' }} onClick={handleSubmit}>
                Calculate
              </Button>
            </form>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Protein (g)</TableCell>
                    <TableCell>Carbs (g)</TableCell>
                    <TableCell>Fat (g)</TableCell>
                    <TableCell>Fiber (g)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>120</TableCell>
                    <TableCell>190</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>40</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Macros;
