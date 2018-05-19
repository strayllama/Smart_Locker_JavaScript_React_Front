import React from 'react';

const NumberButton = ({ onPress, children, className }) => {
  return (
    <button style={styles.buttonStyle} className={className} >{children}</button>
  );
};

const styles = {
  buttonStyle: {
  width: '95%',
  height: '95%',
  fontSize: 25,
  display: 'inline-block'
  }
}

export default NumberButton;
