import React from 'react';

const getFullName = (chatUser) => {
  return `${chatUser.firstName} ${chatUser.lastName}`;
};

export default getFullName;
