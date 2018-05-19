import React from 'react';

const NumberButton = ({ onPress, children, className, num }) => {
  return (
    <button style={styles.buttonStyle} className={className} onClick={() => {onPress(num)}}>{children}</button>
  );
};

const styles = {
  buttonStyle: {
  fontSize: 50,
  width: '70px',
  height: '70px',
  display: 'inline-block',
  backgroundColor: '#714444'
  }
}

export default NumberButton;
