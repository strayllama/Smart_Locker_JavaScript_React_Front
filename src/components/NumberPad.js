import React from 'react';
import Button from './Button.js'

const NumberPad = ({ onPress })  => {
  return (
    <div>
      <div>
        {/* <Button onPress={ onPress }>1</Button> */}
        <div className="button-box"><button className="number-button">1</button></div>
        <div className="button-box"><button className="number-button">2</button></div>
        <div className="button-box"><button className="number-button">3</button></div>
      </div>
      <div>
        <div className="button-box"><button className="number-button">4</button></div>
        <div className="button-box"><button className="number-button">5</button></div>
        <div className="button-box"><button className="number-button">6</button></div>
      </div>
      <div>
        <div className="button-box"><button className="number-button">7</button></div>
        <div className="button-box"><button className="number-button">8</button></div>
        <div className="button-box"><button className="number-button">9</button></div>
      </div>
      <div>
        <div className="space-box"></div>
        <div className="button-box"><button className="number-button">0</button></div>
        <div className="space-box"></div>
      </div>
    </div>
  );
}

export default NumberPad
