import React from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';
const Spinner = ({ size = 'sm', fill = 'white', center = false }) => {
  return (
    <CgSpinnerTwo
      className={`animate-spin text-${size} text-${fill} ${center && 'm-auto'}`}
    />
  );
};

export default Spinner;
