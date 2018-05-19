import React from 'react';
import Button from './Button.js'

const ControlButtons = ({ onPressSubmit, onPressClear })  => {
  return (
    <div>
      <Button className='submit-button' onPress={onPressSubmit}>Submit</Button>
      <Button className='clear-button' onPress={onPressClear}>Clear</Button>
    </div>
  );
}

export default ControlButtons;
