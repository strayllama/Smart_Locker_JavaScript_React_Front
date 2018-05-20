import React from 'react';

const NumberButton = ({ onPress, children, className, disabled }) => {
  return (
    <button
      className={className}
      onClick={onPress}
      disabled={disabled}
    >{children}</button>
  );
};



export default NumberButton;
