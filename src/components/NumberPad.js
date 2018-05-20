import React from 'react';
import NumberButton from './NumberButton.js'
import './buttons.css';


const NumberPad = ({ onPressNum, onPressClear, onPressBack })  => {
  return (
    <div>
      <div>
        <NumberButton
          className='num-key pad-key'
          onPress={onPressNum}
          num='1'>1
        </NumberButton>
        <NumberButton
          className='num-key pad-key'
          onPress={onPressNum}
          num='2'>2
        </NumberButton>
        <NumberButton
          className='num-key pad-key'
          onPress={onPressNum}
          num='3'>3
        </NumberButton>
      </div>
      <div>
        <NumberButton
          className='num-key pad-key'
          onPress={onPressNum}
          num='4'>4
        </NumberButton>
        <NumberButton
          className='num-key pad-key'
          onPress={onPressNum}
          num='5'>5
        </NumberButton>
        <NumberButton
          className='num-key pad-key'
          onPress={onPressNum}
          num='6'>6
        </NumberButton>
      </div>
      <div>
        <NumberButton
          className='num-key pad-key'
          onPress={onPressNum}
          num='7'>7
        </NumberButton>
        <NumberButton
          className='num-key pad-key'
          onPress={onPressNum}
          num='8'>8
        </NumberButton>
        <NumberButton
          className='num-key pad-key'
          onPress={onPressNum}
          num='9'>9
        </NumberButton>
      </div>
      <div>
        <NumberButton
          className='bck-key pad-key'
          onPress={onPressBack}>Del
        </NumberButton>
        <NumberButton
          className='num-key pad-key'
          onPress={onPressNum}
          num='0'>0
        </NumberButton>
        <NumberButton
          className='clr-key pad-key'
          onPress={onPressClear}>Clr
        </NumberButton>
      </div>
    </div>
  );
}

export default NumberPad
