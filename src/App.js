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
    this.state = {
      lockerBankName: "Liberton",
      message: 'Type your 4 digit code to open locker. i.e. #3456',
      code: ['-', '-', '-', '-'],
      entryCounter: 0,
      // lockerBox is used for locationStatus also.  NEED TO CHANGE NAME TO BETTER!
      // 0 for en-route to locker. 1-10 for in lockerBox of that number
      // -1 for picked up by customer, -2 picked up by service person.
      parcels: [{  // This should start empty, but have seeded it for testing
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
        lockerBox: 0,
        dropOffCode: 9993,
        pickUpCode: 8883,
        returnCode: 7773}, {
        id: 1004,
        customer: 'Helen',
        retailer: 'Runners World',
        location: 'Liberton',
        lockerBox: 0,
        dropOffCode: 9994,
        pickUpCode: 8884,
        returnCode: 7774}
      ],
      lockers: [  // This should also start empty, but seeded to match parcels above for testing.
        { number: 1, empty: false, parcelId: 1001 },
        { number: 2, empty: false, parcelId: 1002 },
        { number: 3, empty: true, parcelId: null },
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

  setMessage(newMessage) {  // Gives default message to user, or displays passed string.
    if (newMessage === undefined) {
      this.setState({ message: 'Type your 4 digit code to open locker. i.e. #3456' });
    } else {
      this.setState({ message: newMessage });
    }
  }

  codeString() {  // takes the array of digets entered and returns a 4 char string
    const codeString = this.state.code[0] + this.state.code[1] + this.state.code[2] + this.state.code[3]
    return codeString;
  }

  resetEntryCounter() {  // resets the index counter for which digit the user has most recently pressed
    this.setState({ entryCounter: 0 });
    this.setMessage();
  }

  clearCode() {  // called on re-set button
    const clearedCode = ['-', '-', '-', '-'];
    this.setState({ code: clearedCode }); // resets the code display
    this.resetEntryCounter();  // reset 'typed code' char index counter
    this.setState({ submitOff: true });  // turn off submit button
  }

  increaseEntryCounter() {  // When key pressed increase 'typed code' char index counter
    const newCount = this.state.entryCounter + 1;
    this.setState({ entryCounter: newCount });
  }

  decreaseEntryCounter() { // called when Del button pressed:
    const newCount = this.state.entryCounter - 1;
    this.setState({ entryCounter: newCount }); // reduces 'typed code' char index counter
    this.setState({ submitOff: true }); // make sure submit is turned off
    this.setMessage(); // sets message to default
  }

  enterNumber(number) {  // when a key pad is pressed - number on pad is passed and added to the code array at index of the 'type code' counter.
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
      this.setState({ submitOff: false });  // ONLY WHEN 4 digets have been entered does the submit button turn on.
    } // no else, as more number keys should have no affect.
  }


  handleOnBackSpaceClick() {  // del button clicked
    const index = this.state.entryCounter;
    if (index > 0) {  // only when a numebr has already been entered
      const newCode = this.state.code;
      newCode[index - 1] = '-'; // replace current 'typed code' counter with '-'
      this.setState({ code: newCode });
      this.decreaseEntryCounter(); // decrease 'typed code' counter
    }
  }

  parcelArrived(parcel) {
    // no reply to deal with being full yet, or if goes wrong for other reason.
    let lockerNum = null;
    let lockersArray = this.state.lockers;
    console.log(lockersArray);
    for (const locker of this.state.lockers) {  //  finds next empty locker and gives that number to the parcel, returns the number for display, and gives that locker the parcel ID and empty=false.
      if (locker.empty) {
        lockerNum = locker.number;
        console.log("Parcel had num locker:", parcel.lockerBox);
        parcel.lockerBox = lockerNum;
        console.log("Parcel now has num locker:", parcel.lockerBox);
        lockersArray[lockerNum-1].parcelId = parcel.id;
        lockersArray[lockerNum-1].empty = false;
        this.setState({ lockers: lockersArray });
        console.log("Locker:", lockerNum, "now has parcelid:", this.state.lockers[lockerNum].parcelId + this.state.lockers[lockerNum].empty);
        break;
      }
    }
    return lockerNum;
  }


// locationStatus is 0 for en-route to locker. 1-10 for in lockerBox of that number
//                  -1 for picked up by customer, -2 picked up by service person.
  parcelCollected(parcel, locationStatus) {
    parcel.lockerBox = locationStatus;  // set locker box to represent pickup.
    if (locationStatus === -1) { // -1 means customer collected

    } else if (locationStatus === -2) { // -2 means service person returning

    }
  }

// Assumes that customer only recieves the code after the parcel has arrived.
  isCodeValid(code) {  // Check 4 digit code against 'arrieved' and 'due to arrive' package codes.
    const codeInt = parseInt(code, 10);  // string to int. SHOULD probably store the codes as string instead.
    for(const parcel of this.state.parcels) {
      const lockerBox = parcel.lockerBox;
      // Maybe a switch case statement would be easier to read?
      if (codeInt === parcel.pickUpCode && lockerBox > 0) {
        this.setMessage(`${codeInt} Accepted! ${parcel.customer}, please find your parcel in box: ${parcel.lockerBox}`);
        this.parcelCollected(parcel, -1); // -1 to indicate picked up by customer
        return
      } else if (codeInt === parcel.dropOffCode && lockerBox === 0) {
        const box = this.parcelArrived(parcel);
        this.setMessage(`${code} for Service Person, please place NEW parcel in box: ${box}`);
        return
      } else if (codeInt === parcel.returnCode && lockerBox > 0) {
        this.setMessage(`${code} for Service Person, please find parcel to RETURN in box: ${parcel.lockerBox}`);
        this.parcelCollected(parcel, -2); // -2 to indicate parcel has been returned
        return
      } else {
        this.setMessage(`${code}, Invalid code, please try again`);
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
