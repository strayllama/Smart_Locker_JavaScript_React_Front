import React, { Component } from 'react';
// import IsCodeValid from './services/isCodeValid.js'
import Header from './components/Header.js'
import MessageBox from './components/MessageBox.js'
import DisplayPane from './components/DisplayPane.js'
import NumberPad from './components/NumberPad.js'
import ControlButtons from './components/ControlButtons.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // const isCodeValid = new IsCodeValid();
    this.state = {
      lockerBankName: "Liberton",
      message: 'Type your 4 digit code to open locker. i.e. #3456',
      code: ['-', '-', '-', '-'],
      entryCounter: 0,
      parcels: [{
        id: 1001,
        customer: 'Bob',
        retailer: 'Maplins',
        location: 'Liberton',
        lockerBox: 1,
        dropOffCode: 9991,
        pickUpCode: 8881,
        returnCode: 7771}, {
        id: 1002,
        customer: 'Steve',
        retailer: 'Maplins',
        location: 'Liberton',
        lockerBox: 2,
        dropOffCode: 9992,
        pickUpCode: 8882,
        returnCode: 7772}, {
        id: 1003,
        customer: 'Joe',
        retailer: 'Maplins',
        location: 'Liberton',
        lockerBox: 3,
        dropOffCode: 9993,
        pickUpCode: 8883,
        returnCode: 7773}
      ],
      lockers: [
        { number: 1, empty: false, parcelId: 1001 },
        { number: 2, empty: false, parcelId: 1002 },
        { number: 3, empty: false, parcelId: 1003 },
        { number: 4, empty: true, parcelId: null },
        { number: 5, empty: true, parcelId: null },
        { number: 6, empty: true, parcelId: null },
        { number: 7, empty: true, parcelId: null },
        { number: 8, empty: true, parcelId: null },
        { number: 9, empty: true, parcelId: null }
      ],
      submitOff: true,
      enteredCode: null
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

  isCodeValid(code) {
    const codeInt = parseInt(code, 10);
    // console.log("CHECKING CODE IS VALID");
    for(const parcel of this.state.parcels) {
      // console.log("Is it for parcels for customer:", parcel.customer);
      if (codeInt === parcel.pickUpCode) {
        const message = `${code} Accepted! ${parcel.customer}, please find your parcel in box: ${parcel.lockerBox}`;
        this.setMessage(message);
      } else if (codeInt === parcel.dropOffCode) {
        const message = `${code} for Service Person, please place NEW parcel in box: 4`;
        this.setMessage(message);
      } else if (codeInt === parcel.returnCode) {
        const message = `${code} for Service Person, please find parcel to RETURN in box: ${parcel.lockerBox}`;
        this.setMessage(message);
      } else {
        // this.setMessage(code, "Not recognised, please try again");
      }
    }
  }

  handleOnSubmitClick() {
    // console.log('Submit Button Clicked');
    if (this.state.entryCounter === 4) {
      this.setState({ enteredCode: this.codeString() }, function () {
        console.log('Submitting the following code:', this.state.enteredCode);
        const submitMessage = 'Code Submitted: ' + this.state.enteredCode;
        this.setMessage(submitMessage);
        this.isCodeValid(this.codeString());
      });
      // console.log("This for handleOnSubmitClick: ", this);
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

  getLocationParcelData() {
    const url = `http://localhost:9090/parcelsLoc/${this.state.lockerBankName}`;
    const request = new XMLHttpRequest();
    request.open('GET', url);

    request.addEventListener('load', () => {
      if (request.status !== 200) return;
      const jsonString = request.responseText;
      const parcelData = JSON.parse(jsonString);
      console.log(parcelData);
      this.setState({ parcels: parcelData })
    }) // end addEventListener

    request.send();
  }

  componentDidMount() {
    this.getLocationParcelData();
  } // end componentDidMount


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
  } // end render()

} // end class App

export default App;
