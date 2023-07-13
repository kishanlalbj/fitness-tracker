import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MeasurementForm from '../components/MeasurementForm/MeasurementForm';
import StatCard from '../components/StatCard/StatCard';
import formatDateTime from '../utils/dateTimeParser';
import extractChartData from '../utils/extractChartData';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../app/slices/Auth';
import Chart from '../components/Chart/Chart';
import { getMetrics } from '../app/slices/Metrics';
import StatSkeleton from '../components/StatCard/StatSkeleton';

const Home = () => {
  const [metrics, setMetrics] = useState({
    bmi: '',
    bmr: '',
    bodyFat: ''
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data, loading: metricLoading } = useSelector((state) => state.metrics);

  const [BMIchartData, setBMIChartData] = useState([]);
  const [BMRChartData, setBMRChartData] = useState([]);
  const [BodyFatChartData, setBodyFatChartData] = useState([]);
  const [weightData, setWeightChartData] = useState([]);

  const fetchLatestMetrics = async () => {
    dispatch(getMetrics());
  };

  useEffect(() => {
    setBMIChartData([
      {
        data: extractChartData(data, 'bmi')
      }
    ]);

    setBMRChartData([
      {
        data: extractChartData(data, 'bmr')
      }
    ]);

    setBodyFatChartData([
      {
        data: extractChartData(data, 'bodyFat')
      }
    ]);

    setWeightChartData([
      {
        data: extractChartData(data, 'weight')
      }
    ]);

    setMetrics({
      ...data[0]
    });
  }, [data]);

  const measureMetrics = async (measurements = {}) => {
    if (Object.keys(measurements).length <= 0) return;

    try {
      const res = await axios.post(
        '/api/metrics',
        {
          date: formatDateTime(measurements.date),
          weight: Number(measurements.weight),
          waist: Number(measurements.waist),
          neck: Number(measurements.neck)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tk')}`
          }
        }
      );

      if (res.status === 201) {
        console.log(res.data);
        setMetrics({
          ...res.data
        });

        fetchLatestMetrics();
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.error.message);
    }
  };

  const handleMeasurementsSubmit = (measurements) => {
    measureMetrics(measurements);
  };

  const fetchProfileDetails = async () => {
    dispatch(getUser());
  };

  useEffect(() => {
    fetchLatestMetrics();
    fetchProfileDetails();
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item md={3}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <ProfileCard name={user.username} height={user.height} dateOfBirth={user.dateOfBirth} />
            </Grid>
            <Grid item md={12}>
              <MeasurementForm onSubmit={handleMeasurementsSubmit} />
            </Grid>
          </Grid>
        </Grid>

        {metricLoading ? (
          <Grid item md={9}>
            <Grid container spacing={2}>
              {[1, 2, 3].map((item) => (
                <Grid key={item} item md={4}>
                  <StatSkeleton></StatSkeleton>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ) : (
          <Grid item md={9}>
            <Grid container spacing={2}>
              <Grid item md={4} sm={6} xs={12}>
                <StatCard title={'Body Mass Index'} value={metrics.bmi} result={metrics.bmiRange}></StatCard>
              </Grid>

              <Grid item md={4} sm={6} xs={12}>
                <StatCard title={'Body Metabolic Rate'} value={metrics.bmr} result=""></StatCard>
              </Grid>

              <Grid item md={4} sm={12} xs={12}>
                <StatCard title={'Body Fat'} value={`${metrics.bodyFat}%`} result={metrics.bfRange}></StatCard>
              </Grid>

              <Grid item md={6} sm={12} xs={12}>
                <Chart title="BMI Trend" data={BMIchartData}></Chart>
              </Grid>

              <Grid item md={6} sm={12} xs={12}>
                <Chart title="Body Fat Trend" data={BodyFatChartData}></Chart>
              </Grid>

              <Grid item md={6} sm={6} xs={6}>
                <Chart title="Weight Trend" data={weightData}></Chart>
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
                <Chart title="BMR Trend" data={BMRChartData}></Chart>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Home;
