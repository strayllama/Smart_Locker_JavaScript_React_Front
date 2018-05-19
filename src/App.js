import React, { Component } from 'react';
import Header from './components/Header.js'
import MessageBox from './components/MessageBox.js'
import NumberPane from './components/NumberPane.js'
import NumberPad from './components/NumberPad.js'
import ControlButtons from './components/ControlButtons.js'
import './App.css';

class App extends Component {
  state = {
    message: 'Type your 4 digit code to open locker. i.e. #3456'
  }

  handleOnSubmitClick() {
    console.log('Submit Button Clicked');
  }

  render() {
    return (
      <div className="App">
        <Header>Smart Locker</Header>
        <MessageBox text={this.state.message} />
        <NumberPane />
        <NumberPad />
        <ControlButtons />
      </div>
    );
  }
}

export default App;
