import React from 'react';
import NumberButton from './NumberButton.js'

const NumberPad = ({ onPress })  => {
  return (
    <div>
      <div>
        <NumberButton className='number-button' onPress={onPress} num='1' >1</NumberButton>
        <NumberButton className='number-button' onPress={onPress} num='2' >2</NumberButton>
        <NumberButton className='number-button' onPress={onPress} num='3' >3</NumberButton>
      </div>
      <div>
        <NumberButton className='number-button' onPress={onPress} num='4' >4</NumberButton>
        <NumberButton className='number-button' onPress={onPress} num='5' >5</NumberButton>
        <NumberButton className='number-button' onPress={onPress} num='6' >6</NumberButton>
      </div>
      <div>
        <NumberButton className='number-button' onPress={onPress}  num='7' >7</NumberButton>
        <NumberButton className='number-button' onPress={onPress} num='8' >8</NumberButton>
        <NumberButton className='number-button' onPress={onPress} num='9' >9</NumberButton>
      </div>
      <div>
        <div className="space-box"></div>
        <NumberButton className='number-button' onPress={onPress} num='0' >0</NumberButton>
        <div className="space-box"></div>
      </div>
    </div>
  );
}

export default NumberPad
