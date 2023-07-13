import { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Grid, InputAdornment, TextField } from '@mui/material';
import { Box } from '@mui/system';

const MeasurementForm = (props) => {
  const { onSubmit } = props;
  const [measurements, setMeasurements] = useState({
    date: '',
    weight: '',
    neck: '',
    waist: ''
  });
  const [formError, setFormError] = useState(false);
  const [errorFields, setErrorFields] = useState([]);

  const handleChange = (e) => {
    setMeasurements((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorFieldsArr = [];
    Object.keys(measurements).forEach((k) => {
      if (!measurements[k]) errorFieldsArr.push(k);
    });
    if (errorFieldsArr.length > 0) {
      setFormError(true);
      setErrorFields(errorFieldsArr);
    } else if (errorFieldsArr.length === 0) {
      setFormError(false);
      onSubmit(measurements);

      clearFields();
    }
  };

  const clearFields = () => {
    setMeasurements({
      date: '',
      weight: '',
      neck: '',
      waist: ''
    });
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title={'Measurement Form'} titleTypographyProps={{ fontWeight: 700 }}></CardHeader>

      <CardContent>
        <form>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12} sm={12}>
              <TextField
                type={'datetime-local'}
                FormHelperTextProps={{
                  style: { marginLeft: 0 }
                }}
                inputProps={{
                  disableunderline: 'true'
                }}
                label="Date"
                size="small"
                error={formError && errorFields.includes('date')}
                helperText={'Required'}
                color="primary"
                name="date"
                variant="filled"
                value={measurements.date}
                onChange={handleChange}
                fullWidth
              ></TextField>
            </Grid>

            <Grid item md={12} xs={12} sm={12}>
              <TextField
                id="weight"
                variant="filled"
                FormHelperTextProps={{
                  style: { marginLeft: 0 }
                }}
                label="Weight"
                size="small"
                error={formError && errorFields.includes('weight')}
                helperText={'Required'}
                type={'number'}
                inputProps={{
                  endadornment: <InputAdornment position="end">kg</InputAdornment>,
                  disableunderline: 'true'
                }}
                name="weight"
                onChange={handleChange}
                value={measurements.weight}
                fullWidth
              ></TextField>
            </Grid>

            <Grid item md={12} xs={12} sm={12}>
              <TextField
                type={'number'}
                FormHelperTextProps={{
                  style: { marginLeft: 0 }
                }}
                size="small"
                variant="filled"
                error={formError && errorFields.includes('neck')}
                helperText={'Required'}
                label="Neck"
                name="neck"
                onChange={handleChange}
                value={measurements.neck}
                inputProps={{
                  endadornment: <InputAdornment position="end">cm</InputAdornment>,
                  disableunderline: 'true'
                }}
                fullWidth
              ></TextField>
            </Grid>

            <Grid item md={12} xs={12} sm={12}>
              <TextField
                type={'number'}
                variant="filled"
                label="Waist"
                FormHelperTextProps={{
                  style: { marginLeft: 0 }
                }}
                size="small"
                error={formError && errorFields.includes('waist')}
                helperText={'Required'}
                name="waist"
                onChange={handleChange}
                value={measurements.waist}
                inputProps={{
                  endadornment: <InputAdornment position="end">cm</InputAdornment>,
                  disableunderline: 'true'
                }}
                fullWidth
              ></TextField>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </form>
      </CardContent>

      <CardActions></CardActions>
    </Card>
  );
};

export default MeasurementForm;
