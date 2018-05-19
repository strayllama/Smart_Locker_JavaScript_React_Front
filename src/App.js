import React, { Component } from 'react';
import Header from './components/Header.js'
import MessageBox from './components/MessageBox.js'
import NumberPane from './components/NumberPane.js'
import NumberPad from './components/NumberPad.js'
import ControlButtons from './components/ControlButtons.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Type your 4 digit code to open locker. i.e. #3456'
    }

    this.handleOnClearClick = this.handleOnClearClick.bind(this);
    this.handleOnSubmitClick = this.handleOnSubmitClick.bind(this);
    this.handleOnNumberClick = this.handleOnNumberClick.bind(this);

  }

  handleOnSubmitClick() {
    console.log('Submit Button Clicked');
  }

  handleOnClearClick() {
    console.log('Clear Button Clicked');
  }

  handleOnNumberClick(number) {
    console.log('Number', number, 'Button Clicked');
  }

  render() {
    return (
      <div className="App">
        <Header>Smart Locker</Header>
        <MessageBox text={this.state.message} />
        <NumberPane />
        <NumberPad onPress={this.handleOnNumberClick} />
        <ControlButtons onPressClear={this.handleOnClearClick} onPressClick={this.handleOnSubmitClick} />
      </div>
    );
  }
}

export default App;
