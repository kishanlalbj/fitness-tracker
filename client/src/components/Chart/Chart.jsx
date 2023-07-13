import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

const options = {
  chart: {
    id: 'area-datetime',
    type: 'area',
    height: 350,
    width: 100,
    zoom: {
      autoScaleYaxis: true
    }
  },
  annotations: {
    yaxis: [
      {
        y: 30,
        borderColor: '#999',
        label: {
          show: false,

          style: {
            color: '#fff',
            background: '#00E396'
          }
        }
      }
    ],
    xaxis: [
      {
        x: new Date('31 Jan 2023').getTime(),
        borderColor: '#999',
        yAxisIndex: 0,
        label: {
          show: true,

          style: {
            color: '#fff',
            background: '#775DD0'
          }
        }
      }
    ]
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0,
    style: 'hollow'
  },
  xaxis: {
    type: 'datetime',
    min: new Date(moment().subtract(7, 'days').format('DD-MMM-YYYY')).getTime(),
    tickAmount: 6
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy'
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100]
    }
  }
};
const Chart = (props) => {
  const { title, data } = props;
  return (
    <div>
      <Card>
        <CardHeader title={title} titleTypographyProps={{ fontWeight: 700 }}></CardHeader>

        <CardContent>
          <ReactApexChart options={options} series={data} type="area" height={200} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Chart;
