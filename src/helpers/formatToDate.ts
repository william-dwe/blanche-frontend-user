export const formatToDate = (date: string): string => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  return `${day}/${month}/${year}`;
};

export const formatToHourMinute = (date: string): string => {
  const newDate = new Date(date);
  const hour = newDate.getHours();
  const parseHour = hour < 10 ? `0${hour}` : hour;
  const minute = newDate.getMinutes();
  const parseMinute = minute < 10 ? `0${minute}` : minute;

  return `${parseHour}:${parseMinute}`;
};
