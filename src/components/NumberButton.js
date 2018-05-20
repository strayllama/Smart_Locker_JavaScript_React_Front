import React from 'react';

const NumberButton = ({ onPress, children, className, num }) => {
  return (
    <button className={className} onClick={() => {onPress(num)}}>{children}</button>
  );
};

export default NumberButton;
