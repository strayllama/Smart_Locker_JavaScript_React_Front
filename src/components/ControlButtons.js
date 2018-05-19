import React from 'react';
import Button from './Button.js'
// import './ControlButtons.css'

const ControlButtons = ({ onPressSubmit, onPressClear })  => {
  return (
    <div>
      {/* <button id="submit-button" onPress={onPressSubmit} >Submit</button> */}
      <Button id="submit-button" onPress={onPressSubmit}>Submit</Button>
      {/* <button id="clear-button" onPress={onPressClear} >Clear</button> */}
    </div>
  );
}

export default ControlButtons;
