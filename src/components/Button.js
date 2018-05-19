import React from 'react';
import { Text } from 'react';

const Button = ({ onPress, children }) => {
  console.log({onPress});
console.log({children});
  return (
    <div></div>
    // <button onPress={onPress} ><Text>{children}</Text></button>
  );
};


export default Button;
