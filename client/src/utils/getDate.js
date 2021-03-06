const padStartTime = (time) => {
  return `${time}`.padStart(2, 0);
};
export const getDate = (dateObject) => {
  const localDate = new Date(dateObject);
  const day = padStartTime(localDate.getDate());
  const month = padStartTime(localDate.getMonth() + 1);
  const year = localDate.getFullYear();
  const hour = padStartTime(localDate.getHours());
  const minutes = padStartTime(localDate.getMinutes());
  const seconds = padStartTime(localDate.getSeconds());

  const dayCount = new Date().getDate() - day;
  const hourCount = Math.floor((Date.now() - localDate) / (1000 * 60 * 60));
  const minutesCount = Math.floor((Date.now() - localDate) / (1000 * 60));

  if (dayCount === 0) {
    if (hourCount >= 1) return `${hourCount}h ago`;
    if (minutesCount < 60) return `${minutesCount} minutes ago`;
  }
  if (dayCount === 1) return `yesterday`;
  if (dayCount > 1 && dayCount < 7) return ` ${dayCount} days ago`;
  if (dayCount >= 7 && dayCount < 14) return ` last week`;
  return `${day}/${month}/${year}  ${hour}:${minutes}:${seconds}`;
};
