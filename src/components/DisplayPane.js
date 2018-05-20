import React from 'react';
import './displayPane.css';

const DisplayPane = ({ num1, num2, num3, num4 })  => {
  return (
    <div>
      <div className="digit" id="num-one">{num1}</div>
      <div className="digit" id="num-two">{num2}</div>
      <div className="digit" id="num-three">{num3}</div>
      <div className="digit" id="num-four">{num4}</div>
    </div>
  );
}

export default DisplayPane;
