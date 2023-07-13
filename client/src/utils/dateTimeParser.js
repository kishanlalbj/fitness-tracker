const formatDateTime = (dateString) => {
  const dateTimeParts = dateString.split('T'),
    timeParts = dateTimeParts[1].split(':'),
    dateParts = dateTimeParts[0].split('-');

  const date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1]);

  return date;
};

export default formatDateTime;
