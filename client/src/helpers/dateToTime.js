import React from 'react';

const dateToTime = (date) => {
  let hrs = new Date(date).getHours();
  let mnts = new Date(date).getMinutes();
  hrs = hrs / 10 < 1 ? '0' + hrs : hrs;
  mnts = mnts / 10 < 1 ? '0' + mnts : mnts;
  return hrs + ':' + mnts;
};

export default dateToTime;
