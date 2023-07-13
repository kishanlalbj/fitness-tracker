const extractChartData = (data, type) => {
  if (!Array.isArray(data) || data.length === 0 || !type) return [];
  const result = [];

  data.forEach((item) => {
    result.push([new Date(item.date).getTime(), item[type]]);
  });

  return result;
};

export default extractChartData;
