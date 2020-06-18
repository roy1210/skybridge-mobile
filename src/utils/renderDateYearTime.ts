import moment from "moment";

export const renderDateYearTime = (timestamp: number | undefined): string => {
  const msecTimestamp = (timestamp || 0) * 1000;
  return moment(msecTimestamp).format("MMM D YYYY - HH:mm").toUpperCase();
};
