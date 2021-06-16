export const getDate = (dateObject) => {
  const localDate = new Date(dateObject);
  const day = `${localDate.getDate()}`.padStart(2, 0);
  const month = `${localDate.getMonth() + 1}`.padStart(2, 0);
  const year = localDate.getFullYear();
  const hour = localDate.getHours();
  const minutes = localDate.getMinutes();
  const seconds = localDate.getSeconds();
  return `${day}/${month}/${year}  ${hour}:${minutes}:${seconds}`;
};
