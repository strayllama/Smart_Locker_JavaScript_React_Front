import React from 'react';
import Button from './Button.js'
import './buttons.css'

const ControlButtons = ({ onPressSubmit, onPressClear, turnedOff })  => {
  return (
    <div>
      <Button
        className='submit-key'
        onPress={onPressSubmit}
        disabled={turnedOff}
      >Submit</Button>
    </div>
  );
}

export default ControlButtons;
