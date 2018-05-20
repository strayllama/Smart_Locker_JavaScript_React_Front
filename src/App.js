import React, { Component } from 'react';
import Header from './components/Header.js'
import MessageBox from './components/MessageBox.js'
import DisplayPane from './components/DisplayPane.js'
import NumberPad from './components/NumberPad.js'
import ControlButtons from './components/ControlButtons.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lockerBankName: "Liberton",
      message: 'Type your 4 digit code to open locker. i.e. #3456',
      code: ['-', '-', '-', '-'],
      entryCounter: 0,
      lockers: [
        { number: 1, empty: false, parcelId: 111 },
        { number: 2, empty: false, parcelId: 112 },
        { number: 3, empty: true, parcelId: null },
        { number: 4, empty: true, parcelId: null },
        { number: 5, empty: true, parcelId: null },
        { number: 6, empty: true, parcelId: null },
        { number: 7, empty: true, parcelId: null },
        { number: 8, empty: true, parcelId: null },
        { number: 9, empty: true, parcelId: null }
      ],
      submitOff: true
    }

    this.handleOnClearClick = this.handleOnClearClick.bind(this);
    this.handleOnSubmitClick = this.handleOnSubmitClick.bind(this);
    this.handleOnNumberClick = this.handleOnNumberClick.bind(this);
    this.handleOnBackSpaceClick = this.handleOnBackSpaceClick.bind(this);
  }

  setMessage(newMessage) {
    if (newMessage === undefined) {
      this.setState({ message: 'Type your 4 digit code to open locker. i.e. #3456' });
    } else {
      this.setState({ message: newMessage });
    }
  }

  codeString() {
    const codeString = this.state.code[0] + this.state.code[1] + this.state.code[2] + this.state.code[3]
    return codeString;
  }

  resetEntryCounter() {
    this.setState({ entryCounter: 0 });
    this.setMessage();
  }

  clearCode() {
    const clearedCode = ['-', '-', '-', '-'];
    this.setState.code = clearedCode;
    this.setState({ code: clearedCode });
    this.resetEntryCounter();
    this.setState({ submitOff: true });
  }

  increaseEntryCounter() {
    const newCount = this.state.entryCounter + 1;
    this.setState({ entryCounter: newCount });
  }

  decreaseEntryCounter() {
    const newCount = this.state.entryCounter - 1;
    this.setState({ entryCounter: newCount });
    this.setState({ submitOff: true });
    this.setMessage();
  }

  enterNumber(number) {
    const index = this.state.entryCounter;
    if (index === 0) {
      const newCode = this.state.code;
      newCode[0] = number;
      this.setState({ code: newCode });
      this.increaseEntryCounter();
    } else if (index === 1) {
      const newCode = this.state.code;
      newCode[1] = number;
      this.setState({ code: newCode });
      this.increaseEntryCounter();
    } else if (index === 2) {
      const newCode = this.state.code;
      newCode[2] = number;
      this.setState({ code: newCode });
      this.increaseEntryCounter();
    } else if (index === 3) {
      const newCode = this.state.code;
      newCode[3] = number;
      this.setState({ code: newCode });
      this.increaseEntryCounter();
      this.setState({ submitOff: false });
    }
    // else { console.log('Clear to re-type code!');}
  }

  deleteNumber() {
    const index = this.state.entryCounter;
    if (index > 0) {
      const newCode = this.state.code;
      newCode[index - 1] = '-';
      this.setState({ code: newCode });
      this.decreaseEntryCounter();
    }
  }

  handleOnBackSpaceClick() {
    // console.log('BackSpace Button Clicked');
    this.deleteNumber();
  }

  handleOnSubmitClick() {
    // console.log('Submit Button Clicked');
    if (this.state.entryCounter === 4) {
      console.log('Submitting the following code:', this.codeString());
      const submitMessage = 'Code Submitted: ' + this.codeString();
      this.setMessage(submitMessage);
    }
  }

  handleOnClearClick() {
    // console.log('Clear Button Clicked');
    this.clearCode();
  }

  handleOnNumberClick(number) {
    this.enterNumber(number);
    // console.log('Number', number, 'Button Clicked');
  }


  render() {
    return (
      <div className="App">
        <Header>{this.state.lockerBankName} Smart Locker</Header>
        <MessageBox text={this.state.message} />
        <DisplayPane
          num1={this.state.code[0]}
          num2={this.state.code[1]}
          num3={this.state.code[2]}
          num4={this.state.code[3]}
        />
        <NumberPad
          onPressNum={this.handleOnNumberClick}
          onPressClear={this.handleOnClearClick}
          onPressBack={this.handleOnBackSpaceClick}
        />
        <ControlButtons
          onPressClear={this.handleOnClearClick}
          onPressSubmit={this.handleOnSubmitClick}
          turnedOff={this.state.submitOff}
        />
      </div>
    );
  }
}

export default App;
