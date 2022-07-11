import React from 'react';

const dateToTime = (date) => `${date?.getHours()}:${date?.getMinutes()}`;

export default dateToTime;
